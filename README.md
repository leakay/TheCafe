Snash Dah Fx — Minimal scaffold
Frontend: React (src/components/...)
Backend: Express (backend/index.js) using db.json as file DB

How to run backend:
  cd backend
  npm init -y
  npm install express cors body-parser
  node index.js

How to run frontend:
  npm install
  npm start

This scaffold includes:
- src/
  - components/{Header,Dashboard,Products,Customers,Sales,Stock,Inventory,Reports}
  each with .js and .css
- src/Db.js (axios API wrapper)
- backend/index.js (simple Express server that reads/writes db.json)
- db.json (initial data)