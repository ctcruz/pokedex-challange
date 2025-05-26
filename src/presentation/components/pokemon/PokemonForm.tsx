import { Typography } from "@mui/material";
import { usePokemonForm } from "../../../application/hooks/usePokemonForm";
import { PokemonAvatar } from "./PokemonAvatar";
import { Loader } from "../layout/Loader";

type PokemonFormProps = {
  formId: number;
};

const PokemonForm = ({ formId }: PokemonFormProps) => {
  const { data, isFetched, isError } = usePokemonForm(formId, {
    enabled: !!formId,
  });

  if (!isFetched) return <Loader />;
  if (isError)
    return (
      <li>
        <Typography variant="body2" color="error">
          An error occurred while loading the Pokémon's form.
        </Typography>
      </li>
    );

  return (
    <li>
      {data === null ? (
        <Typography variant="body2" color="textSecondary">
          Pokémon's forms not found!
        </Typography>
      ) : (
        <>
          <PokemonAvatar src={data!.imageSrc} alt={data!.name} size={60} />
          <Typography variant="subtitle1" component="span">
            {data?.name}
          </Typography>
        </>
      )}
    </li>
  );
};

export { PokemonForm };
