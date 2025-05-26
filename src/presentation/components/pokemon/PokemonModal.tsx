import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { usePokemonData } from "../../context/PokemonContext";
import { usePokemonDetail } from "../../../application/hooks/usePokemonDetail";
import { PokemonAvatar } from "./PokemonAvatar";
import { capitalizeFirstLetter } from "../../../shared/helpers/capitalize";
import { PokemonDetails } from "./PokemonDetails";
import { Loader } from "../layout/Loader";

const PokemonModal: React.FC = () => {
  const { pokemonData, setPokemonData } = usePokemonData();

  const { data, isLoading } = usePokemonDetail(pokemonData?.name || "", {
    enabled: !!pokemonData?.name,
  });

  const open = Boolean(data?.name);
  const onClose = () => {
    setPokemonData(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ textAlign: "center" }}>
        {capitalizeFirstLetter(pokemonData?.name || "")}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <PokemonAvatar
            src={pokemonData?.image ?? ""}
            alt={pokemonData?.name ?? ""}
            size={100}
          />
        </Stack>
      </DialogContent>
      <DialogContent style={{ padding: 0 }}>
        <PokemonDetails data={data!} />
      </DialogContent>
    </Dialog>
  );
};

export default PokemonModal;
