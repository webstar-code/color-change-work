import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "./referrals.css";
import useContract from "../../hooks/useContracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Referrals = () => {
  const [referral, setReferral] = useState(null);

  const [myRef, setMyRef] = useState(null);
  const [copy, setCopy] = useState(false);
  const [level, setLevel] = useState(0);
  const [chnage, setChange] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#008080");

  const { myReferral, getReferralLevel, claimReferralRewards } = useContract();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    const _referral = async () => {
      if (isConnected) {
        try {
          // const ref = await myReferral(address);
          // console.log(ref);
          // setReferral(ref);
          // const level = await getReferralLevel(address);
          // setLevel(level);
        } catch (err) {
          console.log("Error fetching referral data:", err);
          // Set default values if user has no referral data yet
          setReferral({
            level: 0,
            reward_all_time: 0,
            reward: 0,
            refer_persons: 0,
          });
          setLevel(0);
        }
      }
    };
    _referral();
  }, [address, chnage]);

  // make my ref with address + url
  useEffect(() => {
    if (address) {
      // const get url
      let url = window.location.href;
      // remove /referrals from url
      url = url.replace("/referrals", "");
      const ref = `${address}`;
      setMyRef(ref);
    }
  }, [address]);

  const handleCopyRef = () => {
    navigator.clipboard.writeText(myRef);
    setCopy(true);
  };

  const handleCLaim = async () => {
    if (!isConnected) return toast.error("Please connect your wallet");
    setLoading(true);

    try {
      const res = await claimReferralRewards();
      console.log(res);
      toast.success("Claimed successfully");
    } catch (e) {
      console.log(e);
      toast.error("Error claiming rewards");
      setLoading(false);
    }
  };
  return (
    <div className="lg:ml-6">
      <div className="sc-b34d32a8-0 gGjWEI ">
        <div className="sc-b34d32a8-1 IEDuw">
          <div class="sc-b34d32a8-2 izBjId">
            <div class="sc-b34d32a8-3 fpXvEA __className_18663b">
              Referral rewards
            </div>
            <p class="sc-b34d32a8-4 iBmuNm">
              Invite someone with your referral link and earn 10%, 5% and 1% of
              your referral’s daily profits up to three levels.
            </p>
            {/* <button scale="lg" class="sc-4142778f-0 hbpQIt">
                <p scale="lg" class="sc-4142778f-1 eePRrB">
                  <a target="_blank" href="/">
                    KNOW MORE
                  </a>
                </p>
              </button> */}
          </div>
          <div className="hPkaII">
            {/* <div class="sc-995918ed-5 dlQWRi">
                <div class="sc-995918ed-0 sc-995918ed-3 kLMfbJ cIKxLG">
                  <div class="sc-995918ed-1 dDpolt"></div>
                  <div class="sc-995918ed-1 jmGTBd"></div>
                </div>
                <div class="sc-995918ed-2 gInJTp">
                  <div class="sc-b34d32a8-6 grjaPy">
                    <p>Level</p>
                    <p>{referral ? Number(level) : "_"}</p>
                  </div>
                </div>
                <div class="sc-995918ed-0 sc-995918ed-4 kLMfbJ leUcmd">
                  <div class="sc-995918ed-1 gFTLcQ"></div>
                  <div class="sc-995918ed-1 lmWtGY"></div>
                </div>
              </div> */}
            <div class="sc-995918ed-5 dlQWRi">
              <div class="sc-995918ed-0 sc-995918ed-3 kLMfbJ cIKxLG">
                <div class="sc-995918ed-1 dDpolt"></div>
                <div class="sc-995918ed-1 jmGTBd"></div>
              </div>
              <div class="sc-995918ed-2 gInJTp">
                <div class="sc-b34d32a8-6 grjaPy">
                  <p>Referrals</p>
                  <p>{referral ? Number(referral.refer_persons) : "_"}</p>
                </div>
              </div>
              <div class="sc-995918ed-0 sc-995918ed-4 kLMfbJ leUcmd">
                <div class="sc-995918ed-1 gFTLcQ"></div>
                <div class="sc-995918ed-1 lmWtGY"></div>
              </div>
            </div>
            {/* <div class="sc-995918ed-5 dlQWRi">
                <div class="sc-995918ed-0 sc-995918ed-3 kLMfbJ cIKxLG">
                  <div class="sc-995918ed-1 dDpolt"></div>
                  <div class="sc-995918ed-1 jmGTBd"></div>
                </div>
                <div class="sc-995918ed-2 gInJTp">
                  <div class="sc-b34d32a8-6 grjaPy">
                    <p>Their deposit</p>
                    <p>
                      {referral
                        ? Number(referral.total_deposits) / 10 ** 18
                        : "_"}
                    </p>
                  </div>
                </div>
                <div class="sc-995918ed-0 sc-995918ed-4 kLMfbJ leUcmd">
                  <div class="sc-995918ed-1 gFTLcQ"></div>
                  <div class="sc-995918ed-1 lmWtGY"></div>
                </div>
              </div> */}
            <div class="sc-995918ed-5 dlQWRi">
              <div class="sc-995918ed-0 sc-995918ed-3 kLMfbJ cIKxLG">
                <div class="sc-995918ed-1 dDpolt"></div>
                <div class="sc-995918ed-1 jmGTBd"></div>
              </div>
              <div class="sc-995918ed-2 gInJTp">
                <div class="sc-b34d32a8-6 grjaPy">
                  <p>Your profit</p>
                  <p>
                    {referral
                      ? Number(referral.reward_all_time) / 10 ** 18
                      : "_"}
                  </p>
                </div>
              </div>
              <div class="sc-995918ed-0 sc-995918ed-4 kLMfbJ leUcmd">
                <div class="sc-995918ed-1 gFTLcQ"></div>
                <div class="sc-995918ed-1 lmWtGY"></div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="sc-b34d32a8-1 sc-b34d32a8-11 IEDuw jXQZaI"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div class="sc-b34d32a8-7 kiqJSt">
            <div class="sc-b34d32a8-8 jGcWAi">
              <div class="sc-b34d32a8-3 fpXvEA __className_18663b">
                Total referral rewards
              </div>
              <p class="sc-b34d32a8-9 dCcjnL">
                {referral ? Number(referral.reward) / 10 ** 18 : "_"} USDT
              </p>
            </div>
            {/* <button scale="lg" class="sc-4142778f-0 hbpQIt">
                <p scale="lg" class="sc-4142778f-1 eePRrB">
                  <a target="_blank" href="/">
                    REFERRAL GUIDE
                  </a>
                </p>
              </button> */}
          </div>
          <div class="sc-b34d32a8-10 eNJvsB">
            <div class="flex max-w-[280px] items-center gap-[8px]">
              <input
                readonly=""
                class="sc-b34d32a8-12 eQkJa-d w-[80%]"
                value={myRef}
                id="referLink"
              />
              <button class="sc-b34d32a8-13 ilKPxf" onClick={handleCopyRef}>
                {copy ? "Copied" : "Copy"}
              </button>
            </div>
            <button
              scale="lg"
              disabled=""
              class="sc-4142778f-0 hbpQIt"
              onClick={handleCLaim}
            >
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
                <p scale="lg" class="sc-4142778f-1 eePRrB">
                  CLAIM REFERRAL REWARDS
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
