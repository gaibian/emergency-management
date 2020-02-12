import defaultSettings from '@/settings'

const title = defaultSettings.title || '救护车急救平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
