import BigNumber from 'bignumber.js'
import getGasPrice from "../getGasPrice";
import {DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL} from "../../constants";

export const stakeFarm = async (masterChefContract, pid, amount) => {
    const gasPrice = getGasPrice()
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
    if (pid === 0) {
        const tx = await masterChefContract.enterStaking(value, {})
        const receipt = await tx.wait()
        return receipt.status
    }

    console.log('deposit', pid, value);
    const tx = await masterChefContract.deposit(pid, value, {})
    const receipt = await tx.wait()
    return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
    const gasPrice = getGasPrice()
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
    if (pid === 0) {
        const tx = await masterChefContract.leaveStaking(value, {})
        const receipt = await tx.wait()
        return receipt.status
    }

    console.log('withdraw', pid, value);
    const tx = await masterChefContract.withdraw(pid, value, {})
    const receipt = await tx.wait()
    return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
    const gasPrice = getGasPrice()
    if (pid === 0) {
        const tx = await masterChefContract.leaveStaking('0', {})
        const receipt = await tx.wait()
        return receipt.status
    }

    const tx = await masterChefContract.deposit(pid, '0', {})
    const receipt = await tx.wait()
    return receipt.status
}
