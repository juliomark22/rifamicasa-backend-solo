module.exports = {
  apps: [
    {
      name: "rifas-backend",
      script: "dist/main.js",
      cwd: "/home/rifas/apps/backend",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        DB_HOST: "127.0.0.1",
        DB_PORT: "5432",
        DB_USER: "rifas_user",
        DB_PASSWORD: "Martich05",
        DB_NAME: "rifasdb",
        JWT_SECRET: "super-ultra-secret"
      }
    }
  ]
};
