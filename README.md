# CareerConnect — Job Portal

Responsive HTML/CSS/JavaScript frontend with an Express + MongoDB backend.

## Included
- Animated dark/gold login design with polished Manrope + DM Sans typography
- Candidate signup and login; bcrypt password hashing and JWT sessions
- Protected current-user endpoint
- Forgot/reset password flow (requires Resend email setup)
- MongoDB jobs API and recruiter-only job publishing endpoint
- Helmet, CORS allowlist, authentication rate limit and input checks

## Run backend locally
1. Install Node.js 20+ and create a MongoDB Atlas database.
2. Open terminal in `backend`; run `npm install`.
3. Copy `.env.example` to `.env`, then set `MONGODB_URI` and a long random `JWT_SECRET`.
4. Run `npm run dev`; test `http://localhost:5000/api/health`.

## Deploy backend to Render
1. Create a MongoDB Atlas cluster and database user; allow Render network access in Atlas.
2. In Render choose **New → Web Service**, connect this repository.
3. Set **Root Directory** to `backend`, **Build Command** to `npm install`, **Start Command** to `npm start`.
4. Add environment variables: `MONGODB_URI`, `JWT_SECRET` (long random secret), and `FRONTEND_URL=https://akshu1254.github.io`.
5. Optional password reset email: add `RESEND_API_KEY` and verified `MAIL_FROM`.
6. After deploy, open `https://YOUR-SERVICE.onrender.com/api/health`; expect JSON with status ok.
7. Replace the placeholder URL in root `config.js` with your exact Render URL and commit.

The included `render.yaml` can also be used as a Blueprint.

## API
- `POST /api/auth/register` — create candidate account
- `POST /api/auth/login` — login and receive JWT
- `GET /api/auth/me` — current user (Bearer token)
- `POST /api/auth/forgot-password` and `POST /api/auth/reset-password`
- `GET /api/jobs` — list jobs
- `POST /api/jobs` — recruiter-only job publishing (Bearer token)

## Security and limitations
- Public signup always creates a candidate. Recruiter accounts must be promoted securely by an administrator in MongoDB; do not expose a public role selector.
- GitHub Pages only hosts the static frontend; the API runs separately on Render.
- Backend source is committed, but it is not live until you add MongoDB and deploy the Render service. Never commit `.env`, database credentials, JWT secrets or email keys.
