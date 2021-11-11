import React from "react";
import Email from "../components/emaill/index";
import EmailNavBar from "../components/emaill/EmailNavBar";
import styled from "styled-components";
import{BackAnime} from "../components/background/BackgroundAnime";
export const Container = styled.div`
  height:100vh;
  background: linear-gradient(0deg, rgb(47, 49, 71) 0%, rgb(114, 119, 192) 35%, rgb(137, 199, 211) 100%);
`;

export default function EmailPage() {
  return (
    <Container>
      <EmailNavBar />
      <Email />
      <BackAnime/>
    </Container>
  );
}
