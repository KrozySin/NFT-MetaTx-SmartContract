# NicoFT-SC

To manage sources of SmartContract for NicoFT

## Install Environment

You can install environment as follow:

```
 npm install
```

## Compilation

Before deploy the contract, you must compile the contracts.

```
 npx hardhat compile
```

## Deploy Contract

You can deploy contract using this command:

```
npx hardhat deployContract --network <NETWORK> <CONTRACT_NAME> <ARGUMENT_FILE>
```

- `<NETWORK>` can be `testnet` or `mainnet`.
- `<CONTRACT_NAME>` can be referred from `contracts\NFT\`
- `<ARGUMENT_FILE>` can be referred from `scripts\arguments\`

  `<ARGUMENT_FILE>` = `logic` OR `market` OR `proxy`

## Verify Contract

You can verify contract using this command:

```
npx hardhat verify --network testnet --constructor-args <ARGUMENT_FILE_PATH> <CONTRACT_ADDRESS>
```

- `<CONTRACT_ADDRESS>` is the address from the deployment
- `<ARGUMENT_FILE_PATH>` is the full path of the argument files

  `<ARGUMENT_FILE_PATH>` = `./scripts/arguments/logic.js`

  `<ARGUMENT_FILE_PATH>` = `./scripts/arguments/proxy.js`

  `<ARGUMENT_FILE_PATH>` = `./scripts/arguments/market.js`

## Environment for the deployment from api

- Copy the `NicoFT-SC` project near the `NicoFT-js-api`.
- Install `NicoFT-SC` environment
- Compile the smart contracts
- Check if the `NicoFT-SC` directory and `NicoFT-js-api` directory are in the same path
