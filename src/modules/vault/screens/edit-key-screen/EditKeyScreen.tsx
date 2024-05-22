import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { vaultKeysService } from "modules/vault/services/vault-keys";

import { Form } from "./components";

export default function CreateKeyScreen() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center h-full">
      <h1 className="text-4xl font-black text-gray-900">New Key</h1>
      <Form
        onSave={(values) => {
          vaultKeysService.updateKey(id, values);
          toast.success("Successfully saved");
          navigate("/");
        }}
        onCancel={() => {
          navigate("/");
        }}
        onDelete={() => {
          vaultKeysService.deleteKey(id);
        }}
        defaultValues={vaultKeysService.getKey(id)!}
      />
    </div>
  );
}
