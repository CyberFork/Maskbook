import { EthereumNetwork } from './database/types'
import { createNewSettings } from '../../components/shared-settings/createSettings'

const settings = {
    contractAddress: {
        [EthereumNetwork.Mainnet]: '0x9ab3edd567fa8B28f6AbC1fb14b1fB7a30140575',
        [EthereumNetwork.Rinkeby]: '0xC21F17f4f2E04ae718f1e65a29C833627eaA0b6f',
        [EthereumNetwork.Ropsten]: '0x9ab3edd567fa8B28f6AbC1fb14b1fB7a30140575',
    },
    middlewareAddress: {
        [EthereumNetwork.Mainnet]: 'wss://mainnet.infura.io/ws/v3/11f8b6b36f4a408e85d8a4e52d31edc5',
        [EthereumNetwork.Rinkeby]: 'wss://rinkeby.infura.io/ws/v3/11f8b6b36f4a408e85d8a4e52d31edc5',
        [EthereumNetwork.Ropsten]: 'wss://ropsten.infura.io/ws/v3/11f8b6b36f4a408e85d8a4e52d31edc5',
    },
} as {
    contractAddress: Record<EthereumNetwork, string>
    middlewareAddress: Record<EthereumNetwork, string>
}

export function getNetworkSettings() {
    const networkType = currentEthereumNetworkSettings.value

    return {
        networkType,
        contractAddress: settings.contractAddress[networkType],
        middlewareAddress: settings.middlewareAddress[networkType],
    }
}

export const currentEthereumNetworkSettings = createNewSettings<EthereumNetwork>(
    'eth network',
    EthereumNetwork.Mainnet,
    {
        primary: 'Choose ETH network',
        secondary: `You can choose ${EthereumNetwork.Mainnet}, ${EthereumNetwork.Rinkeby} or ${EthereumNetwork.Ropsten}`,
    },
)