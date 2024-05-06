import { FC, useMemo } from "react";
import { useSendFile } from "../hooks/useSendFile";
import { useEncryptFile } from "../hooks/useEncryptFile";
import { Grid, Button, CircularProgress } from "@mui/material";

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
    <Grid>
      <Grid>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Button onClick={goCamera} variant="contained">
              Tomar otra foto
            </Button>
            {!sent ? (
              <Button
                variant="contained"
                disabled={sent || !!error || loading}
                onClick={async () => {
                  const result = await encryptFile(photo);
                  if (result) {
                    await sendFile(result);
                  }
                }}
              >
                Enviar foto
              </Button>
            ) : (
              <Button variant="outlined">Foto subida con exito</Button>
            )}
          </>
        )}
      </Grid>
      <Grid>
        {!!photo && (
          <img
            alt="Preview"
            src={photo}
            // height={200} width={200}
          />
        )}
      </Grid>
    </Grid>
  );
};
