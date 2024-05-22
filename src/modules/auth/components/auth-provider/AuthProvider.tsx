import { useEffect } from "react";
import { authService } from "modules/auth/services";
import { useAuthStore } from "modules/auth/stores";
import { SplashScreen } from "shared/ui";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const { isSessionChecked } = useAuthStore();

  useEffect(() => {
    authService.initialize().then(() => {
      authService.checkSession();
    });
  }, []);

  if (!isSessionChecked) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
