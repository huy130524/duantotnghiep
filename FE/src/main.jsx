import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/global.scss";
import App from "./App";

export const client = new QueryClient();
const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  );
}
