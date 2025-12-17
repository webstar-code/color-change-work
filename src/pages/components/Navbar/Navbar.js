import React, { useEffect, useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import useContract from "../../../hooks/useContracts";
import axios from "axios";
import "./navbar.css";

const Navbar = ({ navData }) => {
  const [data, setData] = useState(null);

  // 4. Use modal hook
  const { open } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://sayo-profit.vercel.app/change-value")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  let lastItem = null;
  if (data && data.length > 0) {
    lastItem = data[data.length - 1];
  }

  return (
    <section className="lg:ml-6 ml-0">
      <div class="sc-8a51e25a-3 bclHhC mb-5 lg:border-none border-b lg:pb-0 pb-4">
        <div class="sc-8a51e25a-4 jIxhzv">
          <div class="sc-4b077879-0 iTowdi">
            <span class="sc-4b077879-1 iCyQuZ">
              <p class="whitespace-nowrap nav-gradient font-bold">
                Active users
              </p>
            </span>
            <span class="sc-4b077879-2 hEPdtl">
              <div class="flex items-center gap-[16px] pb-[5px] pl-[8px] pt-[5px] md:pb-0 md:pl-0 md:pt-0">
                <div color="blue" class="sc-4936f139-0 lgzvTq"></div>{" "}
                <p>{lastItem?.activeUsers}</p>
                <p>
                  {/* {investData ? investData.active_users : "-"} */}
                  {navData?.activeUsers}
                </p>
              </div>
            </span>
          </div>
          <div class="sc-4b077879-0 iTowdi">
            <span class="sc-4b077879-1 iCyQuZ">
              <p className="nav-gradient font-bold">Value staked</p>
            </span>
            <span class="sc-4b077879-2 hEPdtl">
              <div class="flex items-center gap-[16px] pl-0 md:pb-[5px] md:pl-[8px] md:pt-[5px]">
                <div color="green" class="sc-4936f139-0 kONphL"></div>
                <p class="whitespace-nowrap">
                  $
                  {/* {investData
                    ? Number(investData.total_invested).toFixed(3)
                    : "-"} */}
                  {lastItem?.valueStack}
                  {navData?.stakedValue}
                </p>
              </div>
            </span>
          </div>
        </div>
        {isConnected ? (
          <button class="sc-4142778f-0 hbpQIt connect-btn">
            <p
              class="sc-4142778f-1 eePRrB"
              onClick={() =>
                open({
                  view: "Account",
                })
              }
            >
              {address.substring(0, 6)}...
              {address.substring(address.length - 4)}
            </p>
          </button>
        ) : (
          <button class="sc-4142778f-0 hbpQIt connect-btn">
            <p
              class="sc-4142778f-1 eePRrB"
              onClick={() =>
                open({
                  view: "connect",
                })
              }
            >
              CONNECT WALLET
            </p>
          </button>
        )}
      </div>
    </section>
  );
};

export default Navbar;
