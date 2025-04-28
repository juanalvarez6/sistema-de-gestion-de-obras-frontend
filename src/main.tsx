import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"; // pequeño detalle: aquí era 'react-router-dom' 👀
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MaterialRequestsProvider } from './context/MaterialRequestsContext'; // 👈 Importa tu provider
import './index.css'
import AppRoutes from './routes/AppRoutes.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MaterialRequestsProvider> {/* 👈 Aquí envuelves AppRoutes */}
          <AppRoutes />
        </MaterialRequestsProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
