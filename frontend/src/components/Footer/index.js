import React from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FooterLinkWrapper,
  FooterLinksItems,
  FooterLinkTitle,
  FooterLink,
  SocialLogo,
  SocialMediaWrap,
  SocialMedia,
  WebsiteRigts,
} from "./FooterElement";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinkWrapper>
            <FooterLinksItems>
              <FooterLink to="/aboutus">About Us</FooterLink>
              <FooterLink to="/signin">Sign In</FooterLink>
              <FooterLink to="/signup">Sign Up</FooterLink>
            </FooterLinksItems>
          </FooterLinkWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/" onClick={toggleHome}>
              Alety
            </SocialLogo>
            <WebsiteRigts>
              Alety ©{new Date().getFullYear()} All rights reserved.
            </WebsiteRigts>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  );
};

export default Footer;
