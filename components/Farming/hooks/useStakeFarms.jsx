import { useCallback } from 'react'
import { stakeFarm } from '../../../utils/calls'
import { useMasterchef } from '../../../hooks/useContract'

const useStakeFarms = (pid) => {
    const masterChefContract = useMasterchef()

    const handleStake = useCallback(
        async (amount) => {
            console.info('stake', pid, amount);
            const txHash = await stakeFarm(masterChefContract, pid, amount)
        },
        [masterChefContract, pid],
    )

    return { onStake: handleStake }
}

export default useStakeFarms
