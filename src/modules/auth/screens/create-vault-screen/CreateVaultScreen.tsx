import { useMemo } from "react";
import toast from "react-hot-toast";
import { BsKey } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { authService } from "modules/auth/services";
import { generate } from "random-words";
import { logoSmallSrc } from "shared/assets";
import { Button, Input } from "shared/ui";
import { useCopyToClipboard } from "usehooks-ts";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const [, copy] = useCopyToClipboard();
  const recoveryKey = useMemo(() => generate({ exactly: 36, join: " " }), []);

  return (
    <div className="w-full h-full flex flex-col items-start">
      <img src={logoSmallSrc} alt="Logo" className="h-[32px]" />
      <h6 className="mt-32">Создание хранилища</h6>

      <Input
        label="Ключ доступа"
        value={recoveryKey}
        readOnly
        onClick={() => {
          copy(recoveryKey);
          toast.success("Copied!");
        }}
        className="cursor-pointer mt-48 w-full"
        InputProps={{
          className: "cursor-pointer",
        }}
        icon={<BsKey />}
      />

      <div className="flex flex-col gap-8 mt-auto w-full">
        <Button
          onClick={async () => {
            await authService.createVault(recoveryKey);
            navigate("/import-vault");
          }}
          className="w-full"
        >
          Создать
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            navigate(-1);
          }}
          className="w-full"
        >
          Назад
        </Button>
      </div>
    </div>
  );
}
