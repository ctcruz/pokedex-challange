import { usePokemonAbility } from "../../../application/hooks/usePokemonAbility";
import { TableCell, TableRow, Typography } from "@mui/material";
import { Loader } from "../layout/Loader";
import type { ReactElement } from "react";

type PokemonAbilitiesProps = {
  abilityId: number;
};

function TableRowContent({ children }: { children: ReactElement }) {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell colSpan={2}>{children}</TableCell>
    </TableRow>
  );
}

const PokemonAbility = ({ abilityId }: PokemonAbilitiesProps) => {
  const { data, isLoading, isError } = usePokemonAbility(abilityId, {
    enabled: !!abilityId,
  });

  if (isLoading)
    return (
      <TableRowContent>
        <Loader />
      </TableRowContent>
    );

  if (isError)
    return (
      <TableRowContent>
        <Typography variant="body2" color="error" component="span">
          An error occurred while loading the Pokémon's abilities.
        </Typography>
      </TableRowContent>
    );

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      {data === null ? (
        <TableCell colSpan={2}>
          <Typography variant="body2" color="textSecondary">
            Pokémon's abilities not found!
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

export { PokemonAbility };
