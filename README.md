<div align="center">
  <img src="public/banner.png" width="100%" alt="ExoVault Banner">
  
  <br />

  <img src="public/favicon.svg" width="100" height="100" alt="ExoVault Logo">

  # ExoVault
  ### Scientific • Cinematic • High-Performance

  [![Deploy Status](https://img.shields.io/github/actions/workflow/status/johnnylemonny/ExoVault/deploy.yml?branch=main&style=for-the-badge&logo=github&label=deploy&color=007ACC)](https://github.com/johnnylemonny/ExoVault/actions/workflows/deploy.yml)
  [![Lint Status](https://img.shields.io/github/actions/workflow/status/johnnylemonny/ExoVault/super-linter.yml?branch=main&style=for-the-badge&logo=github&label=lint&color=007ACC)](https://github.com/johnnylemonny/ExoVault/actions/workflows/super-linter.yml)
  [![License](https://img.shields.io/github/license/johnnylemonny/ExoVault?style=for-the-badge&color=007ACC)](https://github.com/johnnylemonny/ExoVault/blob/main/LICENSE)
  [![Live Demo](https://img.shields.io/badge/Live-Demo-007ACC?style=for-the-badge)](https://johnnylemonny.github.io/ExoVault/)

  **Explore the cinematic frontier of planetary discovery.**  
  ExoVault is a premium NASA Exoplanet Archive explorer built to turn raw astronomical data into a high-fidelity, high-speed scientific experience.

  [Explore Docs](#-getting-started) • [Report Bug](https://github.com/johnnylemonny/ExoVault/issues) • [Request Feature](https://github.com/johnnylemonny/ExoVault/issues)

</div>

---

## 📖 Table of Contents

- [🌌 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [🏗️ Project Architecture](#️-project-architecture)
- [📡 Data Pipeline](#-data-pipeline)
- [🤝 Contributing](#-contributing)
- [⚖️ License](#️-license)
- [🙏 Acknowledgements](#-acknowledgements)

---

## 🌌 Overview

**ExoVault** is a next-generation planetary archive explorer designed for researchers, developers, and space enthusiasts who value technical precision and cinematic presentation. 

By leveraging **Astro 6** and **React 19**, ExoVault delivers a zero-latency "Islands" architecture that processes thousands of rows of raw NASA system data into a lightweight, searchable, and beautiful interface. It eliminates the clunky overhead of traditional scientific databases in favor of a modern, glassmorphic exploration tool.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🔭 **Cinematic Discovery** | Explore NASA's exoplanet catalog with high-fidelity visuals and animations. |
| 🔄 **Auto-Sync Pipeline** | Weekly automated ingestion of the latest planetary discoveries via NASA APIs. |
| ⚖️ **Side-by-Side Comparison** | Analyze and compare up to 3 different planetary systems simultaneously. |
| ⚡ **Static Efficiency** | Zero-latency navigation powered by Astro's server-side generation. |
| 🌒 **Atmospheric UI** | Premium glassmorphism design with native support for Light/Dark modes. |
| 📊 **Scientific Detail** | Comprehensive access to orbital periods, mass, radius, and host star metadata. |
| 📱 **Adaptive Power** | Precision mobile-first responsiveness optimized for deep data ingestion. |

---

## 🛠️ Tech Stack

ExoVault is engineered using the most resilient modern frontend standards:

- **Framework:** [Astro 6](https://astro.build/) (Static Site Generation + Islands Architecture)
- **Interactive UI:** [React 19](https://react.dev/) + [Lucide Icons](https://lucide.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (Modern utility-first CSS)
- **Data Engine:** [PapaParse](https://www.papaparse.com/) for lightning-fast CSV-to-JSON ingestion
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed for data integrity)

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js:** `v22.0.0` or higher
- **pnpm:** `v10.11.1` or higher (Recommended)

### ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/johnnylemonny/ExoVault.git
   cd ExoVault
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Initalize the data cache:**
   ```bash
   pnpm run data:build
   ```

4. **Spin up the development environment:**
   ```bash
   pnpm dev
   ```

---

## 🏗️ Project Architecture

```text
src/
├── components/   # Atomic UI components & custom Design System
├── generated/    # Automated build-time data assets
├── lib/          # Scientific math engines & formatting helpers
├── pages/        # Astro routing and cinematic layouts
└── types/        # Comprehensive TypeScript definitions
scripts/          # Custom Node.js data ingestion pipelines
```

---

## 📡 Data Pipeline

ExoVault operates on a **Static-First Data Philosophy**:

- **Automated Ingestion:** Every Monday, a GitHub Action triggers `scripts/refresh-data.mjs` to pull the latest CSV from NASA.
- **Optimized Payloads:** Data is cleaned, typed, and compressed into `public/data/exoplanets-data.json` during the build phase.
- **Privacy & Speed:** No database calls at runtime. Everything is delivered as optimized static assets for maximum speed and zero tracking.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Please review our [**Contributing Guidelines**](CONTRIBUTING.md) before starting.
2. Check the [**Issues**](https://github.com/johnnylemonny/ExoVault/issues) for open tasks.
3. Open a Pull Request using our [**Standard Template**](.github/pull_request_template.md).

---

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information. This license allows for reuse while protecting the original authors' credit.

---

## 🙏 Acknowledgements

- Data provided by the **[NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)**.
- Inspired by modern astronomical visualizer projects.
- Built as part of a public open-source space exploration ecosystem.

---

<p align="center">
  <i>Built with scientific passion for the discovery of other worlds.</i>
</p>

<p align="center">
<pre align="center">
  ______                __      __            _ _   
 |  ____|               \ \    / /           | | |  
 | |__  __  _____        \ \  / /_ _ _   _ | | |_ 
 |  __| \ \/ / _ \        \ \/ / _` | | | || | __|
 | |____ >  < (_) |        \  / (_| | |_| || | |_ 
 |______/_/\_\___/          \/ \__,_|\__,_||_|\__|
</pre>
</p>
