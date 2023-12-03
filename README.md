### SpotifyScrap v1.4.2

This repository contains several SpotifyScrap scripts designed to facilitate the setup, build, and execution of an application. Below is a description of the purpose of each script:

#### 1. `setup`

```bash
npm run setup
```

This script installs the `pnpm` package manager and performs the following actions:

- Installs project dependencies using `pnpm install`.
- Executes the build script (`build`).

#### 2. `build`

```bash
npm run build
```

This script performs the following actions:

- Removes the existing `dist` directory using `rimraf`.
- Compiles TypeScript code into JavaScript using `tsc`.
- Copies the `accounts.json` file from the source directory (`src/accounts/`) to the destination directory (`dist/`) using the `copy-json` script.

#### 3. `copy-json`

```bash
npm run copy-json
```

This script uses the `copyfiles` tool to copy the `accounts.json` file from the source directory (`src/accounts/`) to the destination directory (`dist/`).

#### 4. `start`

```bash
npm start
```

This script starts the application by running the `server.js` file in the `dist` directory. It uses the `--max-old-space-size` option to increase the memory limit assigned to Node.js and exposes garbage collection (`--expose-gc`).

**Note:** Ensure that the application is built before running this script (`npm run build`).

---

To use these scripts, follow these steps:

1. Run `npm install` to install project dependencies.
2. Run `npm run setup` to install `pnpm` and build the application.
3. Finally, run `npm start` to start the application.

These scripts are useful for initial setup, building, and efficiently starting the application. Be sure to review the documentation and comments within the source code for more details on the specific functionality of the application.