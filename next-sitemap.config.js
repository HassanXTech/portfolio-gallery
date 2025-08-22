/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://portfoliogallery.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
    '/_error',
    '/_document',
  ],
  changefreq: 'weekly', 
  priority: 0.8,
  trailingSlash: false,
  sourceMap: false,
  // Add more sitemap options
  additionalPaths: async (config) => {
    const result = [
      {
        loc: '/',
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/portfolios',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
    ];
    return result;
  },
};