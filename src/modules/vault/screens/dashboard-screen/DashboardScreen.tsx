import { useState } from "react";
import { IoMenu, IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useVaultStore } from "modules/vault/stores/vault";
import { Button, IconButton, Input } from "shared/ui";

import { KeyCard, Menu } from "./components";

export default function DashboardScreen() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { vault } = useVaultStore();

  return (
    <div>
      {open && <Menu onClose={() => setOpen(false)} />}
      {!open && (
        <>
          <div className="flex items-center">
            <IconButton icon={<IoMenu size={28} />} onClick={() => setOpen(true)} />
          </div>
          <div className="flex items-end gap-3">
            <Input
              type="text"
              className="w-full mt-3"
              icon={<IoSearchSharp />}
              placeholder="Search"
              value={searchValue}
              onChange={({ target }) => setSearchValue(target.value)}
            />
            <Button
              onClick={() => {
                navigate("/keys/new");
              }}
            >
              New
            </Button>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {vault?.data.keys.map((key) => {
              return (
                <KeyCard key={key.id} id={key.id} name={key.name} description={key.description} value={key.value} />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
