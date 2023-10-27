# DBH

This project was generated using [Nx](https://nx.dev).

<p style="text-align: left;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="100"></p>

🔎 **Smart, Fast and Extensible Build System**

## Pre-requisites

- [Node.js](https://nodejs.org/en/) (v20+)
- [Docker](https://docs.docker.com/desktop/install/mac-install/) is required for local UI development.

## Quick Start & Documentation

Clone this repo [ITE-Portal](https://github.com/ideacrew/ite-portal)

Clone the following repos into the same parent directory as this repo:

- [ITE Portal API](https://github.com/ideacrew/ite_portal_api)
- [Provider Gateway API](https://github.com/ideacrew/provider-gateway-api)

Use the default name for the folder to clone into (e.g. `ite_portal_api`)

You should now have the following directory structure:

```bash
.
├── ite-portal
├── ite_portal_api
└── provider-gateway-api
```

Run the following command from the root of the `ite-portal` directory to install dependencies:

```bash
npm install
```

### Starting the API's

ITE Portal and Provider Gateway both require a local instance of both API's to be running. To start the API's, run the following command from the root of the `ite-portal` directory:

```bash
npm run start:api
```

### Starting the UI

To start the UI, run the following command from the root of the `ite-portal` directory:

```bash
nx serve provider-gateway
```

or

```bash
nx serve ite-portal
```

### Initial Local API Setup

See the project dev lead to setup up your local environment.

## Learn about Nx

[Nx Documentation](https://nx.dev/angular)
