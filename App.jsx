import AppNavigation from "./src/navigation";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LoginRequiredProvider } from "./src/hooks/loginContext";
import { AuthProvider } from "./src/hooks/authContext";
import { SavedNewsProvider } from "./src/hooks/savedNewsContext";
import { LikedNewsProvider } from "./src/hooks/likeContext";

const queryClient = new QueryClient();

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoginRequiredProvider>
          <SavedNewsProvider>
            <LikedNewsProvider>
              <AppNavigation />
            </LikedNewsProvider>
          </SavedNewsProvider>
        </LoginRequiredProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
