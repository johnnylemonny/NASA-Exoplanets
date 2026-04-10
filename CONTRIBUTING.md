# Contributing to ExoVault

First off, thank you for considering contributing to **ExoVault**! Projects like this thrive on community curiosity and collaboration. Whether you are fixing a bug, improving the UI, or helping optimize the data pipeline, your help is greatly appreciated.

---

## 🛰️ How Can I Contribute?

### Reporting Bugs

If you find a bug, please [open an issue](https://github.com/johnnylemonny/ExoVault/issues). Be sure to include:
- A clear, descriptive title.
- Steps to reproduce the issue.
- Your browser and OS details.
- Screenshots if applicable.

### Suggesting Improvements

Have an idea to make the explorer even more atmospheric? Open an issue and label it as an `enhancement`. We love ideas that improve data visualization or accessibility!

### Pull Requests

1. **Fork** the repository and create your branch from `main`.
2. **Setup** the project locally (see the [Development Setup](#development-setup) section below).
3. **Commit** your changes using descriptive messages.
4. **Link** your PR to any related issues.
5. **Verify** your changes by running `pnpm lint` and `pnpm build`.

---

## 🛠️ Development Setup

ExoVault uses **Astro**, **React**, and **pnpm**.

1. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ExoVault.git
   cd ExoVault
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Prepare the data**:
   This project relies on a static snapshot of the NASA archive.
   ```bash
   pnpm run data:refresh  # Fetch latest CSV from NASA
   pnpm run data:build    # Process CSV into optimized JSON
   ```

4. **Start the dev server**:
   ```bash
   pnpm run dev
   ```

---

## 📏 Coding Standards

To maintain the premium quality and performance of ExoVault, please follow these guidelines:

- **TypeScript**: All new logic must be written in TypeScript with proper typing.
- **Styling**: Use **Tailwind CSS 4**. Avoid ad-hoc utilities; stick to the project's design tokens.
- **Visuals**: Maintain the **glassmorphic** aesthetic (backdrop-blur, subtle gradients, high-contrast dark mode).
- **Format**: 2-space indentation.
- **Performance**: Ensure a Lighthouse score of 95+ on mobile. Use WebP/AVIF for images and lazy load components where possible.
- **A11y**: Follow WCAG 2.2 AA standards. Ensure all interactive elements are keyboard accessible.

---

## 📜 Code of Conduct

By participating in this project, you agree to abide by our standards:
- Be respectful and inclusive.
- Focus on what is best for the community.
- Show empathy towards other contributors.

---

## 🛸 Data Pipeline Notes

If you are modifying the data scripts (`scripts/`):
- Ensure the `user-agent` in `refresh-data.mjs` remains set to `exovault-demo/1.0`.
- The `build-data.mjs` script should keep the final JSON payload as small as possible (aim for < 1MB for the main explorer set).

Thank you for helping us make the universe a little more accessible!

- [johnnylemonny](https://github.com/johnnylemonny)
