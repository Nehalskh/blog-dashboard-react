# blog-dashboard-react
Blog dashboard built with React, TypeScript, TanStack Query, Tailwind CSS and shadcn/ui.
# Blog Dashboard (CA Monk Frontend Interview)

A simple blog dashboard built with **Vite + React + TypeScript**, using:
- **TanStack Query** for data fetching/caching
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **JSON Server** as the backend API

## Features
- List all blogs (`GET /blogs`)
- View blog by id (`GET /blogs/:id`)
- Create a new blog (`POST /blogs`) + auto refresh list (query invalidation)
- Loading + error states
- Responsive two-panel layout (list + detail)

## Tech Stack
- React + TypeScript (Vite)
- TanStack Query
- Tailwind CSS
- shadcn/ui
- JSON Server

## Getting Started

### 1) Install dependencies
```bash
npm install
