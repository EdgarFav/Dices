import React, { useEffect, useState } from "react";
import "./eight-ball.scss";
import { useTranslation } from "react-i18next";
import anverso from "../../assets/imgs/anverso.png";
import reverso from "../../assets/imgs/reverso.png";
import { ArsaContainer, ThemeService, useTheme, ArsaFabButton } from "arsa";
import { ArsaHeader } from "../../components/arsa-header/ArsaHeader";
import magicSound from "../../assets/sounds/magic.mp3";

const themeService: ThemeService = new ThemeService();

const EightBall: React.FC<any> = ({}) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [active,setActive] = useState(false);

  function activateMagic() {
    let myAudio = new Audio(magicSound);
    myAudio.play();
    setActive(true);
    let activateBallButton:any = document.getElementById("activate-ball-id");
    let textOuterCircle:any = document.getElementById("text-outer-circle-id");
    let newEightBallText:any = "";
    let ballText:any = document.getElementById("eightball-text-id");
    let randomNumber:any = Math.floor(Math.random() * 10);

    textOuterCircle.classList.remove("animate-ball");
    ballText.classList.remove("animate-text");

    void textOuterCircle.offsetWidth;
    void ballText.offsetWidth;

    textOuterCircle.classList.add("animate-ball");
    ballText.classList.add("animate-text");
    
    switch (randomNumber) {
      case 0:
        {
          newEightBallText = t("ball.1");//"It is certain.";
        }
        break;
      case 1:
        {
          newEightBallText = t("ball.2");//"It is decidedly so.";
        }
        break;
      case 2:
        {
          newEightBallText = t("ball.3");//"Without a doubt.";
        }
        break;
      case 3:
        {
          newEightBallText = t("ball.4");//"Yes - definitely.";
        }
        break;
      case 4:
        {
          newEightBallText = t("ball.5");//"You may rely on it.";
        }
        break;
      case 5:
        {
          newEightBallText = t("ball.6");//"As I see it, yes.";
        }
        break;
      case 6:
        {
          newEightBallText = t("ball.7");//"Most likely.";
        }
        break;
      case 7:
        {
          newEightBallText = t("ball.8");//"Outlook good.";
        }
        break;
      case 8:
        {
          newEightBallText = t("ball.9");//"Yes.";
        }
        break;
      case 9:
        {
          newEightBallText = t("ball.10");//"Signs point to yes.";
        }
        break;
      case 10:
        {
          newEightBallText = t("ball.11");//"Reply hazy, try again";
        }
        break;
      case 11:
        {
          newEightBallText = t("ball.12");//"Ask again later.";
        }
        break;
      case 12:
        {
          newEightBallText = t("ball.13");//"Better not tell you now.";
        }
        break;
      case 13:
        {
          newEightBallText = t("ball.14");//"Cannot predict now.";
        }
        break;
      case 14:
        {
          newEightBallText = t("ball.15");//"Concentrate and ask again.";
        }
        break;
      case 15:
        {
          newEightBallText = t("ball.16");//"Don't count on it.";
        }
        break;
      case 16:
        {
          newEightBallText = t("ball.17");//"My reply is no.";
        }
        break;
      case 17:
        {
          newEightBallText = t("ball.18");//"My sources say no.";
        }
        break;
      case 18:
        {
          newEightBallText = t("ball.19");//"Outlook not so good.";
        }
        break;
      case 19:
        {
          newEightBallText = t("ball.20");//"Very doubtful.";
        }
        break;
      default: {
        newEightBallText = t("ball.21");//"You need to try harder.";
      }
      setActive(false);
      myAudio.pause();
    }

    //created setTimeout function to delay until animation reaches approx. 55%
    setTimeout(doSomething, 1550);
    function doSomething() {
      let a:any = document.getElementById("eightball-text-id");
      a.innerHTML = newEightBallText;
      setActive(false);
    }
  }

  return (
    <>
      <ArsaHeader
        title={t("home.eight")}
        applyPadding={true}
        menuActive={false}
      />

      <ArsaContainer customId={"main-content"} applyPadding={true}>
        <section className="the-body">
          <p className="top-words">{t("ball.ask")}</p>
          <section className="eight-ball">
            <div className="outer-ball">
              <div id="text-outer-circle-id" className="text-outer-circle">
                <div className="text-circle">
                  <p className="eight-ball-text" id="eightball-text-id"></p>
                </div>
              </div>
            </div>
          </section>
        </section>
      </ArsaContainer>
      <ArsaFabButton
        extraClass="fb-createt"
        disabled={active}
        onClick={() => {
          activateMagic();
        }}
      >
        <span className="material-icons">help</span>
      </ArsaFabButton>
    </>
  );
};

export default EightBall;
