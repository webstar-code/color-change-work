import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import LogoWebsite from "../../../assets/logo-white.jpg";

// import Icons from "../../../assets/home.0bf542fa.svg"

const Sidebar = () => {
  return (
    <div className="h-full text-gray-800 fixed mr-10 ">
      <div class="sc-8a51e25a-1 iwULQu">
        <div class="sc-dfe9a692-0 cykrde">
          <div class="sc-995918ed-5 dlQWRi" style={{ width: "273px" }}>
            <div class="sc-995918ed-0 sc-995918ed-3 kLMfbJ cIKxLG">
              <div class="sc-995918ed-1 dDpolt"></div>
              <div class="sc-995918ed-1 jmGTBd"></div>
            </div>
            <div class="sc-995918ed-2 gInJTp " style={{ borderRadius: "4px" }}>
              <div className="flex  items-center gap-3 crTtFs">
                <div>
                  <img
                    src={LogoWebsite}
                    alt="Logo"
                    className="h-20 w-20 m-4 rounded-full shadow-xl"
                  />
                  <br />
                  <p style={{ color: "#008080", fontWeight: "bold" }}>
                    Sayo Profits
                  </p>
                </div>
              </div>
              <div class="sc-dfe9a692-2 jeiPlC">
                <div class="sc-dfe9a692-3 dBqzSf">
                  <div class="sc-7e209e53-1 jujpfO mt-4 pt-6 ">
                    <div className="flex flex-col gap-5 w-full p-2 text-xl ">
                      <Link
                        to="/"
                        className="iCDohZ"
                        style={{
                          textAlign: "left",
                          height: "auto",
                          width: "100%",
                        }}
                      >
                        <button
                          scale="lg"
                          class="sc-4142778f-0 sc-4142778f-3 hbpQIt lmNGEv"
                        >
                          <p
                            style={{ fontSize: "14px" }}
                            scale="lg"
                            class="sc-4142778f-1 eePRrB"
                          >
                            ENERGY GROWTH PAMM FUND
                          </p>
                        </button>
                      </Link>

                      <Link
                        to="https://teller-usd.gitbook.io/sayoprofits/"
                        className="iCDohZ"
                        style={{
                          textAlign: "left",
                          height: "auto",
                          width: "100%",
                        }}
                      >
                        <button
                          scale="lg"
                          class="sc-4142778f-0 sc-4142778f-3 hbpQIt lmNGEv"
                        >
                          <p scale="lg" class="sc-4142778f-1 w-full eePRrB">
                            WHITEPAPER
                          </p>
                        </button>
                      </Link>
                      <Link
                        to="https://x.com/SayoProfits?t=sAR8HlJuPLov8wRvU2CxEA&s=08"
                        className="iCDohZ"
                        style={{
                          textAlign: "left",
                          height: "auto",
                          width: "100%",
                        }}
                      >
                        <button
                          scale="lg"
                          class="sc-4142778f-0 sc-4142778f-3 hbpQIt lmNGEv"
                        >
                          <p scale="lg" class="sc-4142778f-1 eePRrB">
                            TWITTER
                          </p>
                        </button>
                      </Link>
                      <Link
                        to="https://t.me/SayoProfits"
                        className="iCDohZ"
                        style={{
                          textAlign: "left",
                          height: "auto",
                          width: "100%",
                        }}
                      >
                        <button
                          scale="lg"
                          class="sc-4142778f-0 sc-4142778f-3 hbpQIt lmNGEv"
                        >
                          <p scale="lg" class="sc-4142778f-1 eePRrB">
                            TELEGRAM
                          </p>
                        </button>
                      </Link>
                      <Link
                        to="https://youtube.com/@SayoProfits"
                        className="iCDohZ"
                        style={{
                          textAlign: "left",
                          height: "auto",
                          width: "100%",
                        }}
                      >
                        <button
                          scale="lg"
                          class="sc-4142778f-0 sc-4142778f-3 hbpQIt lmNGEv"
                          style={{ textAlign: "left" }}
                        >
                          <p scale="lg" class="sc-4142778f-1 eePRrB">
                            YOUTUBE
                          </p>
                        </button>
                      </Link>
                      {/* <Link
                        to="https://www.instagram.com/sayoprofits"
                        className="iCDohZ"
                        style={{
                          textAlign: "left",
                          height: "auto",
                          width: "100%",
                        }}
                      >
                        <button
                          scale="lg"
                          class="sc-4142778f-0 sc-4142778f-3 hbpQIt lmNGEv"
                          style={{ textAlign: "left" }}
                        >
                          <p scale="lg" class="sc-4142778f-1 eePRrB">
                            INSTAGRAM
                          </p>
                        </button>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="sc-995918ed-0 sc-995918ed-4 kLMfbJ leUcmd">
              <div class="sc-995918ed-1 gFTLcQ"></div>
              <div class="sc-995918ed-1 lmWtGY"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
