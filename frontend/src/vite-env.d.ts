/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_LOCALHOST_URL: string
  readonly VITE_SITE_LOCALHOST_URL: string
  readonly VITE_API_DEV_URL: string
  readonly VITE_SITE_DEV_URL: string
  readonly VITE_API_PROD_URL: string
  readonly VITE_SITE_PROD_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
