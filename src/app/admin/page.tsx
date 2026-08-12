'use client'

import React, { useState, useRef } from 'react'
import { Lock, Unlock, Save, CheckCircle, AlertCircle, RefreshCw, Layers, UserCheck, Code, FolderGit2, Mail, Plus, Trash2, Globe, Download, Upload } from 'lucide-react'
import { verifyAdminPin, fetchPortfolioContent, updatePortfolioContent } from '@/app/actions/portfolio'
import FormField from '@/components/molecules/FormField'

export default function AdminPage() {
  const [pin, setPin] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const [editLang, setEditLang] = useState<'vi' | 'en'>('vi')
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'skills' | 'projects' | 'contact'>('hero')
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setAuthError('')

    const res = await verifyAdminPin(pin)
    if (res.success) {
      setIsUnlocked(true)
      loadData()
    } else {
      setAuthError(res.error || 'Mã PIN không chính xác!')
    }
    setIsVerifying(false)
  }

  const loadData = async () => {
    setIsLoading(true)
    const content = await fetchPortfolioContent()
    setData(content)
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!data) return
    setIsLoading(true)
    setSaveStatus({ type: null, message: '' })

    const res = await updatePortfolioContent(pin, data)
    if (res.success) {
      setSaveStatus({ type: 'success', message: 'Cập nhật nội dung Portfolio thành công! Trang chủ đã được làm mới.' })
      setTimeout(() => setSaveStatus({ type: null, message: '' }), 6000)
    } else {
      setSaveStatus({ type: 'error', message: res.error || 'Không thể cập nhật nội dung.' })
    }
    setIsLoading(false)
  }

  const handleExportJson = () => {
    if (!data) return
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-data.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        if (parsed && typeof parsed === 'object') {
          setData(parsed)
          setSaveStatus({ type: 'success', message: 'Đã nhập thành công file JSON! Hãy kiểm tra và bấm "Lưu Thay Đổi" để lưu vào hệ thống.' })
        } else {
          setSaveStatus({ type: 'error', message: 'Cấu trúc file JSON không hợp lệ.' })
        }
      } catch (err) {
        setSaveStatus({ type: 'error', message: 'Lỗi khi đọc file JSON.' })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const getBilingualValue = (field: any) => {
    if (!field) return ''
    if (typeof field === 'string') return field
    return field[editLang] || ''
  }

  const setBilingualValue = (targetObj: any, key: string, val: string) => {
    const current = targetObj[key]
    if (typeof current === 'object' && current !== null) {
      targetObj[key] = { ...current, [editLang]: val }
    } else {
      targetObj[key] = {
        vi: editLang === 'vi' ? val : current || '',
        en: editLang === 'en' ? val : current || ''
      }
    }
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto border border-indigo-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Admin Portal
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Nhập mã PIN bảo mật (Mặc định: <code className="text-indigo-400 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded">8888</code>)
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 text-left">
            <FormField
              id="adminPin"
              label="Mã PIN Bảo Mật"
              type="password"
              required
              value={pin}
              onChange={setPin}
              placeholder="Nhập mã PIN (VD: 8888)"
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
                  <Unlock className="w-4 h-4" /> Mở khóa Admin
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!data || isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm font-semibold text-slate-400">Đang tải nội dung Portfolio...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="text-indigo-500" /> Multi-language Content Editor
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chỉnh sửa song ngữ Tiếng Việt & Tiếng Anh, Import/Export file JSON dễ dàng.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Language Switcher Sub-Bar */}
          <div className="flex bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setEditLang('vi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                editLang === 'vi' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Globe className="w-3 h-3" /> 🇻🇳 Tiếng Việt
            </button>
            <button
              onClick={() => setEditLang('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                editLang === 'en' ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Globe className="w-3 h-3" /> 🇬🇧 English
            </button>
          </div>

          {/* Import / Export JSON buttons */}
          <button
            onClick={handleExportJson}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Xuất file portfolio-data.json về máy"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" /> Export JSON
          </button>
          <button
            onClick={handleImportClick}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Tải lên file portfolio-data.json từ máy"
          >
            <Upload className="w-3.5 h-3.5 text-violet-400" /> Import JSON
          </button>

          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Lưu Thay Đổi
          </button>
          <button
            onClick={() => setIsUnlocked(false)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            Khóa
          </button>
        </div>
      </div>

      {/* Alert Status Banner */}
      {saveStatus.type && (
        <div
          className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
            saveStatus.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
          }`}
        >
          {saveStatus.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 dark:border-slate-800/60">
        {[
          { id: 'hero', label: 'Hero Section', icon: <UserCheck className="w-4 h-4" /> },
          { id: 'about', label: 'About Me', icon: <Layers className="w-4 h-4" /> },
          { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
          { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
          { id: 'contact', label: 'Contact Info', icon: <Mail className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm text-left">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
            Đang chỉnh sửa phiên bản: {editLang === 'vi' ? '🇻🇳 Tiếng Việt' : '🇬🇧 English'}
          </span>
        </div>

        {/* HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                id="heroName"
                label={`Họ và Tên (${editLang.toUpperCase()})`}
                value={getBilingualValue(data.hero.name)}
                onChange={(val) => {
                  const updated = { ...data }
                  setBilingualValue(updated.hero, 'name', val)
                  setData(updated)
                }}
              />
              <FormField
                id="heroRole"
                label={`Vị Trí Công Việc (${editLang.toUpperCase()})`}
                value={getBilingualValue(data.hero.role)}
                onChange={(val) => {
                  const updated = { ...data }
                  setBilingualValue(updated.hero, 'role', val)
                  setData(updated)
                }}
              />
            </div>

            <FormField
              id="heroReady"
              label={`Trạng Thái Badge (${editLang.toUpperCase()})`}
              value={getBilingualValue(data.hero.ready)}
              onChange={(val) => {
                const updated = { ...data }
                setBilingualValue(updated.hero, 'ready', val)
                setData(updated)
              }}
            />

            <FormField
              id="heroDesc"
              label={`Mô Tả Ngắn Hero (${editLang.toUpperCase()})`}
              rows={4}
              value={getBilingualValue(data.hero.description)}
              onChange={(val) => {
                const updated = { ...data }
                setBilingualValue(updated.hero, 'description', val)
                setData(updated)
              }}
            />

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <FormField
                id="statYears"
                label="Số Năm Kinh Nghiệm"
                value={data.hero.statsYears}
                onChange={(val) => setData({ ...data, hero: { ...data.hero, statsYears: val } })}
              />
              <FormField
                id="statProjects"
                label="Số Dự Án Hoàn Thành"
                value={data.hero.statsProjects}
                onChange={(val) => setData({ ...data, hero: { ...data.hero, statsProjects: val } })}
              />
              <FormField
                id="statClients"
                label="Khách Hàng Hài Lòng"
                value={data.hero.statsClients}
                onChange={(val) => setData({ ...data, hero: { ...data.hero, statsClients: val } })}
              />
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <FormField
              id="aboutTitle"
              label={`Tiêu Đề About (${editLang.toUpperCase()})`}
              value={getBilingualValue(data.about.title)}
              onChange={(val) => {
                const updated = { ...data }
                setBilingualValue(updated.about, 'title', val)
                setData(updated)
              }}
            />
            <FormField
              id="aboutSubtitle"
              label={`Mô Tả Phụ Subtitle (${editLang.toUpperCase()})`}
              value={getBilingualValue(data.about.subtitle)}
              onChange={(val) => {
                const updated = { ...data }
                setBilingualValue(updated.about, 'subtitle', val)
                setData(updated)
              }}
            />
            <FormField
              id="aboutNarrativeTitle"
              label={`Tiêu Đề Hành Trình (${editLang.toUpperCase()})`}
              value={getBilingualValue(data.about.narrativeTitle)}
              onChange={(val) => {
                const updated = { ...data }
                setBilingualValue(updated.about, 'narrativeTitle', val)
                setData(updated)
              }}
            />
            <FormField
              id="aboutP1"
              label={`Đoạn Văn 1 (${editLang.toUpperCase()})`}
              rows={4}
              value={getBilingualValue(data.about.narrativeP1)}
              onChange={(val) => {
                const updated = { ...data }
                setBilingualValue(updated.about, 'narrativeP1', val)
                setData(updated)
              }}
            />
            <FormField
              id="aboutP2"
              label={`Đoạn Văn 2 (${editLang.toUpperCase()})`}
              rows={4}
              value={getBilingualValue(data.about.narrativeP2)}
              onChange={(val) => {
                const updated = { ...data }
                setBilingualValue(updated.about, 'narrativeP2', val)
                setData(updated)
              }}
            />
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {['frontend', 'backend', 'devops'].map((category) => (
              <div key={category} className="space-y-2">
                <label className="text-sm font-semibold capitalize text-slate-700 dark:text-slate-300">
                  {category} Stack (Phân cách bằng dấu phẩy)
                </label>
                <input
                  type="text"
                  value={data.skills[category].join(', ')}
                  onChange={(e) => {
                    const array = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    setData({ ...data, skills: { ...data.skills, [category]: array } })
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Danh Sách Dự Án ({data.projects.length})</h3>
              <button
                type="button"
                onClick={() => {
                  const newProj = {
                    id: Date.now(),
                    title: { vi: 'Dự án mới', en: 'New Project' },
                    category: 'Frontend',
                    description: { vi: 'Mô tả dự án mới...', en: 'New project description...' },
                    tags: ['React', 'Next.js'],
                    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=60',
                    demoUrl: '#',
                    githubUrl: '#'
                  }
                  setData({ ...data, projects: [...data.projects, newProj] })
                }}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Thêm Dự Án Mới
              </button>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj: any, index: number) => (
                <div key={proj.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-500">Dự án #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setData({ ...data, projects: data.projects.filter((p: any) => p.id !== proj.id) })
                      }}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                      title="Xóa dự án này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      id={`pTitle_${proj.id}`}
                      label={`Tên Dự Án (${editLang.toUpperCase()})`}
                      value={getBilingualValue(proj.title)}
                      onChange={(val) => {
                        const updated = [...data.projects]
                        setBilingualValue(updated[index], 'title', val)
                        setData({ ...data, projects: updated })
                      }}
                    />
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phân Loại</label>
                      <select
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...data.projects]
                          updated[index].category = e.target.value
                          setData({ ...data, projects: updated })
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Fullstack">Fullstack</option>
                      </select>
                    </div>
                  </div>

                  <FormField
                    id={`pDesc_${proj.id}`}
                    label={`Mô Tả Dự Án (${editLang.toUpperCase()})`}
                    rows={3}
                    value={getBilingualValue(proj.description)}
                    onChange={(val) => {
                      const updated = [...data.projects]
                      setBilingualValue(updated[index], 'description', val)
                      setData({ ...data, projects: updated })
                    }}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tags (Phân cách bằng dấu phẩy)</label>
                    <input
                      type="text"
                      value={proj.tags.join(', ')}
                      onChange={(e) => {
                        const updated = [...data.projects]
                        updated[index].tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        setData({ ...data, projects: updated })
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      id={`pDemo_${proj.id}`}
                      label="Link Demo"
                      value={proj.demoUrl}
                      onChange={(val) => {
                        const updated = [...data.projects]
                        updated[index].demoUrl = val
                        setData({ ...data, projects: updated })
                      }}
                    />
                    <FormField
                      id={`pGit_${proj.id}`}
                      label="Link GitHub"
                      value={proj.githubUrl}
                      onChange={(val) => {
                        const updated = [...data.projects]
                        updated[index].githubUrl = val
                        setData({ ...data, projects: updated })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <FormField
              id="contactEmail"
              label="Địa chỉ Email"
              value={data.contact.email}
              onChange={(val) => setData({ ...data, contact: { ...data.contact, email: val } })}
            />
            <FormField
              id="contactGithub"
              label="Đường dẫn GitHub"
              value={data.contact.github}
              onChange={(val) => setData({ ...data, contact: { ...data.contact, github: val } })}
            />
            <FormField
              id="contactLinkedin"
              label="Đường dẫn LinkedIn"
              value={data.contact.linkedin}
              onChange={(val) => setData({ ...data, contact: { ...data.contact, linkedin: val } })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
