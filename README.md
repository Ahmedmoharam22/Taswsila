# Tawsila (توصيله)

A full-stack MERN application that connects freelance drivers with passengers through real-time trip management, flexible booking, and role-based dashboards.



[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-TanStack-FF4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query/latest)


---

## Overview

Tawsila is a logistics platform built for inter-city travel. Passengers can browse and book scheduled trips or submit custom travel requests; drivers can view open requests and claim them to auto-generate trip listings — creating a dynamic, two-sided transportation marketplace.

---

## Features

### Passenger Experience
- Search and filter scheduled trips by route, date, and availability
- Submit custom travel requests for specific destinations or times
- Real-time booking confirmation once a driver claims a request

### Driver Experience
- Live feed of open custom requests with one-click claiming
- Automatic trip schedule generation upon request acceptance
- Profile management for vehicle details and contact information

### Platform-Wide
- **Role-Based Access Control (RBAC):** JWT-authenticated sessions with strict route and data access separation between `Client` and `Driver` roles
- **Optimized Data Fetching:** TanStack Query (React Query) handles server-state synchronization, eliminating redundant API calls across dashboards
- **API Efficiency:** MongoDB `.populate()` and `.select()` minimize payload size and improve response latency

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Tailwind CSS, Lucide React, Framer Motion |
| State Management | TanStack Query, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Authentication | JWT with secure cookie/header storage |
| Tooling | Vite, Axios, React Hook Form |

---

## Architecture

The backend follows a **Controller → Service → Repository** pattern to enforce clean separation of concerns:

- **Auth Middleware** — Validates JWT tokens and attaches the authenticated user identity to `req.user`
- **Route Protection** — Restricts endpoint access by role (e.g., only drivers may claim custom requests)
- **Data Layer** — Mongoose queries are optimized with field selection and relation population to keep responses lean

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB instance (local or Atlas)

### Clone the Repository

```bash
git clone https://github.com/Ahmedmoharam22/Taswsila.git
cd Taswsila
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
```

### Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install
```

### Run the Application

```bash
# From the root directory
npm run dev
```

---

## Roadmap

- **Real-Time Notifications** — Socket.io integration to push instant alerts when a driver accepts a request
- **Earnings Dashboard** — Financial tracking panel for drivers to monitor trip history and monthly revenue
- **Geolocation** — Google Maps API integration for distance calculation and route visualization

---

## License

This project is open source. See [LICENSE](./LICENSE) for details.
