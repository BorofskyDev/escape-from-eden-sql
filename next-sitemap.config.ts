// next-sitemap.config.ts
import { IConfig } from 'next-sitemap'

const config: IConfig = {
  siteUrl: process.env.SITE_URL || 'https://yourdomain.com',
  generateRobotsTxt: true, // (optional)
  // additional options
}

export default config
