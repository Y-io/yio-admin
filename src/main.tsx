import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { appQueryClient } from "@/query/query-client.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={appQueryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
);
