# Dern‑Support Frontend

A responsive, animated React application for the Dern‑Support IT technical support platform.  
Built with React 18, React Router v6.4 data APIs, Tailwind CSS, Ant Design, Framer Motion, and Recharts.

---

## 📋 Table of Contents

- [Dern‑Support Frontend](#dernsupport-frontend)
  - [📋 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [🧰 Tech Stack](#-tech-stack)
  - [🔧 Prerequisites](#-prerequisites)
  - [🏁 Getting Started](#-getting-started)
---

## 🚀 Features

- **Multi‑step Repair Requests**: Guided flow (device → topic → details)  
- **Authentication**: Login/Register with protected routes via React Router  
- **User & Admin Dashboards**: Charts, tables, and filters powered by Recharts  
- **Dynamic Data Loading**: Loaders & actions (react-router-dom v6.4+)  
- **Responsive UI**: Tailwind CSS + Ant Design components  
- **Animations**: Smooth transitions using Framer Motion  
- **Dark/Light Themes**: Context‑driven theming via `useTheme()` custom hook 

---

## 🧰 Tech Stack

- **Framework:** React 18  
- **Routing:** React Router DOM v6.4+ (loaders, actions, protected routes)  
- **Styling:** Tailwind CSS, Ant Design  
- **Animations:** Framer Motion  
- **Charts:** Recharts  
- **Date Utility:** date-fns  
- **HTTP & State:** Fetch API, React Context API  

---

## 🔧 Prerequisites

- **Node.js** ≥ 18 & **npm** ≥ 8 (or Yarn ≥ 1.22)  
- **Git** for version control  
- A running instance of the **Dern‑Support API** (configured in `.env.local`)  

---

## 🏁 Getting Started

1. **Clone the repo**  
   ```bash
   1. git clone https://github.com/your-org/dern-support-frontend.git
   2. cd frontend-react
   3. npm run dev
