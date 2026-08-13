'use server'

import { getPortfolioData, savePortfolioData } from '@/lib/portfolio-data'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

const SECRET_PIN = process.env.ADMIN_PIN || '8888'

export async function verifyAdminPin(pin: string) {
  'use server'
  if (pin === SECRET_PIN) {
    return { success: true }
  }
  return { success: false, error: 'Mã PIN không đúng!' }
}

export async function fetchPortfolioContent() {
  'use server'
  return await getPortfolioData()
}

export async function updatePortfolioContent(pin: string, newData: any) {
  'use server'
  if (pin !== SECRET_PIN) {
    return { success: false, error: 'Xác thực thất bại! Mã PIN không đúng.' }
  }

  try {
    await savePortfolioData(newData)
    revalidatePath('/')
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || 'Lỗi khi lưu dữ liệu.' }
  }
}

export async function uploadCV(pin: string, formData: FormData, role: 'frontend' | 'backend' | 'fullstack' = 'frontend') {
  'use server'
  if (pin !== SECRET_PIN) {
    return { success: false, error: 'Xác thực thất bại! Mã PIN không đúng.' }
  }

  const file = formData.get('file') as File | null
  if (!file || typeof file === 'string' || !file.name) {
    return { success: false, error: 'Vui lòng chọn một file CV hợp lệ.' }
  }

  const originalName = file.name
  const extMatch = originalName.match(/\.(pdf|doc|docx)$/i)
  if (!extMatch) {
    return { success: false, error: 'Chỉ chấp nhận file định dạng PDF (.pdf) hoặc Word (.doc, .docx).' }
  }

  const ext = extMatch[0].toLowerCase()

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const publicDir = path.join(process.cwd(), 'public')

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }

    // Xóa file CV cũ theo role dạng MyCV_role.* hoặc MyCV.* trong thư mục public
    const existingFiles = fs.readdirSync(publicDir)
    const targetPrefix = `MyCV_${role}.`
    for (const f of existingFiles) {
      if (f.toLowerCase().startsWith(targetPrefix.toLowerCase())) {
        try {
          fs.unlinkSync(path.join(publicDir, f))
        } catch (e) {
          console.error('Lỗi khi xóa file CV cũ:', e)
        }
      }
    }

    // Lưu file CV mới cho role
    const newFilename = `MyCV_${role}${ext}`
    const filePath = path.join(publicDir, newFilename)
    fs.writeFileSync(filePath, buffer)

    const cvUrl = `/${newFilename}`

    // Cập nhật cvUrls & cvUrl vào portfolio-data.json
    const currentData = await getPortfolioData()
    if (!currentData.cvUrls) {
      currentData.cvUrls = {
        frontend: currentData.cvUrl || '/MyCV_frontend.pdf',
        backend: '/MyCV_backend.pdf',
        fullstack: '/MyCV_fullstack.pdf'
      }
    }

    currentData.cvUrls[role] = cvUrl
    if (role === 'frontend' || !currentData.cvUrl) {
      currentData.cvUrl = cvUrl
    }

    await savePortfolioData(currentData)

    revalidatePath('/')
    return { success: true, cvUrl, role, cvUrls: currentData.cvUrls }
  } catch (error: any) {
    return { success: false, error: error.message || 'Lỗi khi thay thế file CV.' }
  }
}
