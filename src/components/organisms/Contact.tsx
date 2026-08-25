'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, Send, RefreshCw, AlertCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/atoms/BrandIcons'
import FormField from '@/components/molecules/FormField'
import ContactInfoItem from '@/components/molecules/ContactInfoItem'
import { useLanguage } from '@/context/LanguageContext'
import { sendEmailAction } from '@/app/actions/send-email'

interface ContactProps {
  data?: any
}

export default function Contact({ data }: ContactProps) {
  const { t } = useLanguage()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const email = data?.email || 'tomnguyn1010.dev@gmail.com'
  const github = data?.github || 'https://github.com/Toan1010'
  const linkedin = data?.linkedin || 'https://www.linkedin.com/in/đức-toàn-nguyễn-412219294/'

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setIsSending(true)
    setSubmitError('')

    const res = await sendEmailAction(formData)
    setIsSending(false)

    if (res.success) {
      setFormSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormSubmitted(false), 6000)
    } else {
      setSubmitError(res.error || 'Gửi email không thành công.')
    }
  }

  return (
    <section id="contact" className="py-20 px-6 relative border-t border-theme">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-main">{t('contact.title')}</h2>
          <div className="h-1 w-12 bg-theme-accent mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-theme-muted">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-2xl font-bold text-theme-main">{t('contact.infoTitle')}</h3>
            <p className="text-sm sm:text-base text-theme-muted leading-relaxed">
              {t('contact.infoDesc')}
            </p>

            <div className="space-y-3">
              <ContactInfoItem
                href={`mailto:${email}`}
                icon={<Mail className="w-4 h-4" />}
                title="Email"
                detail={email}
              />

              <div className="flex gap-3">
                <ContactInfoItem
                  href={github}
                  icon={<GithubIcon className="w-4 h-4" />}
                  title="GitHub"
                  detail={github.replace('https://github.com/', '@')}
                  isSmall
                />
                <ContactInfoItem
                  href={linkedin}
                  icon={<LinkedinIcon className="w-4 h-4" />}
                  title="LinkedIn"
                  detail="Đức Toàn Nguyễn"
                  isSmall
                />
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-theme-card border border-theme relative overflow-hidden shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-5 text-left">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    id="name"
                    label={t('contact.formName')}
                    required
                    value={formData.name}
                    onChange={(val) => setFormData({ ...formData, name: val })}
                    placeholder={t('contact.placeholderName')}
                  />
                  <FormField
                    id="email"
                    label={t('contact.formEmail')}
                    type="email"
                    required
                    value={formData.email}
                    onChange={(val) => setFormData({ ...formData, email: val })}
                    placeholder={t('contact.placeholderEmail')}
                  />
                </div>

                <FormField
                  id="message"
                  label={t('contact.formMessage')}
                  required
                  value={formData.message}
                  onChange={(val) => setFormData({ ...formData, message: val })}
                  placeholder={t('contact.placeholderMessage')}
                  rows={5}
                />

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSending}
                  className="w-full py-3.5 rounded-xl bg-theme-accent font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm text-sm disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      {t('contact.submit')} <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Success alert message overlay */}
              {formSubmitted && (
                <div className="absolute inset-0 bg-theme-main flex flex-col items-center justify-center p-6 text-center animate-fade-in text-theme-main">
                  <div className="w-14 h-14 rounded-full bg-theme-card-subtle text-theme-main border border-theme flex items-center justify-center mb-3">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h4 className="text-lg font-bold mb-1">{t('contact.successTitle')}</h4>
                  <p className="text-theme-muted text-xs max-w-sm">
                    {t('contact.successDesc')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
