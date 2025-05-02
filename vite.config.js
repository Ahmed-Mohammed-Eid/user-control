import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 600,
		rollupOptions: {
			output: {
				inlineDynamicImports: true, // Bundle everything into one file
			},
		},
	},
});
