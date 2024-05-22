import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthScreen, CreateVaultScreen, PasswordScreen, SetPasswordScreen } from "modules/auth/screens";
import { useAuthStore } from "modules/auth/stores";
import { CreateKeyScreen, DashboardScreen, EditKeyScreen } from "modules/vault/screens";

export default function AppRouter() {
  const isLoggedIn = useAuthStore((state) => !!(state.publicKey && state.privateKey));
  const hashedPassword = useAuthStore((state) => state.hashedPassword);
  const isSessionActive = useAuthStore((state) => state.isSessionActive);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && (
          <Route>
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/create-vault" element={<CreateVaultScreen />} />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Route>
        )}

        {isLoggedIn && !hashedPassword && (
          <Route>
            <Route path="/set-password" element={<SetPasswordScreen />} />
            <Route path="*" element={<Navigate to="/set-password" />} />
          </Route>
        )}

        {isLoggedIn && hashedPassword && !isSessionActive && (
          <Route>
            <Route path="/password" element={<PasswordScreen />} />
            <Route path="*" element={<Navigate to="/password" />} />
          </Route>
        )}

        {isLoggedIn && hashedPassword && isSessionActive && (
          <Route>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/keys/new" element={<CreateKeyScreen />} />
            <Route path="/keys/:id" element={<EditKeyScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}
