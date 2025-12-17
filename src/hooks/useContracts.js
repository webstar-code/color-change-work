import { BrowserProvider, Contract, formatUnits, parseUnits } from "ethers";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import toast from "react-hot-toast";
import {
  TOKEN_CONTRACT_ADDRESS,
  INVEST_CONTRACT_ADDRESS,
  TOKEN_ABI,
  INVEST_ABI,
} from "../contracts/contract";

function useContract() {
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const getProvider = () => {
    return new BrowserProvider(walletProvider);
  };
  const getSigner = async (provider) => {
    return provider.getSigner();
  };

  const getContract = async (address, abi, signer) => {
    const contract = new Contract(address, abi, signer);
    return contract;
  };

  const invest = async (amount, referral) => {
    if (!address) return toast.error("Please connect your wallet");
    if (!amount) return toast.error("Please enter an amount to invest");
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );

    // check for valid referral and if not valid set to address 0
    if (!referral) {
      referral = "0x" + "0".repeat(40);
    }

    // check if referral is a valid address
    if (referral.length !== 42) {
      referral = "0x" + "0".repeat(40);
    }

    console.log(referral);

    const parsedAmount = parseUnits(amount, 18);

    const tokenContract = await getContract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_ABI,
      signer
    );

    // apprrove the contract to spend the amount
    const approveTx = await tokenContract.approve(
      INVEST_CONTRACT_ADDRESS,
      parsedAmount
    );
    await approveTx.wait();

    const tx = await contract.invest(parsedAmount, referral, {});

    const receipt = await tx.wait();
    console.log(receipt);
    return receipt;
  };

  const withdraw = async (amount) => {
    if (!address) return toast.error("Please connect your wallet");
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    const parsedAmount = parseUnits(amount, 18);
    const tx = await contract.withdraw(parsedAmount);
    const receipt = await tx.wait();
    console.log(receipt);
    return receipt;
  };

  const reward = async () => {
    if (!address) return toast.error("Please connect your wallet");
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    const reward = await contract.calculateDividends(address);

    return Number(formatUnits(reward, 18));
  };

  const level = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    const level = await contract.getReferralLevel(address);
    return level;
  };

  const getInvestData = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    let minimum = await contract.minimum_investment();
    let maximum = await contract.maximum_investment();

    let total_invested = await contract.total_invested();

    let total_profits = await contract.total_profit();

    const active_users = await contract.active_users();

    minimum = formatUnits(minimum, 18);
    maximum = formatUnits(maximum, 18);
    total_invested = formatUnits(total_invested, 18);
    total_profits = formatUnits(total_profits, 18);

    return {
      minimum,
      maximum,
      total_invested,
      total_profits,
      active_users: Number(active_users),
    };
  };

  const getTokenBalance = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      TOKEN_CONTRACT_ADDRESS,
      TOKEN_ABI,
      signer
    );
    const balance = await contract.balanceOf(address);
    return formatUnits(balance, 18);
  };

  const myInvestment = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    const investment = await contract.investments(address);
    console.log(investment);
    return {
      amount: formatUnits(investment.amount, 18),
      lastWithdrawTime: investment.last_withdraw_time,
    };
  };

  const myReferral = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    const referral = await contract.referrals(address);
    return referral;
  };

  const getReferralLevel = async (address) => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    const level = await contract.getReferralLevel(address);
    return Number(level);
  };

  const claimReferralRewards = async () => {
    const provider = getProvider();
    const signer = await getSigner(provider);
    const contract = await getContract(
      INVEST_CONTRACT_ADDRESS,
      INVEST_ABI,
      signer
    );
    const tx = await contract.claimReferralRewards();
    const receipt = await tx.wait();
    console.log(receipt);
    return receipt;
  };

  return {
    getInvestData,
    invest,
    getTokenBalance,
    myInvestment,
    myReferral,
    withdraw,
    reward,
    level,
    getReferralLevel,
    claimReferralRewards,
  };
}

export default useContract;
