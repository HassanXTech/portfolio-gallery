import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfoliogallery.dev"),
  title: "Portfolio Gallery - Providing Beautiful Portfolios | 100+ Stunning Designs",
  description:
    "Providing beautiful portfolios that showcase your work professionally. 100+ stunning designs with live previews, source code, and proven results for developers and designers.",
  keywords: [
    // Primary keywords (focus on user intent)
    "developer portfolios",
    "portfolio gallery",
    "portfolio showcase",
    "web development portfolios",
    "ui ux design portfolios",
    "mobile app portfolios",
    "data science portfolios",
    "backend devops portfolios",
    "agency portfolios",
    "design engineering portfolios",
    "indie maker portfolios",
    "game development portfolios",
    "student portfolios",
    "content writing portfolios",

    // New variations for multiple search results
    "providing beautiful portfolios",
    "build share inspire",
    "portfolio designs that convert",
    "stunning portfolio examples",
    "professional portfolio showcase",
    "portfolio inspiration gallery",
    "developer portfolio collection",
    "beautiful portfolio designs",
    "portfolio showcase platform",
    "portfolio design inspiration",

    // Long-tail keywords (better for ranking)
    "free developer portfolio examples",
    "responsive portfolio designs",
    "modern portfolio inspiration",
    "portfolio design inspiration",
    "developer portfolio collection",
    "portfolio browsing platform",
    "live portfolio previews",
    "github portfolio showcase",
    "portfolio search and filter",
    "favorite portfolio system",

    // Problem-solving keywords
    "how to find portfolio inspiration",
    "where to see developer portfolios",
    "best portfolio examples for developers",
    "portfolio design ideas for developers",
    "portfolio inspiration for hiring",
    "modern portfolio design trends",

    // Portfolio-specific keywords
    "portfolio gallery",
    "portfolio showcase platform",
    "developer portfolio browsing",
    "portfolio inspiration tool",
    "portfolio collection website",
    "portfolio discovery platform",
    "portfolio browsing experience",
    "portfolio search functionality",

    // Modern portfolio keywords
    "modern developer portfolios",
    "contemporary portfolio designs",
    "trendy portfolio layouts",
    "innovative portfolio ideas",
    "cutting-edge portfolio designs",

    // Portfolio examples keywords
    "portfolio examples",
    "portfolio design examples",
    "developer portfolio examples",
    "web developer portfolio examples",
    "ui designer portfolio examples",

    // Beautiful portfolio keywords
    "beautiful portfolio designs",
    "stunning portfolio examples",
    "aesthetic portfolio layouts",
    "visually appealing portfolios",
    "creative portfolio designs",

    // Website portfolio keywords
    "portfolio websites",
    "developer portfolio websites",
    "designer portfolio websites",
    "portfolio website examples",
    "portfolio website inspiration",

    // Brand keywords
    "portfolio gallery",
    "portfolio gallery dev",
    "portfoliogallery",
    "portfoliogallery dev",

    // General keywords
    "nextjs",
    "react",
    "typescript",
    "tailwindcss",
    "vercel",

    // Primary keywords (high intent)
    "cool developer portfolios for inspiration",
    "free developer portfolio examples",
    "unique portfolio design ideas",
    "modern portfolio design inspiration",
    "geometric portfolio layouts",
    "decorative portfolio designs",
    "portfolio design effects",
    "stylish portfolio layouts",

    // Long-tail keywords (highly targeted)
    "where to find cool developer portfolios",
    "best sites for portfolio inspiration",
    "how to create modern portfolios",
    "trendy portfolio design ideas",
    "creative portfolio layouts for developers",
    "nextjs-compatible portfolio ideas",
    "lightweight portfolio examples for developers",
    "open-source portfolio inspiration for web developers",
    "free portfolio design resources",

    // LSI (related context keywords)
    "UI portfolio resources",
    "frontend portfolio assets",
    "portfolio design collections",
    "Next.js portfolio examples",
    "free portfolio templates",
    "web design portfolio tools",
    "portfolio design inspiration",
    "modern portfolio ideas",
    "website portfolio tools",
    "design-ready portfolio examples",
  ].join(", "),

  authors: [{ name: "HassanXTech", url: "https://github.com/HassanXTech" }],
  creator: "HassanXTech",
  publisher: "Portfolio Gallery",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Portfolio Gallery - Providing Beautiful Portfolios",
    description:
      "Providing beautiful portfolios that showcase your work professionally. 100+ stunning designs with live previews, source code, and proven results for developers and designers.",
    url: "https://portfoliogallery.dev",
    siteName: "Portfolio Gallery",
    type: "website",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Gallery – Providing Beautiful Portfolios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Gallery - Providing Beautiful Portfolios",
    description: "Providing beautiful portfolios that showcase your work professionally. 100+ stunning designs with live previews, source code, and proven results for developers and designers.",
    images: ["/og-banner.png"],
    creator: "@HassanXTech",
    site: "@HassanXTech",
  },
  alternates: {
    // canonical: "https://portfoliogallery.dev", // Removed duplicate
  },

  classification: "Web Development, Portfolio Showcase, Design Inspiration, Professional Portfolios, Beautiful Designs, Build Share Inspire",

  // Additional SEO enhancements
  category: [
    "Web Development Tools",
    "Portfolio Showcase",
    "Design Inspiration",
    "Developer Resources",
    "UI/UX Design",
    "Mobile App Development",
    "Modern Web Design",
    "Responsive Design",
    "Professional Portfolios",
    "Beautiful Portfolio Designs",
    "Portfolio Inspiration",
    "Developer Showcase",
  ].join(", "),

  // Add app-specific metadata
  applicationName: "Portfolio Gallery",

  // Schema.org structured data hints
  other: {
    "application-name": "Portfolio Gallery",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Portfolio Gallery",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",

    // Additional meta tags for better discovery
    "google-site-verification": "DeGN2y_FsI_RNPub9-2TPRjAeV-fehlO_BTgS5NePw8",

    // Rich snippets hints
    "article:author": "HassanXTech",
    "article:publisher": "https://github.com/HassanXTech",
    "article:section": "Web Development",
    "article:tag": "Developer Portfolios, Portfolio Showcase, Design Inspiration, Web Development",
    "og:updated_time": new Date().toISOString(),
    "og:locale": "en_US",
    "og:type": "website",

    "revisit-after": "7 days",
    distribution: "global",
    rating: "general",
    copyright: "© 2025 HassanXTech. All rights reserved.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://portfoliogallery.dev" />
        
        {/* Additional meta tags to prevent redirect issues */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Remove conflicting crawling optimization tags */}
        {/* <meta name="googlebot-news" content="nosnippet" />
        <meta name="googlebot" content="noarchive" />
        <meta name="googlebot" content="noimageindex" /> */}
        
        {/* og image */}
        <meta
          property="og:image"
          content="https://portfoliogallery.dev/og-banner.png"
        />
        <meta
          name="twitter:image"
          content="https://portfoliogallery.dev/og-banner.png"
        />
        <meta name="google-site-verification" content="DeGN2y_FsI_RNPub9-2TPRjAeV-fehlO_BTgS5NePw8" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Portfolio Gallery",
              url: "https://portfoliogallery.dev/",
              description: "Providing beautiful portfolios that showcase your work professionally. 100+ stunning designs with live previews, source code, and proven results for developers and designers.",
              author: {
                "@type": "Person",
                name: "HassanXTech",
                url: "https://github.com/HassanXTech",
              },
              publisher: {
                "@type": "Organization",
                name: "Portfolio Gallery",
                url: "https://portfoliogallery.dev",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
              inLanguage: "en-US",
              isAccessibleForFree: true,
              keywords: "Developer Portfolios, Portfolio Showcase, Design Inspiration, Web Development, UI/UX Design",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Portfolio Gallery",
              description:
                "Providing beautiful portfolios that showcase your work professionally. 100+ stunning designs with live previews, source code, and proven results for developers and designers.",
              url: "https://portfoliogallery.dev",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              author: {
                "@type": "Person",
                name: "HassanXTech",
                url: "https://github.com/HassanXTech",
              },
              publisher: {
                "@type": "Organization",
                name: "Portfolio Gallery",
                url: "https://portfoliogallery.dev",
              },
              datePublished: "2024-01-01",
              dateModified: new Date().toISOString(),
              inLanguage: "en-US",
              isAccessibleForFree: true,
              keywords:
                "Developer Portfolios, Portfolio Showcase, Design Inspiration, Web Development, UI/UX Design",
              screenshot: [
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-1.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-2.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-3.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-4.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-5.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-6.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-7.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-8.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-9.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-10.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-11.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-12.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-13.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-14.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-15.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-16.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-17.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-18.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-19.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-20.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-21.png",
                  description:
                    "Portfolio Gallery - Providing Beautiful Portfolios",
                },
                {
                  "@type": "ImageObject",
                  contentUrl:
                    "https://portfoliogallery.dev/snapshots/screenshot-22.png",
                  description:
                    "Portfolio Gallery - Build. Share. Inspire.",
                },
              ],
              softwareVersion: "1.0.0",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "100",
                bestRating: "5",
                worstRating: "1",
              },
              sameAs: [
                "https://github.com/HassanXTech",
                "https://twitter.com/HassanXTech",
                "https://portfoliogallery.dev",
              ],
              featureList: [
                "100+ curated developer portfolios",
                "Live portfolio previews with iframe embeds",
                "Source code access and GitHub links",
                "Category-based portfolio organization",
                "Search and filter functionality",
                "Favorites system for portfolio management",
                "Responsive design for all devices",
                "Dark/light theme support",
                "Professional portfolio showcase",
                "Beautiful portfolio designs",
                "Portfolio inspiration gallery",
                "Developer portfolio collection",
                "Portfolio design inspiration",
                "Stunning portfolio examples",
              ],
              browserRequirements: "Requires modern browser with JavaScript support",
              interactionStatistic: {
                "@type": "InteractionCounter",
                interactionType: { "@type": "http://schema.org/ViewAction" },
                userInteractionCount: 2500,
              },
            }),
          }}
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${GeistSans.className} bg-background text-foreground antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
