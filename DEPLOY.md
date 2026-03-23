# Fixing Vercel `404: NOT_FOUND` (e.g. `lhr1::…`)

That plain error page comes from **Vercel’s edge**, not from Next.js. It usually means **no deployment matched this hostname** (or there is no successful production deployment).

## 1. Confirm the deployment exists

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your project (`nastiacatta.github.io` or similar).
2. **Deployments** → latest should be **Ready** (green), not Error or Canceled.
3. Open the **`.vercel.app`** URL shown there (e.g. `https://<project>-<hash>.vercel.app`).

- If **`.vercel.app` works** but **`nastiacatta.github.io` does NOT** → it’s a **custom domain / DNS** issue (step 2).
- If **`.vercel.app` also shows NOT_FOUND** → fix the **build** or **project link** (step 3).

## 2. Custom domain `nastiacatta.github.io`

1. Project → **Settings** → **Domains**.
2. Add **`nastiacatta.github.io`** (and optionally `www` if you use it).
3. Follow Vercel’s **DNS instructions** until the domain shows **Valid**.

For a **`username.github.io` repo** used with Vercel:

- In **GitHub**: **Settings → Pages** — either disable Pages for this repo or align the custom domain with what Vercel expects (avoid two hosts fighting over the same URL).
- DNS for `nastiacatta.github.io` must end up pointing at **Vercel** as shown in the Domains UI (not stale GitHub Pages A records, unless you intentionally keep Pages).

## 3. Project settings

- **Root Directory**: should be the repo root (where `package.json` and `next.config.js` live), not a subfolder.
- **Node.js**: **20.x** (this repo uses `.nvmrc`, `.node-version`, and `engines.node`).

## 4. Repo connected to Vercel

- **Settings → Git** — confirm the correct GitHub repo and branch (`main`).
- Push a small commit or **Redeploy** from the latest successful commit.

## 5. Old link: `/data2product-dashboard`

That Next.js page was removed. **Redirects** in `next.config.js` send `/data2product-dashboard` to the live Shiny app on shinyapps.io.
