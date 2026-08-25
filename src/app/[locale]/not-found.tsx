import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/20">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">404 - Trang không tồn tại</h1>
      <p className="text-slate-600 dark:text-slate-400 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold transition-all flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> Trở về Trang chủ
      </Link>
    </div>
  )
}
