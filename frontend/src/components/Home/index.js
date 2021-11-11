import React, { useState } from "react";
import Video from "../../videos/Homepage1.mp4";
import {
  HeroContainer,
  HeroBackground,
  VideoBackground,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HomeElement";
import { SUButton } from "../ButtonElement";

const Introduction = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id="home">
      <HeroBackground>
        <VideoBackground
          autoPlay
          loop
          muted
          src={Video}
          type="video/mp4"
        ></VideoBackground>
      </HeroBackground>
      <HeroContent>
        <HeroH1>Life is Better with Friends</HeroH1>
        <HeroP>
          Alety personal CRM connects you with your friends closer, in simple
          and efficient ways
        </HeroP>
        <HeroBtnWrapper>
          <SUButton
            to="/signup"
            inMouseEnter={onHover}
            onMouseLeave={hover}
            primary="true"
            dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            {" "}
            Sign Up {hover ? <ArrowForward /> : <ArrowRight />}
          </SUButton>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default Introduction;
