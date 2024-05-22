import { ReactNode } from "react";

type AppLayoutProps = { children: ReactNode };

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-[400px] h-[600px] px-32 py-48 bg-dark-900">{children}</div>
    </div>
  );
}
