import axios from "axios";
import React, { useState } from "react";
import {
  EmailContainer,
  ContactBox,
  EmailBox,
  StyledTextBox,
  EmailTextBox,
} from "./EmailElements";
import {SearchBar} from "../Search/SearchBar"
import { Button, Container, LOGIUForm } from "../SignUp/SignUpElement";
import{BackAnime} from "../background/BackgroundAnime";

function EmailForm() {
  const url = "";
  const [data, setData] = useState({
    receipt: "",
    title: "",
    msg: "",
  });
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/email", {
        receipt: data.receipt,
        title: data.title,
        msg: data.msg,
      })
      .then((res) => {
        console.log(res.data);
      });
    window.location.replace("/email");
  }

  return (
    <EmailContainer>
      <ContactBox>
        <SearchBar/>
      </ContactBox>
      <EmailBox>
        <br />
        <br />
        <LOGIUForm onSubmit={(e) => submit(e)}>
          <Container>
            <h6>Receipents' Email Addresses</h6>
            <StyledTextBox
              onChange={(e) => handle(e)}
              id="receipt"
              value={data.receipt}
            ></StyledTextBox>
          </Container>
          <small id="emailHelp" class="form-text text-muted">
            Enter your receipents' email address above, including yours if you
            want to have a copy!
          </small>
          <small id="emailHelp" class="form-text text-muted">
            Seperated by a comma!
          </small>
          <br />
          <Container>
            <h6>Subject</h6>
            <StyledTextBox
              onChange={(e) => handle(e)}
              id="title"
              value={data.title}
            ></StyledTextBox>
          </Container>
          <br />
          <Container>
            <h6>Email Content</h6>
            <EmailTextBox
              onChange={(e) => handle(e)}
              id="msg"
              value={data.msg}
            ></EmailTextBox>
            </Container>
            <Button type="submit" value="Submit">
              Send Email
            </Button>
          
        </LOGIUForm>
      </EmailBox>
      <BackAnime/>
    </EmailContainer>
  );
}

export default EmailForm;
