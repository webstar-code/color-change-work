import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "./invest.css";
import Eth from "../../assets/tether.svg";
import useContract from "../../hooks/useContracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import Calculator from "../calculator";
import Referrals from "../Referrals";
import MobileSideBar from "../components/Sidebar/MobileSideBar";
import toast from "react-hot-toast";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Invest = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [amount, setAmount] = useState(0);
  const [inviter, setInviter] = useState("");
  const [navData, setNavdata] = useState({
    activeUsers: 0,
    stakedValue: 0,
  });

  const [balance, setBalance] = useState(0);
  const [myReward, setMyReward] = useState(0);
  const [investAmount, setInvestAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const [chnage, setChange] = useState(true);
  let [loading, setLoading] = useState(false);
  let [color] = useState("#008080");

  const {
    invest,
    myInvestment,
    getTokenBalance,
    reward,
    withdraw,
  } = useContract();
  const { address, isConnected } = useWeb3ModalAccount();

  console.log("inviter", inviter);

  // useEffect(() => {
  //   if (address) {
  //     // get ref from url
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const _ref = urlParams.get("ref");
  //     console.log(_ref);
  //     if (_ref) {
  //       setInviter(_ref);
  //     }
  //   }
  // });

  useEffect(() => {
    console.log("address", address);

    const _myInvest = async () => {
      const myInvest = await myInvestment();
      const _getTokenBalance = await getTokenBalance();
      console.log(_getTokenBalance);
      setBalance(_getTokenBalance);

      setInvestAmount(myInvest.amount);
    };
    if (isConnected) {
      try {
        _myInvest();
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [address, chnage, isConnected, myInvestment, getTokenBalance]);

  useEffect(() => {
    const _reward = async () => {
      const _reward = await reward();
      setMyReward(_reward);
    };
    if (isConnected) {
      // call the reward function every 1 second
      const interval = setInterval(() => {
        _reward();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [address, isConnected, reward]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleInvest = async () => {
    if (!isConnected) return toast.error("Please connect your wallet");
    if (amount < 50) {
      toast.error("Minimum investment is 50 USDT");
      return;
    }
    console.log("invest");
    setLoading(true);
    console.log(amount);

    try {
      const receipt = await invest(amount, inviter);
      console.log(receipt);
      setLoading(false);
      setChange(!chnage);
      toast.success("Done successful");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error(e.reason);
    }
  };

  const handleMax = () => {
    setAmount(balance);
  };

  useEffect(() => {
    const fetchNavData = () => {
      axios
        .get("https://presale-backend-nine.vercel.app/api/v1/getValues")
        .then((response) => {
          if (response.status === 200) {
            setNavdata(response.data?.data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchNavData();
  }, []);

  const handleWithdraw = async () => {
    if (!isConnected) return toast.error("Please connect your wallet");
    console.log("withdraw");
    setLoading(true);
    try {
      const receipt = await withdraw(withdrawAmount);
      console.log(receipt);
      setLoading(false);
      setChange(!chnage);
      toast("Done successful");
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast(e.reason);
    }
  };

  return (
    <>
      <MobileSideBar />
      <Layout navData={navData}>
        <div className="lg:ml-5 text-gray-100 my-6 flex flex-col gap-6 sm:mr-0 md:mr-6">
          <div className="grid md:grid-cols-[1fr_1fr] grid-cols-1 gap-6">
            <div className="flex flex-col gap-6">
              <Calculator />
            </div>
            {/* mkdfg */}
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex flex-row rounded-tl-[6px] rounded-tr-[6px] bg-[rgba(26,31,46,0.8)] sc-24cebd8a-0 faZbtb shadow-lg backdrop-blur-md border border-[rgba(0,255,136,0.2)]">
                  <button
                    className={`w-[50%] p-[10px] uppercase border-b-[1px] ${
                      activeTab === 1
                        ? "border-[#00FF88] text-[#00FF88]"
                        : "border-transparent text-[#9B9BA2]"
                    }`}
                    onClick={() => handleTabClick(1)}
                  >
                    Deposit
                  </button>
                  <button
                    className={`w-[50%] p-[10px] uppercase  ${
                      activeTab === 2
                        ? "border-b-[1px] text-[#00FF88] border-[#00FF88]"
                        : "border-transparent text-[#9B9BA2]"
                    }`}
                    onClick={() => handleTabClick(2)}
                  >
                    Withdraw
                  </button>
                </div>
                <div>
                  {activeTab === 1 && (
                    <div className="sc-23d25b86-0 hjnXua flex flex-col gap-[24px]">
                      <div className="flex flex-col gap-3">
                        <p className="grow-[1] text-[18px] text-[#9B9BA2]">
                          USDT BEP-20 BNB SMART CHAIN
                        </p>
                        <div className="flex w-full justify-between">
                          <div className="flex w-full flex-col items-start gap-[8px]">
                            <p className="text-[18px] text-[#9B9BA2]">
                              Available
                            </p>
                            <p className="text-[18px] text-[#00FF88]">
                              {Number(balance).toFixed(3)}
                            </p>
                          </div>

                          <div className="flex w-full flex-col items-end gap-[8px]">
                            <p className="text-[18px] text-[#9B9BA2]">
                              Deposited
                            </p>
                            <p className="text-[18px] text-[#00FF88]">
                              {investAmount}
                            </p>
                          </div>
                        </div>
                        {amount < 50 && (
                          <p className="text-[18px] text-red-500 ml-8">
                            Minimum investment is 50 USDT
                          </p>
                        )}
                        <div className="flex flex-row items-center gap-[16px]">
                          <img
                            alt="ETH"
                            loading="lazy"
                            width="40"
                            height="40"
                            src={Eth}
                          />

                          <label
                            data-domain=""
                            className="sc-a9e872e3-0 sc-a9e872e3-1 coKMcz dLmlyL"
                          >
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </label>
                          <button
                            className="sc-4142778f-2 dAmSWC"
                            onClick={handleMax}
                            style={{ color: "#00FF88" }}
                          >
                            MAX
                          </button>
                        </div>
                        <div className="flex flex-row items-center gap-[16px]">
                          <p style={{ color: "#00FF88" }}>Refferal</p>
                          <label
                            data-domain=""
                            className="sc-a9e872e3-0 sc-a9e872e3-1 coKMcz dLmlyL"
                          >
                            <input
                              type="text"
                              value={inviter}
                              onChange={(e) => setInviter(e.target.value)}
                            />
                          </label>
                        </div>
                      </div>
                      {/* <ul
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          textAlign: "left",
                          color: "red",
                          padding: "0 18px",
                        }}
                      >
                        <li>
                          * All deposits & withdrawls have a transaction fee
                          payable only in BNB Token equivalent to $1 USD
                        </li>
                        <li>
                          * Deposit Example: If depositing $50 USDT you will
                          need to have the following in your wallet.. $50 USDT $
                          0.0020 BNB ($1 USD)
                        </li>
                        <li>
                          * Withdrawal Example: If withdrawing $50 USDT you will
                          need to have the following in your wallet.. $ 0.0020
                          BNB ($1 USD)
                        </li>
                      </ul> */}
                      <button
                        scale="lg"
                        className="sc-4142778f-0 sc-4142778f-3 hbpQIt lmNGEv"
                        onClick={loading ? () => {} : handleInvest}
                        disabled={loading}
                      >
                        <p scale="lg" className="sc-4142778f-1 eePRrB">
                          {loading ? (
                            <ClipLoader
                              color={color}
                              loading={loading}
                              cssOverride={override}
                              size={45}
                              aria-label="Loading Spinner"
                              data-testid="loader"
                            />
                          ) : (
                            "Invest"
                          )}
                        </p>
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  {activeTab === 2 && (
                    <div className="sc-23d25b86-0 hjnXua flex flex-col gap-[24px]">
                      <div className="flex flex-col gap-[16px]">
                        <div className="flex flex-row">
                          <p className="grow-[1] text-[18px] text-[#9B9BA2]">
                            Withdraw
                          </p>
                          <p className="text-[18px] text-[#9B9BA2]">
                            Available:&nbsp;
                            <span className="text-[#00FF88]">
                              {(
                                Number(investAmount) + Number(myReward)
                              ).toFixed(5)}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-5 w-full">
                        <label
                          data-domain=""
                          className="sc-a9e872e3-0 sc-a9e872e3-1 coKMcz dLmlyL flex-3"
                        >
                          <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                          />
                        </label>
                        <button
                          scale="lg"
                          className=" hbpQIt flex-1"
                          onClick={loading ? () => {} : handleWithdraw}
                          disabled={loading}
                        >
                          <p scale="lg" className="sc-4142778f-1 eePRrB">
                            {loading ? (
                              <ClipLoader
                                color={color}
                                loading={loading}
                                cssOverride={override}
                                size={45}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                              />
                            ) : (
                              "Withdraw"
                            )}
                          </p>
                        </button>
                      </div>
                      {/* <ul
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                          textAlign: "left",
                          color: "red",
                          padding: "0 18px",
                        }}
                      >
                        <li>
                          * All deposits & withdrawls have a transaction fee
                          payable only in BNB Token equivalent to $1 USD
                        </li>
                        <li>
                          * Deposit Example: If depositing $50 USDT you will
                          need to have the following in your wallet.. $50 USDT $
                          0.0020 BNB ($1 USD)
                        </li>
                        <li>
                          * Withdrawal Example: If withdrawing $50 USDT you will
                          need to have the following in your wallet.. $ 0.0020
                          BNB ($1 USD)
                        </li>
                      </ul> */}
                      <hr className="sc-4ecb9fdc-0 eqALCG" />
                      <div className="flex flex-row">
                        <p className="grow-[1] text-[18px] text-[#9B9BA2]">
                          Withdrawal fee
                        </p>
                        <p className="text-[18px]">3%</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Referrals />
        </div>
      </Layout>
    </>
  );
};

export default Invest;
