// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => ({
//   base: "/dcm",
//   server: {
//     host: "::",
//     port: 8080,
//   },
//   plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));



// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/dcm",
  server: {
    host: "localhost",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});






// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import path from "path";
// import { componentTagger } from "lovable-tagger";

// // Replace these with your actual frontend and backend IPs
// const FRONTEND_IP = "192.168.1.101"; // the machine you'll open frontend on
// const BACKEND_IP = "192.168.1.100";  // Spring Boot backend machine
// const BACKEND_PORT = 8081;

// export default defineConfig(({ mode }) => ({
//   base: "/dcm",
//   server: {
//     host: "::",  // listen on all network interfaces
//     port: 8080,  // frontend port
//     proxy: {
//       // Proxy /dcm API requests to backend
//       "/dcm": {
//         target: `http://${BACKEND_IP}:${BACKEND_PORT}`,
//         changeOrigin: true,
//         secure: false,
//         ws: true, // if you use websocket
//       },
//     },
//   },
//   plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// }));



