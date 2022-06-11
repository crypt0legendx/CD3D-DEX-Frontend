import isZero, { isAddress } from '../utils'
import useDebounce from "./useDebounce";
import {useMemo} from "react";
import {useENSRegistrarContract, useENSResolverContract} from "./useContract";
import {useSingleCallResult} from "../state/multicall/hooks";
import { namehash } from 'ethers/lib/utils'

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
export function useENS( nameOrAddress ) {
    const validated = isAddress(nameOrAddress)
    const reverseLookup = useENSName(validated || undefined)
    const lookup = useENSAddress(nameOrAddress)

    return {
        loading: reverseLookup.loading || lookup.loading,
        address: validated || lookup.address,
        name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null
    }
}

/**
 * Does a lookup for an ENS name to find its address.
 */
export function useENSAddress(ensName) {
    const debouncedName = useDebounce(ensName, 200)
    const ensNodeArgument = useMemo(() => {
        if (!debouncedName) return [undefined]
        try {
            return debouncedName ? [namehash(debouncedName)] : [undefined]
        } catch (error) {
            return [undefined]
        }
    }, [debouncedName])
    const registrarContract = useENSRegistrarContract(false)
    const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument)
    const resolverAddressResult = resolverAddress.result?.[0]
    const resolverContract = useENSResolverContract(
        resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined,
        false
    )
    const addr = useSingleCallResult(resolverContract, 'addr', ensNodeArgument)

    const changed = debouncedName !== ensName
    return {
        address: changed ? null : addr.result?.[0] ?? null,
        loading: changed || resolverAddress.loading || addr.loading
    }
}

/**
 * Does a reverse lookup for an address to find its ENS name.
 * Note this is not the same as looking up an ENS name to find an address.
 */
export function useENSName(address) {
    const debouncedAddress = useDebounce(address, 200)
    const ensNodeArgument = useMemo(() => {
        if (!debouncedAddress || !isAddress(debouncedAddress)) return [undefined]
        try {
            return debouncedAddress ? [namehash(`${debouncedAddress.toLowerCase().substr(2)}.addr.reverse`)] : [undefined]
        } catch (error) {
            return [undefined]
        }
    }, [debouncedAddress])
    const registrarContract = useENSRegistrarContract(false)
    const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument)
    const resolverAddressResult = resolverAddress.result?.[0]
    const resolverContract = useENSResolverContract(
        resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined,
        false
    )
    const name = useSingleCallResult(resolverContract, 'name', ensNodeArgument)

    const changed = debouncedAddress !== address
    return {
        ENSName: changed ? null : name.result?.[0] ?? null,
        loading: changed || resolverAddress.loading || name.loading
    }
}
