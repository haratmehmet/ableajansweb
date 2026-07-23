module.exports = {
  apps: [
    {
      name: "able-ajans",
      script: "server.js",
      cwd: "./.next/standalone",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
        # Bu değişkenleri sunucudaki ortama göre düzenleyin
        DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/ableajans?schema=public",
        STORAGE_PROVIDER: "local",
        LOCAL_UPLOAD_DIR: "../../public/uploads"
      }
    }
  ]
};
