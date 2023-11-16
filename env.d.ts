declare module "bun" {
  interface Env {
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    PORT: number
  }
}
