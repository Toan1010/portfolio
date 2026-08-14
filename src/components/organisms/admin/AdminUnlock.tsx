'use client'

import React from 'react'
import { Lock, Unlock, AlertCircle, RefreshCw } from 'lucide-react'
import FormField from '@/components/molecules/FormField'
import { useLanguage } from '@/context/LanguageContext'

interface AdminUnlockProps {
  pin: string
  setPin: (pin: string) => void
  authError: string
  isVerifying: boolean
  handleUnlock: (e: React.FormEvent) => void
}

export default function AdminUnlock({
  pin,
  setPin,
  authError,
  isVerifying,
  handleUnlock
}: AdminUnlockProps) {
  const { t } = useLanguage()

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto border border-indigo-500/20">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {t('admin.portalTitle')}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('admin.pinInstruction')}
          </p>
        </div>

        <form onSubmit={handleUnlock} className="space-y-4 text-left">
          <FormField
            id="adminPin"
            label={t('admin.pinLabel')}
            type="password"
            required
            value={pin}
            onChange={setPin}
            placeholder={t('admin.pinPlaceholder')}
          />

          {authError && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isVerifying ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Unlock className="w-4 h-4" /> {t('admin.unlockBtn')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
