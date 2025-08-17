import { Portfolio } from "@/types/portfolio";

// Using the existing Pattern type to avoid large refactors.
// For PortfolioGallery, we primarily use: name, category, thumbnailUrl, liveUrl, sourceUrl.
// "style" and "code" are kept but not required when URLs are provided.

export const gridPortfolios: Portfolio[] = [
  {
    id: "portfolio-1",
    name: "Hassanx.tech",
    category: "web",
    thumbnailUrl: "https://private-user-images.githubusercontent.com/173554334/478552915-661f665d-d2ae-4f08-8ba4-308feba1efd9.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTUzODc4MjIsIm5iZiI6MTc1NTM4NzUyMiwicGF0aCI6Ii8xNzM1NTQzMzQvNDc4NTUyOTE1LTY2MWY2NjVkLWQyYWUtNGYwOC04YmE0LTMwOGZlYmExZWZkOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgxNlQyMzM4NDJaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mOTZkZWMyOTI3MmM5MWVmZGM3NDJkNzFkODJmYmQyMDNkYzdiOWEwOGJjNzcxZjUyNTc3NWM2Mjg0NjliYzE1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.KNn-1xXfIc6EFi6HO49pD8Tu_Fz50HZpkrgka7APAjE",
    liveUrl: "https://hassanx.tech",
    sourceUrl: "https://github.com/example/repo",
    style: {},
    badge: "New",
  },
  {
    id: "portfolio-2",
    name: "wiscaksono.com",
    category: "agency",
    thumbnailUrl: "https://github.com/wiscaksono/site/blob/master/static/preview-1.png?raw=true",
    thumbnailFit: "cover",
    liveUrl: "https://wiscaksono.com",
    sourceUrl: "https://github.com/wiscaksono/site",
    style: {},
    badge: "New",
  },
  {
    id: "portfolio-3",
    name: "enscribe.dev",
    category: "uiux",
    thumbnailUrl: "https://github.com/jktrn/enscribe.dev/raw/main/public/static/showcase-card.png",
    thumbnailFit: "cover",
    liveUrl: "https://enscribe.dev",
    sourceUrl: "https://github.com/jktrn/enscribe.dev",
    style: {},
  },
  {
    id: "portfolio-4",
    name: "anomusly",
    category: "design-engineering",
    thumbnailUrl: "https://private-user-images.githubusercontent.com/173554334/478728090-9310a65d-fcaf-4828-b8cb-c680e6c29d07.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTUzODg2MzgsIm5iZiI6MTc1NTM4ODMzOCwicGF0aCI6Ii8xNzM1NTQzMzQvNDc4NzI4MDkwLTkzMTBhNjVkLWZjYWYtNDgyOC1iOGNiLWM2ODBlNmMyOWQwNy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwODE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDgxNlQyMzUyMThaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xMGI3OTFmMDMxZmI2ZjM4ZjVkODIzZTcxZDg0NGU2N2ExNTI1MzFjNWI1MmQ3MzE5Y2NjYmFkMGUzYWM0ZjE3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.wVcs9eFlch6jtrsDE1bXWOYx6kWMffd--4BGiQCYSx0",
    liveUrl: "https://hassanxs.vercel.app/",
    sourceUrl: "https://github.com/HassanXTech/V1-Portfolio",
    style: {},
  },
];


