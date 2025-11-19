# 🚀 Lumo Mini‑Postman Clone

A lightweight, React‑based API tester that demonstrates a clean separation between UI, domain logic, and networking while keeping the codebase TypeScript‑strict.

---

## ✅ Implemented Features (v1.0)

| Area                         | Feature                                                                                                                                                                                                                                                                                                  | Brief description                                                                                                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI – Simple Request View** | Request builder form                                                                                                                                                                                                                                                                                     | • Method selector (GET                                                                                                                                                                          |  POST  |  PUT  |  DELETE  |  HEAD  |  OPTIONS) <br>• URL input (plain text) <br>• Headers textarea (one per line, `Key: Value`) <br>• Query‑string field (key=value&…) <br>• Body editor (raw JSON / text, shown only for methods that support a payload) |
| **Networking**               | `sendRequest` wrapper around **Axios**                                                                                                                                                                                                                                                                   | • Constructs `AxiosRequestConfig` from a `RequestDTO` <br>• Injects Basic or Bearer authentication <br>• Measures request duration <br>• Normalises response headers via `axiosHeadersToRecord` |
| **State Management**         | React Context (`RequestProvider`)                                                                                                                                                                                                                                                                        | • Holds the latest `RequestDTO` and `ResponseDTO` <br>• Provides `setRequest` / `setResponse` setters for any component <br>• Simple `useRequest` hook for ergonomic consumption                |
| **Utilities**                | • `buildRequestDTO` (pure function) – parses raw header / query strings, merges query params into the final URL, trims whitespace.<br>• `axiosHeadersToRecord` – converts `AxiosResponseHeaders` (or a partial object) into a strict `Record<string, string>` with optional hop‑by‑hop header filtering. |
| **Developer Experience**     | • Strict TypeScript DTOs (`RequestDTO`, `ResponseDTO`).<br>• Pure functions are unit‑test ready (easily exercised with Jest/Vitest).                                                                                                                                                                     |

---

## 🌱 Planned / Future Features

| Category                 | Feature                                                      | Why it matters                                    |
| ------------------------ | ------------------------------------------------------------ | ------------------------------------------------- |
| **UI Enhancements**      | Tabbed body editor (Raw / Form‑Data / x‑www‑urlencoded)      | Mirrors full Postman ergonomics.                  |
|                          | Monaco‑based code editor with syntax highlighting            | Better JSON editing experience.                   |
|                          | Dark / Light theme toggle (MUI theming)                      | Improves accessibility and user preference.       |
|                          | Request history panel                                        | Quickly re‑run previous calls.                    |
|                          | Environment variables (`{{BASE_URL}}`)                       | Switch between dev / prod endpoints effortlessly. |
| **Advanced Auth**        | OAuth 2.0 flows (Authorization Code, Client Credentials)     | Supports modern APIs.                             |
| **Testing & Automation** | Built‑in test runner (JS snippets)                           | Validate response shape, status, timing.          |
|                          | Export to cURL / fetch / PowerShell snippets                 | Easy copy‑paste for docs or CI pipelines.         |
| **Performance**          | Request cancellation (AbortController)                       | Stop long‑running calls.                          |
| **Persistence**          | Save collections to `localStorage` / IndexedDB               | Keep work between sessions.                       |
| **Security**             | Redact sensitive headers (e.g., `Authorization`) in UI logs  | Safer sharing of request snapshots.               |
| **Extensibility**        | Plugin system for custom request transformers                | Community can add bespoke behaviours.             |
| **Documentation**        | OpenAPI import/export                                        | Bootstrap requests from existing specs.           |
| **CI Integration**       | CLI wrapper (`lumo-cli`) that runs saved collections         | Use Lumo in automated test pipelines.             |
| **Accessibility**        | Keyboard‑only navigation, ARIA labels, screen‑reader support | Inclusive UX.                                     |
| **Internationalisation** | i18n support (i18next)                                       | Reach non‑English users.                          |

---

## 🙋‍♀️ Contributing

Feel free to open issues or pull requests for any of the items above—or propose brand‑new ideas!

When contributing:

1. Keep the TypeScript types accurate.
2. Follow the existing folder layout (`src/components`, `src/domain`, `src/infrastructure`).
3. Add unit tests for any new pure functions.

Happy hacking! 🎉
