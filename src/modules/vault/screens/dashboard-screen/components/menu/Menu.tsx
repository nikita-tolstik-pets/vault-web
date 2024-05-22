import { IoClose } from "react-icons/io5";
import { authService } from "modules/auth/services";
import { IconButton } from "shared/ui";

type MenuProps = {
  onClose(): void;
};

const options = [
  { label: "Settings" },
  { label: "Support" },
  {
    label: "Log Out",
    onClick: () => {
      authService.signOut();
    },
  },
];

export default function Menu({ onClose }: MenuProps) {
  return (
    <div>
      <div className="flex items-center">
        <IconButton icon={<IoClose size={28} />} onClick={onClose} />
        <h3 className="inline-block ml-2 font-semibold text-xl">Options</h3>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        {options.map((opt) => (
          <div
            key={opt.label}
            className="w-full py-3 hover:bg-gray-100 text-gray-900 rounded-lg text-center text-md font-semibold cursor-pointer"
            onClick={opt.onClick}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
