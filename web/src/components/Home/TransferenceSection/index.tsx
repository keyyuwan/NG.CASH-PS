import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

import { api } from "../../../libs/api";
import { mascaraBRL, desmascaraBRL } from "../../../utils/masks";
import { toastOptions } from "../../../utils/toastify";
import { Button } from "../../Button";
import { Input } from "../../Form/Input";

import {
  TransferenceSectionContainer,
  TransferenceSectionDescription,
  TransferenceSectionTitle,
  TransferenceForm,
} from "./styles";
import { useAuth } from "../../../hooks/useAuth";

export function TransferenceSection() {
  const [recipientUsername, setRecipientUsername] = useState("");
  const [value, setValue] = useState(0);

  const { refreshAccountData } = useAuth();

  function handleTransferenceValue(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    let inputValue = target.value as any;

    inputValue = desmascaraBRL(inputValue);

    setValue(inputValue);
  }

  async function handleTransfer() {
    try {
      await api.post("/transfer", {
        recipientUsername,
        value,
      });

      toast.success("Transferência realizada!", toastOptions);

      setRecipientUsername("");
      setValue(0);

      refreshAccountData();
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.log(error);
      toast.error(error.response?.data.error as string, toastOptions);
    }
  }

  return (
    <TransferenceSectionContainer>
      <TransferenceSectionTitle>
        Realizar Transferência
      </TransferenceSectionTitle>
      <TransferenceSectionDescription>
        Realize transferências para usuários <span>NG.CASH</span> de forma
        simples!
      </TransferenceSectionDescription>

      <TransferenceForm>
        <Input
          label="Username de quem receberá"
          value={recipientUsername}
          onChange={(event) =>
            setRecipientUsername(
              (event.target as HTMLInputElement).value.toLowerCase()
            )
          }
        />
        <Input
          label="Valor (R$)"
          value={mascaraBRL(value)}
          onChange={handleTransferenceValue}
        />
        <Button title="Transferir" type="button" onClick={handleTransfer} />
      </TransferenceForm>
    </TransferenceSectionContainer>
  );
}
