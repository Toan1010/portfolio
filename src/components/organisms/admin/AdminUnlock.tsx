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
      <div className="w-full max-w-md p-8 rounded-3xl bg-theme-card border border-theme shadow-lg text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-theme-card-subtle text-theme-main flex items-center justify-center mx-auto border border-theme">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-theme-main">
            {t('admin.portalTitle')}
          </h1>
          <p className="text-sm text-theme-muted">
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
            className="w-full py-3.5 rounded-xl bg-theme-accent font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
