'use client'

import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { useLocale } from 'next-intl'

export default function NotFound() {
  const locale = useLocale()
  const isVi = locale === 'vi'

  return (
    <div className="flex-grow flex flex-col items-center justify-center px-6 py-16 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-theme-card-subtle border border-theme flex items-center justify-center">
        <AlertCircle className="w-7 h-7 text-theme-main opacity-80" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-main">
          {isVi ? '404 - Trang không tồn tại' : '404 - Page Not Found'}
        </h1>
        <p className="opacity-65 text-theme-main max-w-md mx-auto text-sm">
          {isVi 
            ? 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.' 
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
      </div>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-theme-accent text-theme-accent-text hover:opacity-90 font-bold transition-all flex items-center gap-2 border border-theme text-sm cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> 
        {isVi ? 'Trở về Trang chủ' : 'Return Home'}
      </Link>
    </div>
  )
}
