# CareerConnect — Job Portal

Responsive job portal frontend (HTML/CSS/JavaScript) with an Express + MongoDB backend.

## Features
- Animated, responsive dark-and-gold login design
- User registration and login with bcrypt password hashing and JWT sessions
- Protected profile endpoint
- Forgot/reset password flow (requires Resend email configuration)
- MongoDB-backed jobs API and recruiter-only job publishing endpoint
- Job search/filter UI and responsive homepage
- Security middleware, request validation, rate limiting and CORS

## Run the backend locally
1. Install Node.js 20 or later and MongoDB (local or Atlas).
2. Open a terminal in the `backend` folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env` and fill in `MONGODB_URI` and a long random `JWT_SECRET`.
5. Run `npm run dev`. The API starts on `http://localhost:5000`.
6. Open `/api/health` to verify the service.

## Connect the frontend
Edit `config.js` and replace the placeholder with the deployed API URL. For local testing use `http://localhost:5000`. Never put MongoDB credentials, JWT secrets or email API keys in frontend files.

## Deploy backend on Render
1. Create a MongoDB Atlas database and copy its connection string.
2. In Render, create a new **Web Service** from this GitHub repository.
3. Set **Root Directory** to `backend`, **Build Command** to `npm install`, **Start Command** to `npm start`.
4. Add environment variables: `MONGODB_URI`, `JWT_SECRET` (generate a strong random value), `FRONTEND_URL=https://akshu1254.github.io`.
5. Optional password-reset email: set `RESEND_API_KEY` and a verified `MAIL_FROM` sender.
6. After deploy, test `https://YOUR-SERVICE.onrender.com/api/health`.
7. Put that exact service URL in `config.js` and commit the change.

You can also use the included `render.yaml` as a deployment blueprint.

## API routes
- `POST /api/auth/register` — create candidate account
- `POST /api/auth/login` — login and receive JWT
- `GET /api/auth/me` — current user (Bearer token)
- `POST /api/auth/forgot-password` — email reset link (Resend required)
- `POST /api/auth/reset-password` — set new password with reset token
- `GET /api/jobs` — list published jobs
- `POST /api/jobs` — publish job (recruiter JWT required)

## Important setup notes
- New public registrations are candidate accounts. Recruiter job publishing requires a recruiter account created securely by an administrator; do not expose a public role-escalation field.
- GitHub Pages hosts the static frontend only. The API must run separately on Render or another Node hosting provider.
- No live backend can be connected until you create the MongoDB database and deploy the Render service. Keep all secrets in Render environment variables, never commit them.
