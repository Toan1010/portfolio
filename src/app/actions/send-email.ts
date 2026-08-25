'use server'

import nodemailer from 'nodemailer'

export interface SendEmailPayload {
  name: string
  email: string
  message: string
}

export interface SendEmailResult {
  success: boolean
  message?: string
  error?: string
}

export async function sendEmailAction(payload: SendEmailPayload): Promise<SendEmailResult> {
  const { name, email, message } = payload

  // 1. Basic Validation
  if (!name || !name.trim()) {
    return { success: false, error: 'Vui lòng nhập họ và tên của bạn.' }
  }
  if (!email || !email.trim() || !email.includes('@')) {
    return { success: false, error: 'Vui lòng nhập địa chỉ email hợp lệ.' }
  }
  if (!message || !message.trim()) {
    return { success: false, error: 'Vui lòng nhập nội dung tin nhắn.' }
  }

  // 2. Environment Variables Check
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10)
  const smtpSecure = process.env.SMTP_SECURE === 'true'
  const smtpUser = process.env.SMTP_USER?.trim()
  const rawPass = process.env.SMTP_PASS?.trim() || ''
  // Strip spaces from Gmail App Password (e.g., 'tefw vqlt ibpi xepa' -> 'tefwvqltibpixepa')
  const smtpPass = rawPass.replace(/\s+/g, '')

  if (!smtpUser || !smtpPass || smtpPass === 'your-smtp-app-password-here') {
    console.warn('[SendMail] SMTP Credentials not configured in environment variables.')
    return {
      success: false,
      error: 'Hệ thống chưa cấu hình tài khoản SMTP (SMTP_USER & SMTP_PASS trong file .env.local). Vui lòng cập nhật thông tin email của bạn.'
    }
  }

  try {
    // 3. Create Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    // 4. Build Mail Options
    const recipient = process.env.MAIL_TO?.trim() || 'nguyenductoan538@gmail.com'
    const rawMailFrom = process.env.MAIL_FROM?.trim()
    const mailFrom = (rawMailFrom && rawMailFrom.includes('<') && rawMailFrom.includes('>'))
      ? rawMailFrom
      : `"Portfolio Contact Form" <${smtpUser}>`

    const mailOptions = {
      from: mailFrom,
      to: recipient,
      replyTo: `"${name.trim()}" <${email.trim()}>`,
      subject: `[Portfolio Contact] Tin nhắn mới từ ${name.trim()}`,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'X-Mailer': 'Portfolio-SSR Mailer'
      },
      html: `
        <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #0f172a;">
          <h2 style="color: #0f172a; margin-top: 0; font-size: 20px; font-weight: 700; border-bottom: 2px solid #0f172a; padding-bottom: 12px;">
            📬 Tin nhắn mới từ Form Liên Hệ Portfolio
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 100px;">Họ và tên:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email người gửi:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email.trim()}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email.trim()}</a></td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="color: #64748b; font-size: 14px; font-weight: 600; margin-bottom: 8px;">Nội dung tin nhắn:</p>
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
              ${message.trim()}
            </div>
          </div>

          <div style="margin-top: 28px; pt: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8; text-align: center;">
            Email này được gửi tự động từ website <strong>Nguyen Duc Toan Portfolio (SSR)</strong>.
          </div>
        </div>
      `
    }

    // 5. Send Mail
    await transporter.sendMail(mailOptions)

    return {
      success: true,
      message: 'Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công. Tôi sẽ phản hồi lại sớm nhất!'
    }
  } catch (err: any) {
    console.error('[SendMail Error]', err)
    return {
      success: false,
      error: `Gửi email thất bại: ${err?.message || 'Lỗi hệ thống không xác định.'}`
    }
  }
}
