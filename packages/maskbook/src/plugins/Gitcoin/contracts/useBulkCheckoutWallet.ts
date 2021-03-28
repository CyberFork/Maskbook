import BulkCheckoutABI from '@dimensiondev/contracts/abis/BulkCheckout.json'
import type { BulkCheckout } from '@dimensiondev/contracts/types/BulkCheckout'
import { useConstant } from '../../../web3/hooks/useConstant'
import { GITCOIN_CONSTANT } from '../constants'
import { useContract } from '../../../web3/hooks/useContract'

export function useBulkCheckoutContract() {
    const address = useConstant(GITCOIN_CONSTANT, 'BULK_CHECKOUT_ADDRESS')
    return useContract<BulkCheckout>(address, BulkCheckoutABI)
}
