import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log({ env: env.BASE_API_URL });
  return {
    define: {
      "import.meta.env.BASE_API_URL": JSON.stringify(env.BASE_API_URL),
      "import.meta.env.ENVIRONMENT": JSON.stringify(env.ENVIRONMENT),
    },
    plugins: [react()],
    resolve: {
      alias: [{ find: "@", replacement: "/src" }],
    },
    server: {
      host: true,
      port: (env.PORT || 8000) as number,
      // proxy: {
      //   "/api": {
      //     target: env.API_BASE_URL,
      //     changeOrigin: true,
      //     // rewrite: (path) => path.replace(/^\/api/, "api"),
      //   },
      // },
    },
  };
});
