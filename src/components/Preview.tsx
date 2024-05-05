import { FC, useMemo } from "react";
import { useSendFile } from "../hooks/useSendFile";
import { useEncryptFile } from "../hooks/useEncryptFile";
import { Button } from "./Button";

type PreviewProps = {
  photo: string;
  goCamera: () => void;
};
export const Preview: FC<PreviewProps> = ({ photo, goCamera }) => {
  const { encryptFile, loading: encryptLoading } = useEncryptFile();
  const { sendFile, sent, error, loading: sendLoading } = useSendFile();
  const loading = useMemo(
    () => encryptLoading || sendLoading,
    [encryptLoading, sendLoading]
  );
  return (
    <div>
      <Button onClick={goCamera} label="Tomar otra foto" />
      {!sent && (
        <Button
          label="Enviar foto"
          disabled={sent || !!error || loading}
          onClick={async () => {
            const result = await encryptFile(photo);
            if (result) {
              await sendFile(result);
            }
          }}
        />
      )}
      {sent && <label>Foto subida con exito</label>}
      {!!photo && (
        <img
          alt="Preview"
          src={photo}
          // height={200} width={200}
        />
      )}
    </div>
  );
};
