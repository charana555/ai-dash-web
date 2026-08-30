# ai-dash-web — Frontend

React SPA for the ai-dash personal control center.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Custom shadcn-style components |
| Server State | TanStack Query |
| Client State | Zustand |
| Routing | React Router v7 |
| Icons | lucide-react |
| Markdown | react-markdown |

## Quick Start

```bash
npm install
npm run dev    # http://localhost:5173 (proxies /api to localhost:3000)
```

## Development

The dev server proxies `/api` requests to the backend at `http://localhost:3000`.
Start the backend first (see [ai-dash](https://github.com/charana555/ai-dash)).

## Project Structure

```
src/
├── App.tsx                  # Router + providers
├── main.tsx                 # Entry point
├── index.css                # Tailwind + theme tokens
├── components/
│   ├── layout.tsx           # Sidebar layout
│   └── ui/                  # Reusable UI components (button, card, input)
├── pages/
│   ├── login.tsx            # Auth page
│   ├── wiki.tsx             # Wiki list + detail
│   ├── finance.tsx          # Finance dashboard
│   └── file-manager.tsx     # File browser
└── lib/
    ├── api.ts               # API client
    ├── auth-store.ts        # Zustand auth store
    └── utils.ts             # cn() utility
```

## CI

Same strategy as backend: quality checks on push/PR, Docker build on PR to main.

## Related Repo

- **Backend**: [ai-dash](https://github.com/charana555/ai-dash)
