import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 600, // Increase warning limit (optional)
		rollupOptions: {
			output: {
				manualChunks: {
					// Split React and related libraries into a separate vendor chunk
					"vendor-react": ["react", "react-dom", "react-router"],

					// Split authentication related pages
					"auth-pages": [
						"./src/pages/login/page",
						"./src/pages/signup/page",
						"./src/pages/reset-password/page",
						"./src/pages/change-password/page",
					],

					// Split home and other pages
					"home-pages": [
						"./src/pages/home/page",
						"./src/pages/update-user-form/page",
						"./src/pages/insert-employees/page",
					],
				},
			},
		},
	},
});
