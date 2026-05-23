# True Ridge Construction

Marketing website for True Ridge Construction — kitchen, bathroom, basement remodels, and fireplace installs serving Salt Lake County and Utah County.

## Stack

- Next.js 15 (App Router)
- React + TypeScript
- Tailwind CSS
- EmailJS (contact form)
- Embla Carousel (project gallery)

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Add your EmailJS keys to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## EmailJS Setup

1. Create an account at [emailjs.com](https://www.emailjs.com)
2. Add an email service connected to `Info@trueridgeconstruct.com`
3. Create a template with fields: `from_name`, `phone`, `from_email`, `message`
4. Copy your public key, service ID, and template ID into `.env.local`

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add the three `NEXT_PUBLIC_EMAILJS_*` environment variables
4. Deploy and point `trueridgeconstruct.com` DNS to Vercel

## Project Structure

```
app/           Routes, layouts, metadata, sitemap
components/    React components (ui, layout, sections, forms)
lib/           Constants, project data, SEO helpers
public/        Logo and static assets
```

## Replace Placeholder Images

Portfolio and hero images currently use Unsplash placeholders. Replace entries in `lib/projects.ts` and the hero background in `components/sections/Hero.tsx` with real project photos from Jordan.

Replace `public/logo.svg` with the official logo PNG/SVG when available.
