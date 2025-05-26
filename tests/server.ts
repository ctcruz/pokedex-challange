import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return HttpResponse.json({ results: [{ name: "bulbasaur" }] });
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) => {
    const { name } = params;
    return HttpResponse.json({ name, abilities: [], moves: [], forms: [] });
  })
);

export { server };
