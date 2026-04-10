# 🌌 ExoVault

## The Premium NASA Exoplanet Archive Explorer

![ExoVault Banner](public/banner.png)

[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

**ExoVault** is an elegant, high-performance interface for exploring NASA's
Planetary Systems archive. Built for discovery and scientific storytelling,
it turns raw astronomical data into a cinematic, production-grade experience.

[View Demo](https://johnnylemonny.github.io/ExoVault/) •
[Documentation](#getting-started) •
[NASA Archive](https://exoplanetarchive.ipac.caltech.edu/)

---

## Getting Started

### Development

ExoVault is built with **Astro 6** and **React 19**. It uses a custom data
pipeline to process NASA's raw CSV data into optimized JSON payloads.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/johnnylemonny/ExoVault.git
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Build the data cache**:

   ```bash
   pnpm run data:build
   ```

4. **Start the local server**:

   ```bash
   pnpm run dev
   ```

---

## Tech Stack

- **Core**: Astro 6 (Static Site Generation)
- **UI**: React 19 (Islands Architecture)
- **Styling**: Tailwind CSS 4 (Modern utility-first CSS)
- **Language**: TypeScript (Type-safe codebase)
- **Data**: Node.js pipeline with PapaParse for NASA CSV ingestion

---

## Key Features

- **Cinematic Discovery**: An interface designed for exploration, not just
  querying.
- **Islands Architecture**: Zero-latency navigation with interactive React
  components only where needed.
- **Compare Mode**: Side-by-side analysis of up to three exoplanetary systems.
- **Glassmorphic UI**: High-end aesthetic with native-feeling transitions and
  backdrop-blur effects.
- **Automated Refresh**: A custom pipeline that keeps the archive in sync with
  NASA's latest discoveries.

---

## Automations

- **CI/CD**: Full build verification on every commit.
- **Health Check**: Automated linting and type-safety validation.
- **Live Sync**: Weekly scheduled data refresh that pulls the latest NASA
  discoveries and redeploys the site.

---

## Contributing

Contributions are what make the open-source community such an amazing place to
learn, inspire, and create. Any contributions you make are
**greatly appreciated**.

Please see our [Contributing Guide](CONTRIBUTING.md) for details on our code of
conduct, and the process for submitting pull requests to us.

---

## License

MIT License. Check the `LICENSE` file for full details.

---

Crafted with scientific curiosity by [johnnylemonny](https://github.com/johnnylemonny)
