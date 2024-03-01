import {HardhatUserConfig} from 'hardhat/types';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import "hardhat-docgen";
import "hardhat-gas-reporter";
import "./tasks/accounts";
import "@nomiclabs/hardhat-etherscan";
import 'dotenv/config'

 const privateKey = process.env.PRIVATE_KEY;

 const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: 0,
  },
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {
      saveDeployments: true,
    },
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: [privateKey],
      chainId: 1337,
      saveDeployments: true,
    },
zircuit: {
      url: `https://zircuit1.p2pify.com`,
      accounts: [privateKey],
      saveDeployments: true,
    },
    scroll: {
      url: 'https://scroll-sepolia.blockpi.network/v1/rpc/public',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    linea: {
      url: 'https://rpc.goerli.linea.build',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    matis_main: {
      url: 'https://metis-pokt.nodies.app',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    hedra_test: {
      url: 'https://testnet.hashio.io/api',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    oasis_test: {
      url: 'https://testnet.sapphire.oasis.dev',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    injective_test: {
      url: 'https://testnet.sentry.tm.injective.network:443',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    xdc_test: {
      url: 'https://rpc.apothem.network',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/tCbwTAqlofFnmbVORepuHNcsrjNXWdRJ',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: [privateKey || ''],
      saveDeployments: true,
    },     calibrationnet: {
      chainId: 314159,
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [privateKey],
  },
  filecoinmainnet: {
      chainId: 314,
      url: "https://api.node.glif.io",
      accounts: [privateKey],
  },
    testnet_aurora: {
      url: 'https://testnet.aurora.dev',
      accounts: [privateKey],
      saveDeployments: true,
      chainId: 1313161555,
      gasPrice: 120 * 1000000000,
    }
  
  },
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.1',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.2',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.3',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 300,
          },
        },
      },
      {
        version: '0.8.5',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,

    coinmarketcap: '9e9077a0-349d-45e1-bbeb-f68f3d1a57b5',
    outputFile: './output.js',
    showTimeSpent: true,
    showMethodSig: true,
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: 'your key',
  },
  // paths: {
  //   sources: "./contracts",
  //   tests: "./test",
  //   cache: "./cache",
  //   artifacts: "./artifacts"
  // },
  paths: {
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports',
  },
  mocha: {
    timeout: 200000000,
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  },
}
export default config;
