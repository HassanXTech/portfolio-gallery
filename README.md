# Portfolio Gallery

> Discover and showcase developer portfolios. Same clean UI, focused on people and projects.

<div align="center">
  <img src="./public/images/readme-banner.png" alt="Portfolio Gallery Banner" />
  <br><br>
  <p align="left">
    <strong>A curated, searchable gallery of real developer portfolios.</strong>
    Preview live sites, view source, filter by skill/domain, and get inspired for your next personal site or team page.<br>
  </p>
  <br>
  <p align="center">
    <img src="https://img.shields.io/github/stars/HassanXTech/portfolio-gallery?style=social" alt="GitHub stars" />
<img src="https://img.shields.io/github/forks/HassanXTech/portfolio-gallery?style=social" alt="GitHub forks" />
<img src="https://img.shields.io/github/license/HassanXTech/portfolio-gallery?style=social" alt="License" />
<a href="https://vercel.com/oss">
    <img src="https://img.shields.io/badge/Sponsored%20by-Vercel-000000?style=social&logo=vercel&logoColor=black" alt="Sponsored by Vercel" />
</a>
  </p>
</div>

---

## Visit: **https://portfoliogallery.vercel.app/**

![UI](./public/images/readme-img-one.png)
![UI](./public/images/readme-img-two.png)
![UI](./public/images/readme-img-four.png)
![UI](./public/images/readme-img-three.png)

## Why

Developers struggle to find high‑quality portfolio references with code links. This project centralizes great examples with quick actions: open live, open source, preview inside modal, and browse by category.

## Features

- **Portfolio grid** – Landscape cards with thumbnail, tags, and actions
- **Details modal** – Thumbnail/Live toggle with labeled controls
- **Open in new tab** and **Source Code** quick actions
- **Categories** – Web, Mobile, UI/UX, Data/ML, Backend/DevOps, Agency, Design Engineering, Indie, Game, Student, Content
- **Search** and **Favorites**
- **Auto‑fit thumbnails** with blurred background fill or crop‑to‑cover per item

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Vercel** (deploy + hosting)

## Getting Started

### Prerequisites
- Node.js 18+

### Installation

```bash
git clone https://github.com/HassanXTech/portfolio-gallery.git
cd portfolio-gallery
npm install
# or yarn / pnpm
```

### Development

```bash
npm run dev
```
Open http://localhost:3000

### Production build

```bash
npm run build
npm start
```

## How to Use

1. Visit the site: https://portfoliogallery.vercel.app/
2. Browse portfolios by category or search.
3. Click any card to open the details modal.
4. Toggle Thumbnail/Live, and open Demo or Source.
5. Use Favorites to collect references.

## Adding Portfolios

Add entries in `src/data/portfolios.ts`. Each item:

```ts
{
  id: "portfolio-unique-id",
  name: "Display Name",
  category: "web" | "mobile" | "uiux" | "data-ml" | "backend-devops" | "agency" | "design-engineering" | "indie" | "game" | "student" | "content",
  thumbnailUrl: "https://...",
  thumbnailFit?: "contain" | "cover",
  liveUrl?: "https://...",
  sourceUrl?: "https://...",
  tags?: ["React", "TypeScript"],
  style: {},
  // no code field needed
}
```

### Tips
- Thumbnails from external hosts must be allowed in `next.config.ts` (`images.remotePatterns`).
- Set `thumbnailFit: "cover"` to crop‑to‑fill if needed.
- Prefer 16:9 images for best card fit.

## Contributing

Pull requests are welcome! Please:
- Keep entries high‑quality and real
- Include both `liveUrl` and `sourceUrl` when possible
- Use meaningful tags and the proper category

## Project Structure

```
portfolio-gallery/
src/
    app/
    components/
    context/
    data/
    hooks/
    lib/
    types/
```

## License

MIT © HassanXTech

---

If you like this project, give it a ⭐️ and share it!
