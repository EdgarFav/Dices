import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";
declare let $;
import { ArsaContainer, ArsaFabButton } from "arsa";
import { ArsaHeader } from "../components/arsa-header/ArsaHeader";
import diceSound from "../assets/sounds/dice.mp3";

const Home: React.FC<any> = (props) => {
  const { t, i18n } = useTranslation();
  const [active,setActive] = useState(false);
  useEffect(() => {}, []);

  function dado(){
	  $('#platform').removeClass('stop').addClass('playing');
	  $('#dice');
    setActive(true);
    let myAudio = new Audio(diceSound);
    myAudio.play();
	  setTimeout(function(){
	    $('#platform').removeClass('playing').addClass('stop');
	    let number = Math.floor(Math.random() * 6) + 1;
	    let x = 0, y = 20, z = -20;
	    switch(number){
	        case 1:
	          x = 0; y = 20; z = -20;
	          break;
	        case 2:
	          x = -100; y = -150; z = 10; 
	          break;
	        case 3:
	          x = 0; y = -100; z = -10;
	          break;
	        case 4:
	          x = 0; y = 100; z = -10;
	          break;
	        case 5:
	          x = 80; y = 120; z = -10;
	          break;
	        case 6:
	          x = 0; y = 200; x = 10;
	          break;
	    }
	    
	    $('#dice').css({
	      'transform': 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)'
	    });
	    
	    $('#platform').css({
	      'transform': 'translate3d(0,0, 0px)'
	    });
	    
	    $('#result').html(number);
	    setActive(false);
	  }, 1120);
	};

  return (
    <>
      <ArsaHeader
        title={t("home.dices")}
        applyPadding={true}
        menuActive={false}
      />

      <ArsaContainer customId={"main-content"} applyPadding={true}>
        <section className="dadito">
          <div id="ui_dado">
            <div id="platform">
              <div id="dice">
                <div className="side front">
                  <div className="dot center"></div>
                </div>
                <div className="side front inner"></div>
                <div className="side top">
                  <div className="dot dtop dleft"></div>
                  <div className="dot dbottom dright"></div>
                </div>
                <div className="side top inner"></div>
                <div className="side right">
                  <div className="dot dtop dleft"></div>
                  <div className="dot center"></div>
                  <div className="dot dbottom dright"></div>
                </div>
                <div className="side right inner"></div>
                <div className="side left">
                  <div className="dot dtop dleft"></div>
                  <div className="dot dtop dright"></div>
                  <div className="dot dbottom dleft"></div>
                  <div className="dot dbottom dright"></div>
                </div>
                <div className="side left inner"></div>
                <div className="side bottom">
                  <div className="dot center"></div>
                  <div className="dot dtop dleft"></div>
                  <div className="dot dtop dright"></div>
                  <div className="dot dbottom dleft"></div>
                  <div className="dot dbottom dright"></div>
                </div>
                <div className="side bottom inner"></div>
                <div className="side back">
                  <div className="dot dtop dleft"></div>
                  <div className="dot dtop dright"></div>
                  <div className="dot dbottom dleft"></div>
                  <div className="dot dbottom dright"></div>
                  <div className="dot center dleft"></div>
                  <div className="dot center dright"></div>
                </div>
                <div className="side back inner"></div>
                <div className="side cover x"></div>
                <div className="side cover y"></div>
                <div className="side cover z"></div>
              </div>
            </div>
          </div>
        </section>
      </ArsaContainer>

      <ArsaFabButton
        extraClass="fb-createt"
        disabled={active}
        onClick={() => {
          dado(); 
        }}
      >
        <span className="material-icons">soap</span>
      </ArsaFabButton>
    </>
  );
};

export default Home;
