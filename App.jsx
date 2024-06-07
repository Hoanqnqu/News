import AppNavigation from "./src/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LoginRequiredProvider } from "./src/hooks/loginContext";
import { AuthProvider } from "./src/hooks/authContext";



const queryClient = new QueryClient();

export default function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoginRequiredProvider>
          <AppNavigation />
        </LoginRequiredProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
