# IPL Playoff Predictor 2026

> An interactive web application that simulates IPL playoff qualification scenarios using real-time standings, match predictions, and a DFS-based qualification algorithm.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer)

## Features

### Live Standings
- Current IPL 2026 points table with team positions, points, and net run rate
- Auto-refreshes every 12 hours with local caching
- Sortable by points or NRR

### Match Prediction
- Interactive match cards for all remaining league fixtures
- Select winners with visual feedback
- Real-time predicted standings update as you pick winners

### Qualification Analysis
- Pick 1 to 4 teams you want to see qualify together
- DFS algorithm simulates all 2^N possible match outcomes
- Returns concrete scenarios showing exactly what needs to happen
- View all qualifying scenarios on a dedicated page

### Predicted Standings
- Animated progress bars showing projected points
- Green highlight for playoff zone (top 4)
- Points change indicators (+2, +4) when selections are made

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Styling | TailwindCSS 3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Routing | React Router DOM |
| Data | LocalStorage cache (12hr TTL) |

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Responsive navigation with mobile menu
│   ├── TeamCard.jsx         # Team preview card with rank badge
│   ├── MatchCard.jsx        # Interactive match winner selector
│   ├── PointsTable.jsx      # Sortable points table with zones
│   ├── ProbabilityBar.jsx   # Animated qualification progress bar
│   ├── TeamSelector.jsx     # Team picker (1-4 teams)
│   ├── ScenarioResults.jsx  # Scenario display with "view all" CTA
│   └── LoadingSkeleton.jsx  # Shimmer loading placeholders
├── pages/
│   ├── Home.jsx             # Landing page with hero + top 4
│   ├── Predictor.jsx        # Main dashboard with all features
│   └── AllScenarios.jsx     # Full scenario list page
├── data/
│   └── teams.js             # Team metadata (colors, logos)
├── utils/
│   ├── iplData.js           # Data fetching with 12hr cache
│   ├── algo.js              # DFS qualification algorithm
│   └── calculations.js      # Predicted table & insights
├── App.jsx                  # Router configuration
├── main.jsx                 # Entry point
└── index.css                # Global styles + Tailwind
```

## Algorithm

The qualification checker uses **Depth-First Search with backtracking**:

1. Clone the current points table (never mutates original data)
2. Recursively simulate every possible winner combination for remaining matches
3. For each complete simulation:
   - Update points, wins, losses
   - Sort by points (DESC), then NRR (DESC)
   - Check if all selected teams rank in top 4
4. Collect all valid scenarios
5. Return up to 3 scenarios inline, with option to view all

**Time Complexity:** O(2^M × N log N) where M = remaining matches, N = teams

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/Sourabh12345singh/ipl_qualifiers.git
cd ipl_qualifiers

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory, ready for deployment.

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### GitHub Pages

Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/ipl_qualifiers/',
  plugins: [react()],
})
```

Then deploy:
```bash
npm run build
npx gh-pages -d dist
```

## How It Works

### Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   LocalStorage  │────▶│  Data Formatter  │────▶│  Points Table   │
│   (12hr cache)  │     │  (teams/matches) │     │  (sorted)       │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
┌─────────────────┐     ┌──────────────────┐     ┌────────▼────────┐
│   DFS Algorithm │◀────│  Match Selection │◀────│  User Picks     │
│   (2^N sims)    │     │  (winner picks)  │     │  Winners        │
└────────┬────────┘     └──────────────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│   Scenarios     │────▶│  Scenario Page   │
│   (1-3 inline)  │     │  (all scenarios) │
└─────────────────┘     └──────────────────┘
```

### Caching Strategy

- Data is stored in `localStorage` with a 12-hour TTL
- On page load: checks cache → if valid, uses it → if expired, fetches fresh
- No external API calls required — works offline with cached data

## Screenshots

| Home | Predictor | Scenarios |
|------|-----------|-----------|
| Hero section with top 4 preview | Points table + match predictions | All qualifying scenarios |

## License

MIT License — see [LICENSE](LICENSE) for details.

## Author

**Sourabh Singh** — [GitHub](https://github.com/Sourabh12345singh)
