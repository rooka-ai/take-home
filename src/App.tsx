import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Entrypoint } from "./components/Entrypoint";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a separate function to initialize the QueryClient
const initializeQueryClient = () => {
  return new QueryClient();
};

const queryClient = initializeQueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Extract the main content into a separate component
const MainContent = () => (
  <main className="flex min-h-screen items-center justify-center py-32">
    <Entrypoint />
  </main>
);

export default App;
