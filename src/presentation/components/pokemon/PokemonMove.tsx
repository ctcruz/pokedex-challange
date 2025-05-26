import { TableCell, TableRow, Typography } from "@mui/material";
import { usePokemonMove } from "../../../application/hooks/usePokemonMove";
import { Loader } from "../layout/Loader";
import type { ReactElement } from "react";

function TableRowContent({ children }: { children: ReactElement }) {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell colSpan={2}>{children}</TableCell>
    </TableRow>
  );
}

type PokemonAbilitiesProps = {
  moveId: number;
};

const PokemonMove = ({ moveId }: PokemonAbilitiesProps) => {
  const { data, isLoading, isError } = usePokemonMove(moveId, {
    enabled: !!moveId,
  });

  if (isLoading)
    return (
      <TableRowContent>
        <Loader />
      </TableRowContent>
    );
  if (isError)
    return (
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        <TableCell colSpan={2}>
          <Typography variant="body2" color="error">
            An error occurred while loading the Pokémon's move.
          </Typography>
        </TableCell>
      </TableRow>
    );

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {data === null ? (
        <TableCell colSpan={2}>
          <Typography variant="body2" color="textSecondary">
            Pokémon's moves not found!
          </Typography>
        </TableCell>
      ) : (
        <>
          <TableCell>
            <Typography variant="subtitle2" component="span">
              {data?.name}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body2" component="span">
              {data?.description}
            </Typography>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export { PokemonMove };
