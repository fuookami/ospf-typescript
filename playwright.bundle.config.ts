import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./test/browser",
    grep: /browser and module worker/,
    use: { baseURL: "http://127.0.0.1:4173" },
    webServer: {
        command: "npx vite preview --host 127.0.0.1 --port 4173 --strictPort",
        url: "http://127.0.0.1:4173/test/browser/index.html",
        reuseExistingServer: false,
    },
});
