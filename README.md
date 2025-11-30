
# Team Shiksha Assignment

This project is an assignment for **Team Shiksha** created by **Parth Arora**. It is built with:  

- **Frontend:** Next.js, React, Tailwind CSS, ShadCN UI, forms, and validation.  
- **Backend:** Node.js, Express, PostgreSQL (NeonDB), Drizzle ORM, JWT authentication.  

The project includes the following functionality:  

- User SignUp  
- User SignIn  
- Dashboard to view and edit user information  

---

## Project Structure

root/
- backend/ # Node.js + Express API
- frontend/ # Next.js frontend
- README.md # Project documentation

---

## Setup Locally

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/PARTHARORA383/team-shiksha-project
cd backend
```
2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the backend folder with the following example variables:
```bash
DATABASE_URL="postgresql://your_username:your_password@your_neon_db_host/your_database?sslmode=require&channel_binding=require"
JWT_SECRET="your_jwt_secret"
```
4. Run the backend server:

```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```
2. Install dependencies:

```bash
npm install
```

3. Create a .env.local file in the frontend folder with the following example variable:
```bash
NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend should now be running at http://localhost:3000.


## Architecture

### Backend

- Express.js API: Handles user authentication and profile management.
- PostgreSQL (NeonDB): Stores user data.
- Drizzle ORM: For database queries.
- JWT: Token-based authentication for user sessions.

### Frontend

- Next.js + React: Renders pages and components.
- Tailwind CSS + ShadCN: Styling and UI components.
- Axios: Handles API requests to the backend.
- React Hook Form + Zod: Form handling and validation.

## Deployment

- Backend is deployed on Render
- Frontend is deployed on Vercel
- Database is NeonDb
