import "@testing-library/jest-dom";

// Polyfill para TextEncoder/TextDecoder no Node.js
import { TextEncoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}
// if (typeof global.TextDecoder === "undefined") {
//   global.TextDecoder = TextDecoder;
// }
// import { server } from "./server";

// // Antes de todos os testes, inicia o MSW
// beforeAll(() => server.listen());

// // Reseta os handlers entre os testes para evitar vazamentos
// afterEach(() => server.resetHandlers());

// // Encerra o server após todos os testes
// afterAll(() => server.close());
