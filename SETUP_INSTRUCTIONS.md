# Disney World Dream Planner — Deployment Package

This folder is a complete, ready-to-deploy React project. It's already configured
to build and run on Vercel with zero extra setup.

## What changed from the artifact version

The only functional change from the in-chat version is how trip data is saved:
this version uses the browser's `localStorage` instead of the artifact
environment's special storage. That means trip plans, the photo album links,
character tracker, etc. all save directly on each visitor's own device/browser,
exactly like before — there's just no Anthropic-specific storage API running
behind it anymore.

## How to upload this to GitHub

1. Unzip this folder somewhere on your computer.
2. Go to github.com and create a new repository (see your setup guide for this part).
3. On the repo page, click **uploading an existing file**.
4. This time, **drag the entire unzipped folder's contents** into the upload
   box — not just one file. You should be dragging in: `index.html`,
   `package.json`, `vite.config.js`, `vercel.json`, `.gitignore`, the `src`
   folder, and the `public` folder, all at once.
5. Scroll down and click **Commit changes**.

## How to deploy to Vercel

1. Go to vercel.com and sign up free (you can sign up directly with your
   GitHub account — this is the easiest option).
2. Click **Add New...** → **Project**.
3. Find your `disney-dream-planner` repository in the list and click **Import**.
4. Vercel will auto-detect this as a Vite project (thanks to `vercel.json`).
   You shouldn't need to change any settings.
5. Click **Deploy**.
6. Wait about 60-90 seconds. You'll get a live URL like
   `disney-dream-planner-yourname.vercel.app` — that's your real, live app!

## Connecting a custom domain (optional)

If you bought a domain (e.g. from Namecheap), in your Vercel project go to
**Settings → Domains**, add your domain, and follow the DNS instructions shown.
This usually takes a few minutes to a few hours to fully activate.

## Testing locally before you deploy (optional, for the technically curious)

If you have Node.js installed on your computer, you can preview the site
before deploying:

```
npm install
npm run dev
```

Then open the local URL it shows you (usually `http://localhost:5173`).

## A note on data persistence

Because this uses `localStorage`, each visitor's trip data is saved only on
their own device and browser. If you clear your browser data, or switch
devices, your saved trip won't carry over. This is normal for a project at
this stage — if you eventually want trip data to sync across devices, that
would require adding a real backend/database, which is a bigger undertaking
than this deployment.

## Updating the app later

Whenever you want to make changes:
1. Edit `src/App.jsx` 
2. Upload the updated file to GitHub (drag and drop into the repo, same as before)
3. Vercel automatically redeploys within about a minute — no extra steps needed
