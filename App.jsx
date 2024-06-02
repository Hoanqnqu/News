import AppNavigation from "./src/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LoginRequiredProvider } from "./src/hooks/loginContext";



const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginRequiredProvider>
        <AppNavigation />
      </LoginRequiredProvider>
    </QueryClientProvider>
  );
}
