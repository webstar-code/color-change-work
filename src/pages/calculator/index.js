// import './App.css'
import React from "react";
import { useEffect, useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [stakingAmount, setStakingAmount] = useState("");
  const [stakingPeriod, setStakingPeriod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [profitPercentage, setProfitPercentage] = useState(0);
  const [profit, setProfit] = useState(0);
  const [compoundEarnings, setCompoundEarnings] = useState(false);

  useEffect(() => {
    if (stakingAmount < 50) {
      setTotalPrice(stakingAmount);
      setProfit(0);
      setProfitPercentage(0);
    } else if (stakingAmount >= 50 && stakingAmount <= 250) {
      setProfitPercentage(0.5);

      if (stakingPeriod !== "") {
        if (compoundEarnings) {
          const initialValue = Number(stakingAmount);
          const stakPeriod = Number(stakingPeriod);

          const earningComputed =
            initialValue * (1 + 0.01 / 365) ** (365 * stakPeriod) -
            initialValue;

          console.log(earningComputed);
          if (!(stakPeriod <= 0 && stakPeriod === 1)) {
            setProfit(earningComputed);
            // setProfit(profitBefore + Number("0.0" + earningComputed.toFixed(0)));
          }
          setTotalPrice(Number(stakingAmount) + Number(profit));
        } else {
          setProfit((Number(stakingAmount) / 100) * 1 * Number(stakingPeriod));
          setTotalPrice(Number(stakingAmount) + Number(profit));
        }
      } else {
        setProfit(0);
        setTotalPrice(Number(stakingAmount) + Number(profit));
      }
    } else {
      setProfitPercentage(0.7);
      if (stakingPeriod !== "") {
        if (compoundEarnings) {
          const initialValue = Number(stakingAmount);
          const stakPeriod = Number(stakingPeriod);

          const earningComputed =
            initialValue * (1 + 0.01 / 365) ** (365 * stakPeriod) -
            initialValue;

          console.log(earningComputed);
          if (!(stakPeriod <= 0 && stakPeriod === 1)) {
            setProfit(earningComputed);
            // setProfit(profitBefore + Number("0.0" + earningComputed.toFixed(0)));
          }
          setTotalPrice(Number(stakingAmount) + Number(profit));
        } else {
          setProfit((Number(stakingAmount) / 100) * 1 * Number(stakingPeriod));
          setTotalPrice(Number(stakingAmount) + Number(profit));
        }
      } else {
        setProfit(0);
        setTotalPrice(Number(stakingAmount) + Number(profit));
      }
    }
  }, [
    stakingAmount,
    setStakingAmount,
    stakingPeriod,
    setStakingPeriod,
    profitPercentage,
    setProfitPercentage,
    profit,
    setProfit,
    compoundEarnings,
  ]);

  return (
    <>
      <div
        className="flex flex-1 flex-col w-full"
        style={{
          opacity: 1,
          transform: "none",
          transformOrigin: "50% 50% 0px",
        }}
      >
        <div className="sc-775649ad-0 boPYWi ">
          <div className="w-full">
            <div className="sc-995918ed-5 dlQWRi">
              <div className="sc-995918ed-0 sc-995918ed-3 kLMfbJ cIKxLG">
                <div className="sc-995918ed-1 dDpolt"></div>
                <div className="sc-995918ed-1 jmGTBd"></div>
              </div>
              <div className="sc-995918ed-2 gInJTp">
                <div className="sc-775649ad-1 ilctLY">
                  <p className="sc-775649ad-2 text-[#E6E6E6] font-bold dWKnCr __className_18663b">
                    PROFIT CALCULATOR
                  </p>
                  <p className="sc-775649ad-3 gFBEDS">
                    Calculate your total estimated earning by staking into our
                    protocol.
                  </p>
                  {/* <div className="sc-775649ad-8 sc-775649ad-9 cireXO hanueK">
                    <div
                      onClick={() => setYourPlan(!yourPlan)}
                      className="flex w-[100%] flex-row items-center justify-between"
                    >
                      <p className="sc-775649ad-10 sc-775649ad-12 gCHftc ldfGRW">
                        Your plan
                      </p>
                      <p className="sc-775649ad-11 sc-775649ad-13 vglXQ bVmQys">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="10"
                          viewBox="0 0 12 10"
                          fill="none"
                        >
                          <path
                            d="M6 0.5L11.1962 9.5H0.803848L6 0.5Z"
                            fill="white"
                          ></path>
                        </svg>
                      </p>
                    </div>
                    {yourPlan && (
                      <p className="gCHftc text-gray-800">
                        {stakingAmount <= 250
                          ? "Not chosen"
                          : "Opportunistic Credit Fund"}
                      </p>
                    )}
                  </div> */}
                  <div className="sc-775649ad-4 dHekQR">
                    <label data-domain="USDT" className="sc-a9e872e3-0 coKMcz">
                      <input
                        type="number"
                        placeholder="Staking amount"
                        onChange={(e) => setStakingAmount(e.target.value)}
                        value={stakingAmount}
                      />
                    </label>
                    <div className="flex items-center gap-[16px]">
                      <button
                        className="sc-775649ad-5 bVbQPz"
                        onClick={() =>
                          setStakingAmount((prev) => Number(prev) + 1)
                        }
                      >
                        +1
                      </button>
                      <button
                        className="sc-775649ad-5 bVbQPz"
                        onClick={() =>
                          setStakingAmount((prev) => Number(prev) + 5)
                        }
                      >
                        +5
                      </button>
                      <button
                        className="sc-775649ad-5 bVbQPz"
                        onClick={() =>
                          setStakingAmount((prev) => Number(prev) + 10)
                        }
                      >
                        +10
                      </button>
                    </div>
                  </div>
                  <div className="sc-775649ad-4 dHekQR">
                    <label data-domain="DAYS" className="sc-a9e872e3-0 coKMcz">
                      <input
                        type="number"
                        placeholder="Staking period"
                        onChange={(e) => setStakingPeriod(e.target.value)}
                        value={stakingPeriod}
                      />
                    </label>
                    <div className="flex items-center gap-[16px]">
                      <button
                        className="sc-775649ad-5 bVbQPz"
                        onClick={() =>
                          setStakingPeriod((prev) => Number(prev) + 1)
                        }
                      >
                        +1
                      </button>
                      <button
                        className="sc-775649ad-5 bVbQPz"
                        onClick={() =>
                          setStakingPeriod((prev) => Number(prev) + 5)
                        }
                      >
                        +5
                      </button>
                      <button
                        className="sc-775649ad-5 bVbQPz"
                        onClick={() =>
                          setStakingPeriod((prev) => Number(prev) + 10)
                        }
                      >
                        +10
                      </button>
                    </div>
                  </div>
                  <div className="sc-775649ad-6 ZumKC"></div>
                  <div className="sc-775649ad-7 bKRIoQ">
                    <div className="sc-775649ad-8 cireXO">
                      <p className="sc-775649ad-10 gCHftc">Profit</p>
                      <p className="sc-775649ad-11 vglXQ">
                        +{profit.toFixed(2)}USDT
                      </p>
                    </div>
                    <div className="sc-775649ad-8 cireXO">
                      <p className="sc-775649ad-10 gCHftc">Period</p>
                      <p className="sc-775649ad-11 vglXQ">
                        {stakingPeriod} DAYS
                      </p>
                    </div>
                    <div className="sc-775649ad-8 cireXO">
                      <p className="sc-775649ad-10 gCHftc">Profit percentage</p>
                      <p className="sc-775649ad-11 vglXQ">
                        {/* {profitPercentage}% */}
                        1%
                      </p>
                    </div>
                    <div className="sc-775649ad-8 cireXO">
                      <p className="sc-775649ad-10 gCHftc">Total balance</p>
                      <p className="sc-775649ad-11 vglXQ">
                        {Number(totalPrice).toFixed(2) || "0.00"} USDT
                      </p>
                    </div>
                  </div>
                  <div className="sc-775649ad-8 cireXO w-full">
                    <p className="sc-775649ad-10 gCHftc">Withdrawal fee</p>
                    <p className="sc-775649ad-11 vglXQ">3%</p>
                  </div>
                  <div className="sc-775649ad-14 fzmcJj">
                    <label className="sc-9f2cedd1-1 gNveQs">
                      <input
                        type="checkbox"
                        onClick={() => setCompoundEarnings(!compoundEarnings)}
                      />
                      <span className="sc-9f2cedd1-0 ekXOcI"></span>
                    </label>
                    <p>Compound earnings</p>
                  </div>
                </div>
              </div>
              <div className="sc-995918ed-0 sc-995918ed-4 kLMfbJ leUcmd">
                <div className="sc-995918ed-1 gFTLcQ"></div>
                <div className="sc-995918ed-1 lmWtGY"></div>
              </div>
              <div className="sc-995918ed-6 vOLPD"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Calculator);
