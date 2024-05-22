import { logoSmallSrc } from "shared/assets";

export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center fixed left-0 top-0 w-screen h-screen z-50 bg-dark-900">
      <img src={logoSmallSrc} alt="Splash screen logo" />
    </div>
  );
}
