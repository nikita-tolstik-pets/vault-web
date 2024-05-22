import { useNavigate } from "react-router-dom";
import { logoTextSrc } from "shared/assets";
import { Button } from "shared/ui";

export default function AuthScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-center">
        <div>
          <p className="text-lg font-bold text-white text-center">Добро пожаловать в Vault</p>
          <img src={logoTextSrc} alt="Logo Text" className="mt-14 h-[40px] mx-auto" />
          <p className="text-center mt-24">
            Создай своё безопасное и надежное хранилище для хранения данных от аккаунтов
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 mt-auto">
        <Button className="w-full">Войти</Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => {
            navigate("/create-vault");
          }}
        >
          Создать
        </Button>
      </div>
    </div>
  );
}
