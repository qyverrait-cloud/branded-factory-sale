# CRITICAL: Remove or set NODE_ENV to production on Hostinger

The build is failing because `NODE_ENV=development` is set in your Hostinger environment variables.

## Fix in Hostinger Dashboard:

1. Go to: **Deployments → Settings and redeploy**
2. Find **Environment Variables** section
3. Either:
   - **DELETE** the `NODE_ENV` variable completely (recommended)
   - OR change `NODE_ENV` value from `development` to `production`
4. Click **Save and redeploy**

## Current Issue:
```
⚠ You are using a non-standard "NODE_ENV" value in your environment.
```

This causes Next.js to run in development mode during build, which triggers strict mode and SSR validation that's incompatible with the current setup.

## After fixing NODE_ENV, the build should succeed! ✅
