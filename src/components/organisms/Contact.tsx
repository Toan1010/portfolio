'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/atoms/BrandIcons'
import FormField from '@/components/molecules/FormField'
import ContactInfoItem from '@/components/molecules/ContactInfoItem'
import { useLanguage } from '@/context/LanguageContext'

interface ContactProps {
  data?: any
}

export default function Contact({ data }: ContactProps) {
  const { t } = useLanguage()
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const email = data?.email || 'nguyenductoan538@gmail.com'
  const github = data?.github || 'https://github.com/Toan1010'
  const linkedin = data?.linkedin || 'https://www.linkedin.com/in/đức-toàn-nguyễn-412219294/'

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 5000)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{t('contact.title')}</h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400">{t('contact.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{t('contact.infoTitle')}</h3>
            <p className="text-slate-600 dark:text-slate-400">
              {t('contact.infoDesc')}
            </p>

            <div className="space-y-4">
              <ContactInfoItem
                href={`mailto:${email}`}
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                detail={email}
              />

              <div className="flex gap-4">
                <ContactInfoItem
                  href={github}
                  icon={<GithubIcon className="w-5 h-5" />}
                  title="GitHub"
                  detail={github.replace('https://github.com/', '@')}
                  isSmall
                />
                <ContactInfoItem
                  href={linkedin}
                  icon={<LinkedinIcon className="w-5 h-5" />}
                  title="LinkedIn"
                  detail="Đức Toàn Nguyễn"
                  isSmall
                />
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md relative overflow-hidden shadow-lg dark:shadow-none">
              <form onSubmit={handleContactSubmit} className="space-y-6 text-left">
                <div className="grid sm:grid-cols-2 gap-6">
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

                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {t('contact.submit')} <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </form>

              {/* Success alert message overlay */}
              {formSubmitted && (
                <div className="absolute inset-0 bg-white/95 dark:bg-[#0b0f19]/95 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('contact.successTitle')}</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm max-w-sm">
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
