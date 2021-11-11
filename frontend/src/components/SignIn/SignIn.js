import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../auth/authContext";
import{BackAnime} from "../background/BackgroundAnime";
import {
  Container,
  Status,
  StyledInput,
  Main,
  Button,
  LOGIUIcon,
  LOGIUForm,
  LOGIUFromContent,
  LOGIUFormWrap,
  LOGIUContainer,
} from "../SignUp/SignUpElement";

const signIn = (props) => {
  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to home page if the user registers correctly
      localStorage.setItem("user", user.emailAddress);
      props.history.push("/dashboard");
    }

    if (error === "Invalid Credentials") {
      alert("Information entered incorrectly. Try again!");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    emailAddress: "",
    password: "",
  });

  const { emailAddress, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (emailAddress === "") {
      alert("Please enter your email address.");
    } else if (password === "") {
      alert("Please enter your password.");
    } else {
      login({
        emailAddress,
        password,
      });
    }
  };

  return (
    // <SigninDiv>
    <LOGIUContainer>
      <LOGIUFormWrap>
        <LOGIUFromContent>
          <LOGIUForm onSubmit={onSubmit}>
            <h1 className="display-2 text-shadow ">I'm Ready to ROLL IN 👾</h1>
            <Container>
              <StyledInput
                type="email"
                name="emailAddress"
                value={emailAddress}
                onChange={onChange}
                placeholder="Enter email address here"
                required
                autocomplete="off"
              />
              <Status />
            </Container>
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            <br />
            <Container>
              <StyledInput
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter password here"
                required
                autocomplete="off"
              />
              <Status />
            </Container>
            <br />
            <Button type="submit" value="Login">
              Login
            </Button>
          </LOGIUForm>
        </LOGIUFromContent>
        <Main>
          <LOGIUIcon to="/">Alety</LOGIUIcon>
        </Main>
      </LOGIUFormWrap>
      <BackAnime/>
    </LOGIUContainer>
  );
};
export default signIn;
