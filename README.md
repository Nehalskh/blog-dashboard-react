Blog Dashboard (CA Monk Frontend Interview)

A blog dashboard application built using Vite + React + TypeScript as part of the CA Monk Frontend Interview Assignment.

FEATURES
- Fetch and display all blogs (GET /blogs)
- View a single blog by ID (GET /blogs/:id)
- Create a new blog (POST /blogs)
- Automatic refresh after blog creation using TanStack Query
- Loading and error states
- Responsive two-panel layout (Blog List + Blog Detail)

TECH STACK
- React + TypeScript (Vite)
- TanStack Query
- Tailwind CSS
- shadcn/ui
- JSON Server

GETTING STARTED

1) Install dependencies
npm install

2) Start backend and frontend
npm run server
npm run dev

Backend runs at: http://localhost:3001
Frontend runs at: http://localhost:5173

API ENDPOINTS
- GET /blogs       -> Get all blogs
- GET /blogs/:id   -> Get blog by ID
- POST /blogs      -> Create a new blog

NOTES
- Blog data is stored in db.json using JSON Server.
- Categories are entered as comma-separated values.
- UI follows the provided reference design (not pixel-perfect as allowed).

AUTHOR
Nehal Shaikh
CA Monk Frontend Interview Assignment
