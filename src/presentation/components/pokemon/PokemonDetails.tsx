import { Tab, Table, TableBody, Tabs } from "@mui/material";
import { TabPanel } from "../layout/TabPanel";
import { PokemonAbility } from "./PokemonAbility";
import { PokemonMove } from "./PokemonMove";
import { PokemonForm } from "./PokemonForm";
import { useMemo, useState } from "react";

const getURLId = (url: string) => {
  const parts = url.split("/").filter(Boolean);
  return Number(parts[parts.length - 1]);
};

type PokemonDetailsProps = {
  data: {
    abilities: { ability: { url: string }; is_hidden: boolean }[];
    forms: { url: string }[];
    moves: { move: { url: string } }[];
  } | null;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
};

const PokemonDetails = ({ data }: PokemonDetailsProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  const abilityIds = useMemo(
    () =>
      data?.abilities
        .filter((ability) => ability.is_hidden === false)
        .map((ability) => getURLId(ability.ability.url)) || [],
    [data?.abilities]
  );

  const formIds = useMemo(
    () => data?.forms.map((form) => getURLId(form.url)) || [],
    [data?.forms]
  );

  const moveIds = useMemo(
    () => data?.moves.map((move) => getURLId(move.move.url)) || [],
    [data?.moves]
  );

  return (
    <>
      <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        <Tab label="Abilities" />
        <Tab label="Moves" />
        <Tab label="Forms" />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <Table>
          <TableBody>
            {abilityIds.map((abilityId: number) => (
              <PokemonAbility
                key={`ability-${abilityId}`}
                abilityId={abilityId}
              />
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Table>
          <TableBody>
            {moveIds.map((moveId: number) => (
              <PokemonMove key={`move-${moveId}`} moveId={moveId} />
            ))}
          </TableBody>
        </Table>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {formIds.map((formId: number) => (
            <PokemonForm key={`form-${formId}`} formId={formId} />
          ))}
        </ul>
      </TabPanel>
    </>
  );
};

export { PokemonDetails };
