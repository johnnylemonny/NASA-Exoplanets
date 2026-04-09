# NASA Exoplanets

NASA Exoplanets is a static Astro + React demo that turns NASA's Planetary Systems archive into a faster, more welcoming browsing experience. It combines a cinematic NASA-inspired interface with a practical explorer for filtering, sorting, and comparing confirmed exoplanets. Inspired by the advanced project idea from [App Ideas](https://github.com/florinpop17/app-ideas)

## Highlights

- Single-page experience with featured worlds, preset filters, and a full explorer
- Build-time NASA data pipeline that keeps runtime fast on GitHub Pages
- React islands for the explorer, compare mode, featured slider
- GitHub Actions for CI, GitHub Pages deploys, and dataset refresh automation
- Open-source friendly structure with generated archive metadata committed to the repo

## Stack

- Astro
- React islands
- TypeScript
- Tailwind CSS utilities plus custom CSS tokens
- Lucide icons
- NASA Exoplanet Archive CSV data via the `PS` table

## Local development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Generate the app dataset

```bash
pnpm run data:build
```

### 3. Start the dev server

```bash
pnpm run dev
```

### 4. Run project checks

```bash
pnpm run lint
pnpm run typecheck
pnpm run build
```

## Data pipeline

The app reads the raw archive snapshot from:

```text
data/raw/nasa-exoplanets-ps.csv
```

`pnpm run data:build` performs the following steps:

1. Parses NASA's Planetary Systems CSV snapshot.
2. Keeps only the archive's default rows for the live app experience.
3. Normalizes the remaining planets into a compact JSON payload.
4. Generates featured-world picks and filter options for the UI.
5. Writes a compact summary payload to `src/generated/exoplanets-summary.json` and the full explorer dataset to `public/data/exoplanets-data.json`.

## Scripts

- `pnpm run dev` - start Astro in development mode
- `pnpm run build` - rebuild generated data and produce the static site
- `pnpm run preview` - preview the built output locally
- `pnpm run lint` - run ESLint
- `pnpm run typecheck` - run `astro check`
- `pnpm run data:build` - rebuild the generated app dataset from the local CSV snapshot
- `pnpm run data:refresh` - fetch the latest NASA archive CSV snapshot into `data/raw/`

## GitHub Pages deployment

The project is configured for repository-based GitHub Pages deployment at:

```text
https://johnnylemonny.github.io/NASA-Exoplanets/
```

To publish from GitHub:

1. Push the project to the `NASA-Exoplanets` repository.
2. In repository settings, open **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Let the `Deploy to GitHub Pages` workflow publish the current branch.

## Automated workflows

- `CI` runs lint, typecheck, and build on pushes and pull requests.
- `Deploy to GitHub Pages` publishes the site from the current branch.
- `Refresh NASA dataset` can run manually or on a schedule, update the CSV snapshot, regenerate the app dataset, and push changes back to the branch when the archive changes.

## Project structure

```text
.
|-- .github/workflows/
|-- data/raw/
|-- public/
|-- scripts/
|-- src/components/
|-- src/generated/
|-- src/layouts/
|-- src/lib/
|-- src/pages/
`-- src/styles/
```

## Data source

- NASA Exoplanet Archive TAP service: `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+*+from+ps&format=csv`
- Planet overview pages: `https://exoplanetarchive.ipac.caltech.edu/overview/<planet-name>`

NASA and the NASA Exoplanet Archive are the source of the scientific data used by this project. This repository is an independent demo and is not an official NASA product.

## License

Released under the MIT License. See [LICENSE](./LICENSE).


   $$$$$\  $$$$$$\  $$\   $$\ $$\   $$\ $$\   $$\ $$\     $$\ $$\       $$$$$$$$\ $$\      $$\  $$$$$$\  $$\   $$\ $$\   $$\ $$\     $$\ 
   \__$$ |$$  __$$\ $$ |  $$ |$$$\  $$ |$$$\  $$ |\$$\   $$  |$$ |      $$  _____|$$$\    $$$ |$$  __$$\ $$$\  $$ |$$$\  $$ |\$$\   $$  |
      $$ |$$ /  $$ |$$ |  $$ |$$$$\ $$ |$$$$\ $$ | \$$\ $$  / $$ |      $$ |      $$$$\  $$$$ |$$ /  $$ |$$$$\ $$ |$$$$\ $$ | \$$\ $$  / 
      $$ |$$ |  $$ |$$$$$$$$ |$$ $$\$$ |$$ $$\$$ |  \$$$$  /  $$ |      $$$$$\    $$\$$\$$ $$ |$$ |  $$ |$$ $$\$$ |$$ $$\$$ |  \$$$$  /  
$$\   $$ |$$ |  $$ |$$  __$$ |$$ \$$$$ |$$ \$$$$ |   \$$  /   $$ |      $$  __|   $$ \$$$  $$ |$$ |  $$ |$$ \$$$$ |$$ \$$$$ |   \$$  /   
$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ |\$$$ |$$ |\$$$ |    $$ |    $$ |      $$ |      $$ |\$  /$$ |$$ |  $$ |$$ |\$$$ |$$ |\$$$ |    $$ |    
\$$$$$$  | $$$$$$  |$$ |  $$ |$$ | \$$ |$$ | \$$ |    $$ |    $$$$$$$$\ $$$$$$$$\ $$ | \_/ $$ | $$$$$$  |$$ | \$$ |$$ | \$$ |    $$ |    
 \______/  \______/ \__|  \__|\__|  \__|\__|  \__|    \__|    \________|\________|\__|     \__| \______/ \__|  \__|\__|  \__|    \__|

