import React, { useEffect, useState } from "react";
import "./head-tails.scss";
import { useTranslation } from "react-i18next";
import anverso from "../../assets/imgs/anverso.png";
import reverso from "../../assets/imgs/reverso.png";
import { ArsaContainer, ThemeService, useTheme, ArsaFabButton } from "arsa";
import { ArsaHeader } from "../../components/arsa-header/ArsaHeader";
import coinSound from "../../assets/sounds/coin.mp3";

const themeService: ThemeService = new ThemeService();

const HeadTails: React.FC<any> = ({}) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();

  const [myAudio, setAudio] = useState(new Audio(coinSound));

  const [allVariables, setAllVariables] = useState({
    imgHead: null,
    imgTail: null,
    btnHeads: null,
    btnTails: null,
    divResult: null,
    divBalance: null,
    divDebugInfo: null,
    balance: null,
    coinState: null,
    result: "heads",
    chosen: "heads",
    headClass: "coin-heads",
    tailClass: "coin-tails",
    betUnit: 25,
    debug: false,
    debugText: "",
    iter: 0,
    edges: 0,
    heads: 0,
    tails: 0,
    correctGuesses: 0,
    wrongGuesses: 0,
    lowBalance: null,
    highBalance: null,
  });

  const resetValues = () => {
    let nValue = {
      imgHead: null,
      imgTail: null,
      btnHeads: null,
      btnTails: null,
      divResult: null,
      divBalance: null,
      divDebugInfo: null,
      balance: null,
      coinState: null,
      result: "heads",
      chosen: "heads",
      headClass: "coin-heads",
      tailClass: "coin-tails",
      betUnit: 25,
      debug: false,
      debugText: "",
      iter: 0,
      edges: 0,
      heads: 0,
      tails: 0,
      correctGuesses: 0,
      wrongGuesses: 0,
      lowBalance: null,
      highBalance: null,
    };
    setAllVariables((pre) => ({ ...pre, ...nValue }));

    init();
  };

  const init = (flipper: boolean = true) => {
    //const document.getElementById = document.getElementById.bind(document);
    //console.log(document.getElementById);

    let all: any = { ...allVariables };

    let value = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    all.imgHead = document.getElementById(all.headClass);
    all.imgTail = document.getElementById(all.tailClass);
    /* all.divResult = document.getElementById("div-result");
    all.divBalance = document.getElementById("div-balance"); */
    all.divDebugInfo = document.getElementById("div-debuginfo");

    all.balance = 2500;
    all.coinState = "stopped";
    //all.divBalance.innerHTML = all.balance;

    setAllVariables((pre) => ({ ...pre, ...all }));
    if (flipper) {
      flip(value == 1 ? "heads" : "tails");
    }
  };

  useEffect(() => {
    init(false);
  }, []);

  const serverGetRandomByte = (callback) => {
    let val = randomIntInc(0, 255); // mimic NodeJS' `crypto.randomBytes(1)`
    let duration = randomIntInc(1, 3);
    setTimeout(() => {
      callback(val);
    }, 1000 * duration);
  };

  // Returns a random number in range [low,high]; that is, both ends of the range are inclusive
  const randomIntInc = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
  };

  const flip = (p) => {
    let all: any = { ...allVariables };
    all.chosen = p;
    all.coinState = "stopped";
    setAllVariables((pre) => ({ ...pre, ...all }));

    startSpinning(all);
  };

  const updateResult = () => {
    let all: any = { ...allVariables };

    if (all.debug) {
      all.divDebugInfo.innerHTML = all.debugText;
    } else {
      all.divDebugInfo.innerHTML = "";
    }
    setAllVariables((pre) => ({ ...pre, ...all }));
  };

  const startSpinning = (alli) => {
    let all: any = { ...alli };
    myAudio.loop = true;
    myAudio.play();
    if (all.coinState === "spinning") return;

    all.coinState = "spinning";
    all.balance = all.balance - all.betUnit;

    all.result = "?";
    updateResult();

    all.imgHead.classList.add(all.headClass);
    all.imgTail.classList.add(all.tailClass);
    all.imgHead.style.display = all.imgTail.style.display = "block";
    setAllVariables((pre) => ({ ...pre, ...all }));
    serverGetRandomByte(stopSpinning);
  };

  const stopSpinning = (val) => {
    let all: any = { ...allVariables };
    //if (all.coinState === "stopped") return;
    all.coinState = "stopped";
    setAllVariables((pre) => ({ ...pre, ...all }));
    all.imgHead.classList.remove(all.headClass);
    all.imgTail.classList.remove(all.tailClass);
    myAudio.pause();
    if (val % 51 === 0) {
      /* The coin landed on edge; This is also the house-edge. */
      all.result = "edge";
    } else if (val % 2 === 0) {
      all.result = "heads";
    } else {
      all.result = "tails";
    }

    if (all.result === "edge") {
      all.imgTail.style.display = "none";
      all.imgHead.style.display = "none";
    } else if (all.result === "heads") {
      all.imgTail.style.display = "none";
    } else {
      all.imgHead.style.display = "none";
    }
    setAllVariables((pre) => ({ ...pre, ...all }));
    // Debugging code
    if (all.debug) {
      all.iter = all.iter + 1;
      if (all.balance < all.lowBalance) all.lowBalance = all.balance;
      if (all.balance > all.highBalance) all.highBalance = all.balance;

      if (all.result === "edge") all.edges = all.edges + 1;
      else if (all.result === "heads") all.heads = all.heads + 1;
      else if (all.result === "tails") all.tails = all.tails + 1;

      if (all.result === all.chosen)
        all.correctGuesses = all.correctGuesses + 1;
      else all.wrongGuesses = all.wrongGuesses + 1;

      all.debugText =
        `<table id='debuginfo'>` +
        `<tr><td>Random value</td><td>${val}</td></tr>` +
        `<tr><td>Total flips</td><td>${all.iter}</td></tr>` +
        `<tr><td>Landed on edge</td><td>${all.edges}</td></tr>` +
        `<tr><td>Landed on heads</td><td>${all.heads}</td></tr>` +
        `<tr><td>Landed on tails</td><td>${all.tails}</td></tr>` +
        `<tr><td>Correct guesses</td><td>${all.correctGuesses}</td></tr>` +
        `<tr><td>Wrong guesses</td><td>${all.wrongGuesses}</td></tr>` +
        `<tr><td>Low balance</td><td>${all.lowBalance}</td></tr>` +
        `<tr><td>High balance</td><td>${all.highBalance}</td></tr>` +
        `</table>`;
      setAllVariables((pre) => ({ ...pre, ...all }));
      updateResult();
    }
  };

  return (
    <>
      <ArsaHeader
        title={t("home.flip")}
        applyPadding={true}
        menuActive={false}
        
      />

      <ArsaContainer customId={"main-content"} applyPadding={true}>
        <section className="menedete">
          <div className="coin-flip">
            <div
              id="coin-tails"
              style={{
                display: "none",
              }}
            >
              <img src={anverso} />
            </div>
            <div id="coin-heads">
              <img src={reverso} />
            </div>
          </div>


          <div id="div-debuginfo"></div>
        </section>
      </ArsaContainer>
      <ArsaFabButton
        extraClass="fb-createt"
        disabled={allVariables.coinState == 'spinning'}
        onClick={() => {
          resetValues(); 
        }}
      >
        <span className="material-icons">currency_exchange</span>
      </ArsaFabButton>
    </>
  );
};

export default HeadTails;
