import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";

type InitProps = {
  goCamera: () => void;
};
export const Init: FC<InitProps> = ({ goCamera }) => {
  return (
    <Grid>
      <Grid>
        <Button onClick={goCamera} variant="contained">
          Abrir camara
        </Button>
      </Grid>
    </Grid>
  );
};
