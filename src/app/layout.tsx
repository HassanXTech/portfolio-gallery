// import removed
import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfoliogallery.vercel.app"),
  title: "Portfolio Gallery - Curated Developer Portfolios",
  description:
    "Browse a curated gallery of developer portfolios. Preview live sites, explore source code, and get inspired.",
  keywords: [
    // Portfolio-focused keywords
    "developer portfolios",
    "portfolio inspiration",
    "frontend portfolio examples",
    "nextjs portfolio",
    "react portfolio",

    // Long-tail
    "modern portfolio websites",
    "beautiful developer portfolios",

    // Problem-solving keywords
    "how to build portfolio with nextjs",
    "portfolio components",

    // Snippets
    "portfolio templates",

    // Modern design
    "modern portfolio design",

    // Examples
    "portfolio examples",

    // Aesthetics
    "beautiful portfolio",

    // Remove extra gradient-heavy keywords

    // General web
    "frontend inspiration",

    // Portfolio keywords
    "developer portfolio",
    "portfolio inspiration",
    "nextjs portfolio",
    "react portfolio",

    // General keywords
    "tailwind css",
    "background css",
    "background tailwind css",

    // Primary keywords (high intent)
    "cool gradient backgrounds for websites",
    "free CSS background patterns",
    "unique website background designs",
    "modern gradient color backgrounds",
    "geometric backgrounds for websites",
    "decorative website background patterns",
    "website background effects",
    "stylish backgrounds for web design",

    // Long-tail keywords (highly targeted)
    "where to find cool gradient website backgrounds",
    "best sites for free CSS background patterns",
    "how to add gradients in Tailwind CSS",
    "trendy background effects for websites",
    "creative backgrounds for frontend projects",
    "tailwind-compatible gradient color ideas",
    "lightweight CSS background snippets for websites",
    "open-source background patterns for web developers",
    "free gradient palettes for web design",

    // LSI (related context keywords)
    "UI background resources",
    "frontend design assets",
    "portfolio gallery",
    "frontend portfolio examples",
    "modern portfolio design",
  ].join(", "),

  authors: [{ name: "Megh Bari", url: "https://github.com/HassanXTech" }],
  creator: "Megh Bari",
  publisher: "PortfolioGallery",

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
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Portfolio Gallery - Curated Developer Portfolios",
    description:
      "Discover developer portfolios with live previews and source links.",
    url: "https://portfoliogallery.vercel.app",
    siteName: "Portfolio Gallery",
    type: "website",
    images: [
      {
        url: "/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Gallery – Curated Developer Portfolios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Gallery - Curated Developer Portfolios",
    description:
      "Curated developer portfolios with live previews and source links.",
    images: ["/og-banner.png"],
    creator: "@HassanXTech",
    site: "@HassanXTech",
  },
  alternates: { canonical: "https://portfoliogallery.vercel.app" },

  classification: "Developer Portfolios, Web Design Inspiration",

  // Additional SEO enhancements
  category: [
    "Web Development Tools",
    "Frontend Development",
    "CSS Tools",
    "UI Design Resources",
    "Background Patterns",
    "Gradients Generator",
    "Tailwind CSS Resources",
    "Web Design Assets",
    "Open Source Tools",
    "Developer Productivity",
    "Creative Coding",
    "Design Inspiration",
    "Code Snippets",
    "Modern Web Design",
    "Responsive Design",
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
    "google-site-verification": "xeqxMvzZZQWV43nn06hJDnwUVVaRfYRaMrYHy",

    // Rich snippets hints
    "article:author": "Megh Bari",
    "article:publisher": "https://github.com/HassanXTech",
    "article:section": "Web Development",
    "article:tag": "CSS, Background Patterns, Gradients, Web Design",
    "og:updated_time": new Date().toISOString(),
    "og:locale": "en_US",
    "og:type": "website",

    "revisit-after": "7 days",
    distribution: "global",
    rating: "general",
    copyright: "© 2025 Megh Bari. All rights reserved.",
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
        {/* og image */}
        <meta property="og:image" content="/og-banner.png" />
        <meta name="twitter:image" content="/og-banner.png" />

        {/* <meta property="og:image" content="https://portfoliogallery.dev/opengraph-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:image" content="https://portfoliogallery.dev/twitter-image.png" />
        <meta name="twitter:image:type" content="image/png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" /> */}
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Portfolio Gallery",
              url: "https://portfoliogallery.vercel.app/",
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
                "Curated developer portfolios with live previews and source links.",
              url: "https://portfoliogallery.vercel.app",
              applicationCategory: "Website",
              inLanguage: "en-US",
              isAccessibleForFree: true,
              publisher: {
                "@type": "Organization",
                name: "Portfolio Gallery",
                url: "https://portfoliogallery.vercel.app",
              }
            }),
          }}
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${GeistSans.className} text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <div className="min-h-screen w-full relative">
            <div
              className="fixed inset-0 -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
              } as React.CSSProperties}
            />
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
