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

export async function uploadCV(pin: string, formData: FormData) {
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

    // Xóa file CV cũ dạng MyCV.* trong thư mục public
    const existingFiles = fs.readdirSync(publicDir)
    for (const f of existingFiles) {
      if (f.startsWith('MyCV.')) {
        try {
          fs.unlinkSync(path.join(publicDir, f))
        } catch (e) {
          console.error('Lỗi khi xóa file CV cũ:', e)
        }
      }
    }

    // Lưu file CV mới
    const newFilename = `MyCV${ext}`
    const filePath = path.join(publicDir, newFilename)
    fs.writeFileSync(filePath, buffer)

    const cvUrl = `/${newFilename}`

    // Cập nhật cvUrl vào portfolio-data.json
    const currentData = await getPortfolioData()
    currentData.cvUrl = cvUrl
    await savePortfolioData(currentData)

    revalidatePath('/')
    return { success: true, cvUrl }
  } catch (error: any) {
    return { success: false, error: error.message || 'Lỗi khi thay thế file CV.' }
  }
}
