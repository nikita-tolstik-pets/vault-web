import { HashLoader } from "react-spinners";
import { theme } from "shared/ui";

export default function ContainerLoading() {
  return (
    <div className="absolute left-0 top-0 w-full h-full z-50 flex items-center justify-center bg-opacity-80 bg-gray-100">
      <HashLoader color={theme.backgroundColor.dark[900]} />
    </div>
  );
}
