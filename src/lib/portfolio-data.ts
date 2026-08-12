import fs from 'fs/promises'
import path from 'path'
import defaultData from '@/data/portfolio-data.json'

const DATA_FILE_PATH = path.join(process.cwd(), 'src/data/portfolio-data.json')

export async function getPortfolioData() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.warn('Could not read portfolio-data.json, returning default data', error)
    return defaultData
  }
}

export async function savePortfolioData(data: any) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8')
}
