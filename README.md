# IPL Playoff Predictor 2026

> An interactive web application that simulates IPL playoff qualification scenarios using real-time standings from CricAPI, match predictions, and a DFS-based qualification algorithm.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer)

## Features

### Live Standings
- Current IPL 2026 points table fetched from CricAPI
- Auto-updates daily at 12:01 AM IST via GitHub Actions
- Sortable by points or NRR

### Match Tracking
- **Completed Matches** — Shows results with scores and winner
- **Upcoming Matches** — Interactive cards to select winners
- Auto-classifies matches based on schedule (start time + 4 hours)

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
| Data Source | CricAPI (cricket data) |
| Auto-Update | GitHub Actions (daily at 12:01 AM IST) |
| Caching | LocalStorage (24hr TTL) |

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Responsive navigation
│   ├── TeamCard.jsx            # Team preview card
│   ├── MatchCard.jsx           # Interactive match selector
│   ├── CompletedMatchCard.jsx  # Completed match display
│   ├── PointsTable.jsx         # Sortable points table
│   ├── ProbabilityBar.jsx      # Qualification progress bar
│   ├── TeamSelector.jsx        # Team picker (1-4 teams)
│   ├── ScenarioResults.jsx     # Scenario display
│   └── LoadingSkeleton.jsx     # Loading placeholders
├── pages/
│   ├── Home.jsx                # Landing page
│   ├── Predictor.jsx           # Main dashboard
│   └── AllScenarios.jsx        # Full scenario list
├── data/
│   ├── teams.js                # Team metadata
│   └── schedule.json           # All 70 IPL match schedules
├── utils/
│   ├── iplData.js              # Data layer (auto-generated)
│   ├── algo.js                 # DFS qualification algorithm
│   └── calculations.js         # Predicted table & insights
├── App.jsx                     # Router configuration
├── main.jsx                    # Entry point
└── index.css                   # Global styles
scripts/
└── update-data.mjs             # Auto-update script
.github/
└── workflows/
    └── update-ipl-data.yml     # GitHub Actions workflow
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
git clone https://github.com/Sourabh12345singh/ipl_qualifiers.git
cd ipl_qualifiers
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Automated Data Updates

A GitHub Actions workflow runs **daily at 12:01 AM IST** to fetch fresh IPL data from CricAPI.

### Setup

1. Go to **Settings → Secrets and variables → Actions → New repository secret**
2. Add your CricAPI key:
   ```
   Name:  CRICAPI_KEY
   Value: your-cricapi-key
   ```
3. The workflow auto-updates `src/utils/iplData.js` and triggers a redeploy

### Manual Trigger

Go to **Actions → Update IPL Data → Run workflow**

### How It Works

```
GitHub Actions (daily 12:01 AM IST)
    │
    ├── Fetches points table from CricAPI
    ├── Fetches completed matches from CricAPI
    ├── Loads schedule.json (all 70 matches)
    ├── Classifies: start time + 4hrs < now → completed
    ├── Generates iplData.js with 3 sections:
    │   - pointsTable (live standings)
    │   - completedMatches (finished games)
    │   - remainingMatches (upcoming games)
    └── Commits & pushes to main
```

### Manual Override

If API data is incorrect, you can manually edit `src/utils/iplData.js` and push. Your changes will persist until the next scheduled auto-update at 12:01 AM IST.

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

## Data Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   LocalStorage  │────▶│  Data Formatter  │────▶│  Points Table   │
│   (24hr cache)  │     │  (teams/matches) │     │  (sorted)       │
└─────────────────┘     └──────────────────┘     └────────────────┘
                                                          │
┌─────────────────     ┌──────────────────┐     ┌────────▼────────┐
│   DFS Algorithm │────│  Match Selection │◀────│  User Picks     │
│   (2^N sims)    │     │  (winner picks)  │     │  Winners        │
└────────┬────────┘     └──────────────────┘     └─────────────────┘
         │
         ▼
─────────────────┐     ┌──────────────────┐
│   Scenarios     │────▶│  Scenario Page   │
│   (1-3 inline)  │     │  (all scenarios) │
└─────────────────┘     └──────────────────┘
```

## License

MIT License

## Author

**Sourabh Singh** — [GitHub](https://github.com/Sourabh12345singh)
