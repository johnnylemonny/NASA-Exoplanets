<div align="center">

<img src="public/favicon.svg" alt="ExoVault Logo" width="80" />

![ExoVault Banner](public/banner.png)

# 🌌 ExoVault
### The Premium NASA Exoplanet Archive Explorer

[![Astro](https://img.shields.io/badge/Astro-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

**ExoVault** is an elegant, high-performance interface for exploring NASA's Planetary Systems archive. Built for discovery and scientific storytelling, it turns raw astronomical data into a cinematic, production-grade experience.

[View Demo](https://johnnylemonny.github.io/ExoVault/) • [Documentation](#-getting-started) • [NASA Archive](https://exoplanetarchive.ipac.caltech.edu/)

</div>

---

## ✨ Features

- **Atmospheric Discovery**: A "preset-first" approach that makes the archive approachable through curated featured worlds and meaningful entry points.
- **Side-by-Side Comparison**: Powerful analysis tools to compare confirmed planets across all major astronomical metrics.
- **Production-Ready Pipeline**: A custom build-time processing engine that normalizes NASA's raw CSV data into compact, ultra-fast JSON payloads.
- **Glassmorphic UI**: A dark-mode first design system featuring smooth motion, high contrast, and accessible landmarks.
- **Zero-Backend Stack**: Designed for high-traffic scalability using Astro's static generation and GitHub Pages.

## 🛠 Tech Stack

- **Framework**: [Astro 6](https://astro.build/) (Static Site Generation)
- **Runtime**: [React 19](https://react.dev/) (Interactive Metadata Islands)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + Custom Design Tokens
- **Data Engineering**: Node.js & PapaParse for NASA Tap results
- **Automation**: GitHub Actions for CI/CD and Daily Data Refresh

## 🚀 Getting Started

### 1. Repository Setup
```bash
git clone https://github.com/johnnylemonny/ExoVault.git
cd ExoVault
pnpm install
```

### 2. Data Synchronization
ExoVault requires local processing of the NASA archive.
```bash
# Fetch latest snapshot from NASA
pnpm run data:refresh

# Build optimized JSON data structures
pnpm run data:build
```

### 3. Development
```bash
pnpm run dev
```

## 🗳 Data Provenance

All data is sourced from the **NASA Exoplanet Archive**. 
- **Source**: `Planetary Systems (PS)` table (Confirmed Planets).
- **Disclaimer**: This is an independent open-source project and is not affiliated with or endorsed by NASA.

## 🤖 Automated Workflows

- **CI/CD**: Full build verification on every commit.
- **Health Check**: Automated linting and type-safety validation.
## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please see our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## ⚖️ License

MIT License. Check the `LICENSE` file for full details.

---

<div align="center">
Crafted with scientific curiosity by [johnnylemonny](https://github.com/johnnylemonny)
</div>
