import toast from "react-hot-toast";
import { IoPencilSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IconButton } from "shared/ui";
import { useCopyToClipboard } from "usehooks-ts";

type KeyCardProps = {
  id: string;
  name: string;
  description: string;
  value: string;
};

export default function KeyCard({ id, name, description, value }: KeyCardProps) {
  const navigate = useNavigate();
  const [, copy] = useCopyToClipboard();

  return (
    <div
      className="relative flex items-center justify-between py-1.5 px-3 shadow rounded-lg cursor-pointer"
      onClick={async () => {
        await copy(value);
        toast.success("Copied!");
      }}
    >
      <div>
        <div>{name}</div>
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      </div>
      <IconButton
        icon={<IoPencilSharp size={16} />}
        onClick={(event) => {
          event.stopPropagation();
          navigate(`/keys/${id}`);
        }}
      />
    </div>
  );
}
