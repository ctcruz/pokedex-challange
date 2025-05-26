import { Button, Container, Stack } from "@mui/material";
import { PokemonSelect } from "../components/form/PokemonSelect";
import PokemonModal from "../components/pokemon/PokemonModal";
import { PokemonProvider } from "../context/PokemonContext";
import { logoutUser } from "../../application/services/AuthService";

export default function HomePage() {
  return (
    <PokemonProvider>
      <Container>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{ margin: 20 }}
        >
          <Button variant="contained" onClick={() => logoutUser()}>
            Logout
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <PokemonSelect />
        </Stack>
        <PokemonModal />
      </Container>
    </PokemonProvider>
  );
}
