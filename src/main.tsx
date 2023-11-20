import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@/tailwind.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>,
)
