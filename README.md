# IPL Playoff Predictor (2026)

Interactive React app to explore IPL playoff qualification paths using live standings, scheduled fixtures, and scenario simulation.

This is a learning project built to practice frontend architecture, data handling, and scenario simulation.  
It should not be treated as an official or production-grade source for IPL decisions or betting use cases.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer)

## Overview

This project helps users:
- Visualize the current IPL points table.
- Predict winners for remaining matches.
- See projected standings update in real time.
- Check whether selected teams can qualify together.
- Explore exact qualification scenarios when feasible.

## Core Features

- Live-style data pipeline backed by CricAPI snapshots.
- Completed vs upcoming match classification.
- Team selection (up to 4 teams) for qualification analysis.
- Hybrid scenario engine:
- Heuristic path for large search space (`>15` remaining matches).
- Exact DFS simulation when search space is manageable (`<=15` matches).
- Predicted standings with ranking, playoff zone, and quick insights.
- Local caching with 24-hour TTL (`localStorage`).

## Tech Stack

- React 19
- Vite 5
- Tailwind CSS 3
- Framer Motion
- React Router
- Lucide React
- ESLint

## Project Structure

```text
ipl-predictor/
├─ public/
│  ├─ favicon.svg
│  └─ icons.svg
├─ scripts/
│  └─ update-data.mjs
├─ src/
│  ├─ components/
│  │  ├─ CompletedMatchCard.jsx
│  │  ├─ MatchCard.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ PointsTable.jsx
│  │  ├─ ScenarioResults.jsx
│  │  ├─ TeamCard.jsx
│  │  └─ TeamSelector.jsx
│  ├─ data/
│  │  ├─ api-dump.latest.json
│  │  ├─ schedule.json
│  │  └─ teams.js
│  ├─ pages/
│  │  ├─ AllScenarios.jsx
│  │  ├─ Home.jsx
│  │  └─ Predictor.jsx
│  ├─ utils/
│  │  ├─ algo.js
│  │  ├─ calculations.js
│  │  └─ iplData.js
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ eslint.config.js
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

## Qualification Logic

- Input: current table + remaining fixtures + selected teams.
- If remaining matches are high (`>15`):
- Run a fast mathematical feasibility check based on potential wins.
- If remaining matches are lower (`<=15`):
- Run DFS across all outcomes (`2^N`) and validate top-4 condition.
- Output:
- `possible: true/false`
- scenario text
- simulated final top-4 for valid paths

Main implementation: `src/utils/algo.js`.

## Data Flow

- `scripts/update-data.mjs` pulls points + series data from CricAPI.
- Schedule data (`src/data/schedule.json`) is merged with API output.
- Matches are split into `completedMatches` and `remainingMatches`.
- A generated data payload is written into `src/utils/iplData.js`.
- Runtime cache in browser (`localStorage`) serves the app quickly.

Supporting docs and diagrams are available in the repository root:
- `flow_diagrams.md`
- `application_architecture_layout.png`
- `data_flow_and_caching.png`
- `predictor_algorithm_flowchart.png`

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
git clone https://github.com/Sourabh12345singh/ipl_qualifiers.git
cd ipl_qualifiers/ipl-predictor
npm install
```

### Run Dev Server

```bash
npm run dev
```

App runs by default at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

## Data Update Script

Use this when you want to refresh local project data from CricAPI.

1. Create `.env` in `ipl-predictor/`
2. Add:

```bash
CRICAPI_KEY=your_api_key_here
```

3. Run:

```bash
node scripts/update-data.mjs
```

This updates:
- `src/utils/iplData.js`
- `src/data/api-dump.latest.json`

## NPM Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run lint checks

## Contributing

Contributions are welcome. For quality PRs:

1. Fork the repository.
2. Create a focused branch (`feat/...`, `fix/...`, `docs/...`).
3. Keep commits small and descriptive.
4. Run `npm run lint` and verify app behavior locally.
5. Open a PR with:
- problem summary
- approach
- screenshots/GIFs for UI changes
- test/validation notes

## Known Notes

- Scenario exploration grows exponentially; DFS is intentionally gated to smaller search spaces.
- Qualification scenarios are deterministic based on current cached data and selected winners.
- API response structures may change; `scripts/update-data.mjs` includes normalization + retry logic.

## License

MIT

## Author

Sourabh Singh  
GitHub: https://github.com/Sourabh12345singh


