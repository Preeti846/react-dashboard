# Aforro — React Sales Dashboard

A React + Vite dashboard built for the Aforro front-end assignment. It implements a
sales-dashboard UI (matching the reference Figma structure) and a fully interactive
customers table backed by a public API.

**Tech stack:** React 18 (functional components + hooks), Vite, Tailwind CSS, Axios, Recharts.

---

## Project setup

Requirements: Node.js 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Features implemented

### Routing
- Client-side routing via `react-router-dom`. Every sidebar item (Dashboard, Analytics,
  Revenue, Customers, Products, Settings, Help Center) is a real route with its own page
  under `src/pages/`, rendered inside a shared `Layout` (Sidebar + Header + `<Outlet />`).
- The sidebar highlights the active route with `NavLink`; the header title/subtitle update
  per route; navigating on mobile auto-closes the slide-in sidebar.

### Part 1 — Dashboard UI
- Responsive layout with a collapsible sidebar (slides in on mobile), sticky top header
  with search + profile, and a scrollable main area.
- Four KPI stat cards (revenue, orders, customers, conversion) with trend indicators and
  an inline sparkline per metric.
- **Sales overview**: revenue (area) and orders (bar) are plotted as two small-multiples
  sharing one x-axis instead of one chart with two mismatched scales — revenue is in
  dollars, orders is a count, so they never share a y-axis.
- **Traffic sources** donut chart with a legend and a hover tooltip.
- Consistent design system via Tailwind: `brand` (indigo) accent, `ink` text scale,
  soft card shadows, rounded corners, and Inter as the typeface. Chart colors follow a
  fixed, colorblind-safe categorical order rather than ad hoc hex picks.
- Fully responsive from mobile (320px) to desktop; visible keyboard focus and
  reduced-motion support; verified with Playwright screenshots at 320/375/390/768/1440px.

### Part 2 — API integration & data table
- Fetches users from `https://jsonplaceholder.typicode.com/users` using **Axios**.
- Table columns: **Name, Email, Company Name, City**.
- **Search** by name or email (case-insensitive, live).
- **Sort** by name (A–Z / Z–A) via the toolbar button or the "Name" column header.
- **Filter** by city using a dropdown auto-populated from the fetched data.
- **Loading state**: animated skeleton rows while fetching.
- **Error state**: friendly message with a "Try again" button that re-fetches.
- **Empty state**: shown when filters/search match no records, with a "Clear filters" reset.
- Responsive: a real `<table>` on desktop, stacked cards on mobile.

---

## Project structure

```
src/
├── components/
│   ├── Icons.jsx         # Inline SVG icon set (no icon dependency)
│   ├── Layout.jsx        # Sidebar + Header + <Outlet /> shell for every route
│   ├── Sidebar.jsx       # Left navigation (NavLink-based) + upgrade card
│   ├── Header.jsx        # Top bar: route-aware title, search, notifications, profile
│   ├── Card.jsx          # Shared white card wrapper (title/subtitle/action)
│   ├── StatCard.jsx      # KPI metric card with inline sparkline
│   ├── SalesChart.jsx    # Revenue (area) + orders (bar) small multiples
│   ├── TrafficChart.jsx  # Traffic sources donut chart with tooltip
│   └── UsersTable.jsx    # API data table: fetch + search + sort + filter
├── pages/
│   ├── Dashboard.jsx     # KPIs + sales overview + traffic + customers table
│   ├── Analytics.jsx     # Sessions, bounce rate, sessions chart, top pages
│   ├── Revenue.jsx       # MRR/ARPU/refunds, revenue trend, revenue by source
│   ├── Customers.jsx     # Customer KPIs + the live customers table
│   ├── Products.jsx      # Product catalog with stock status
│   ├── Settings.jsx      # Profile form, notification toggles, security
│   └── HelpCenter.jsx    # FAQ accordion, contact support, resources
├── App.jsx               # BrowserRouter + route table
├── main.jsx              # React entry point
└── index.css             # Tailwind directives + base styles
```

---

## Assumptions & decisions

- **Figma fidelity:** The assignment states pixel-perfect accuracy is not required, so the
  focus is on matching layout, sections, visual hierarchy, and spacing rather than exact
  pixels. The palette, sample metrics, and chart data are representative placeholders in the
  spirit of the reference design.
- **Chart & KPI data** are static/mock values because the assignment only requires live data
  for the users table. Only the customers table is wired to the public API.
- **Icons** are hand-written inline SVGs instead of an icon library to keep the bundle small
  and the project self-contained.
- **Avatars** use `pravatar.cc` (deterministic per user id) purely for visual polish, since
  the API does not provide profile images.
- **State management** uses React's built-in hooks (`useState`, `useEffect`, `useMemo`);
  no external state library was needed for this scope.
- **Sorting** is limited to the Name column as specified; the search → filter → sort order is
  applied consistently so all three features compose correctly.
- **No backend** was added, per the assignment. Everything runs client-side.
```
