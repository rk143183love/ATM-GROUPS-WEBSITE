# ATM GROUPS Website

Professional corporate website for ATM GROUPS — Logistics & Manpower Solutions.

## Website
- Public site: `/`
- Private admin CMS: `/admin/`

## Admin CMS
The dashboard lets the authorized admin edit company information, about text, divisions, services, vision/mission, why-us points, clients and compliance items without changing HTML/CSS/JS.

Content is stored in `content.json` and the CMS writes changes back to this GitHub repository through a protected server-side API.

## Deploy on Vercel
1. Import `rk143183love/ATM-GROUPS-WEBSITE` into Vercel.
2. Add these Environment Variables for Production:
   - `ADMIN_USER` — your private admin username
   - `ADMIN_PASSWORD` — a strong private password
   - `SESSION_SECRET` — a long random secret
   - `GITHUB_TOKEN` — fine-grained GitHub token with **Contents: Read and write** only for this repository
   - `GITHUB_OWNER` = `rk143183love`
   - `GITHUB_REPO` = `ATM-GROUPS-WEBSITE`
   - `GITHUB_BRANCH` = `main`
3. Redeploy.
4. Open `/admin/` and sign in.

Never put `GITHUB_TOKEN`, `SESSION_SECRET` or the admin password in frontend files.

## Domain
After deployment, Vercel can be configured with `smartatmgroup.com` and `smartatmgroup.in` when the domains are registered and their DNS records are pointed to Vercel.
