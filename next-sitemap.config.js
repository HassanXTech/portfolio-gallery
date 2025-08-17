/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://portfoliogallery.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  changefreq: 'weekly', 
  priority: 0.8,        
  trailingSlash: false,
  sourceMap: false,
};