### Scrap API Mercado Libre 1.5.0

This repository contains several Mercado Libre Scrap API scripts designed to facilitate the setup, build, and execution of an application. Below is a description of the purpose of each script:

#### 1. `setup`

```bash
npm run setup
```

This script installs the `npm` package manager and performs the following actions:

- Installs project dependencies using `npm install`.
- Executes the build script (`build`).

#### 2. `start`

```bash
npm start
```

This script starts the application by running the `server.js` file in the `dist` directory. It uses the `--max-old-space-size` option to increase the memory limit assigned to Node.js and exposes garbage collection (`--expose-gc`).

**Note:** Ensure that the application is built before running this script (`npm run build`).

---
