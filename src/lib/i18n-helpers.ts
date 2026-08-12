export function getBilingualText(field: any, lang: 'vi' | 'en' = 'vi'): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'object') {
    return field[lang] || field['vi'] || field['en'] || ''
  }
  return String(field)
}
