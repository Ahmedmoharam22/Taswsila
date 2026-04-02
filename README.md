Tawsila (توصيله) | Full-Stack Transportation Platform
A sophisticated MERN-stack application designed to bridge the gap between freelance drivers and passengers through real-time trip management, custom booking requests, and a dynamic dashboard system.

Project Overview
Tawsila is a logistics-focused platform that optimizes inter-city travel. It enables passengers to find existing trips or post "Custom Requests" that drivers can claim, creating a flexible marketplace for transportation.

Key Technical Features
1. Dynamic Marketplace Logic
Passenger Side: Search-and-filter system for scheduled trips and a "Custom Request" engine for specific travel needs.

Driver Side: Real-time access to available custom requests with a one-click "Claim" system that automatically generates trip schedules.

2. Specialized Dashboards
State Management: Leveraging React Query for server-state synchronization, ensuring data consistency across client and driver views without redundant API calls.

Role-Based Access Control (RBAC): Secure navigation and data filtering based on JWT-authenticated user roles (Client vs. Driver).

3. Profile & Asset Management
Centralized profile management with field-level validation for vehicle details (for drivers) and personal contact information.

Technical Stack
Category	Technology
Frontend	React.js, Tailwind CSS, Lucide React, Framer Motion
State Management	TanStack Query (React Query), Context API
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
Authentication	JWT (JSON Web Tokens) with Secure Cookie/Header storage
Tooling	Vite, Axios, React Hook Form
System Architecture & Flow
The system follows a Controller-Service-Repository pattern (simplified) to ensure clean separation of concerns:

Auth Middleware: Validates sessions and attaches user identity to the request object (req.user).

Route Protection: Ensures only authorized roles can access specific endpoints (e.g., only drivers can accept custom requests).

API Optimization: Use of MongoDB .populate() and .select() to minimize payload size and improve response times.

Installation & Setup
Clone the repository

Bash
git clone https://github.com/Ahmedmoharam22/Taswsila.git
Environment Configuration
Create a .env file in the root directory:

Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key
Install Dependencies

Bash
# Backend & Frontend
npm install
cd client && npm install
Run the Application

Bash
# From root
npm run dev
Future Roadmap
Real-time Communication: Integrating Socket.io for instant notifications when a driver accepts a request.

Advanced Analytics: A financial tracking dashboard for drivers to monitor monthly earnings.

Geolocation: Integration with Google Maps API for precise distance calculation and routing.