# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page marketing website for Salão Loha, a beauty salon in Osasco, São Paulo, Brazil. No build system or package manager - pure HTML/CSS/JS served directly.

## Technology Stack

- **HTML5** with semantic markup
- **CSS3**: Bootstrap 5.3.2, Animate.css, FontAwesome, custom `css/style.css`
- **JavaScript**: Vanilla JS with FancyBox 4 (lightbox), Lottie.js (animations), LordIcon (animated icons)
- **Hosting**: Vercel with automatic deployment on git push
- **Assets**: CDN-delivered libraries (jsDelivr, Google Fonts - Poppins)

## Development

No npm/yarn commands. Open `index.html` directly or use VS Code Live Server (configured for port 5501).

```bash
# Deploy (automatic via Vercel on push to main)
git push origin main
```

## Architecture

```
index.html          # Main page with all sections
css/style.css       # Custom styles (primary color: #ed3237)
js/main.js          # Gallery init, animations, WhatsApp button
images/             # Gallery photos, backgrounds, product images
vercel.json         # Caching headers for images/css/js (1 year)
```

## Key Sections in index.html

1. Fixed navbar with responsive hamburger menu
2. Hero section with salon branding
3. Services cards (Cabelereiro, Manicure, Terapia Capilar, Depilação)
4. Portfolio gallery (FancyBox lightbox, 9 images)
5. Embedded Google Map for location
6. Footer with social links (Instagram, Facebook, TikTok)

## External Integrations

- **WhatsApp**: Primary contact via +5511942124242 (floating button)
- **Google Maps**: Embedded map for salon location
- **Social**: Instagram, Facebook, TikTok links in footer

## Language

All content is in Portuguese (pt-BR).
