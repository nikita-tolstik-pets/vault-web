import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "modules/auth/components";

import { AppLayout, AppRouter } from "./components";

function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <AppLayout>
        <AuthProvider>
          <AppRouter />
          <Toaster position="bottom-center" />
        </AuthProvider>
      </AppLayout>
    </ErrorBoundary>
  );
}

export default App;
