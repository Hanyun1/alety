import React, { useState, useContext, useEffect } from "react";
import{BackAnime} from "../background/BackgroundAnime";
import AuthContext from "../../auth/authContext";
import {
  Button,
  Main,
  Container,
  Status,
  StyledInput,
  LOGIUIcon,
  LOGIUForm,
  LOGIUContainer,
  LOGIUFromContent,
  LOGIUFormWrap,
} from "./SignUpElement";
import "bootstrap/dist/css/bootstrap.min.css";

import PasswordStrengthMeter from "./PasswordStrengthMeter";

const SignUp = (props) => {
  const authContext = useContext(AuthContext);

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      // redirect to home page if the user registers correctly
      localStorage.setItem("user", user.emailAddress);
      props.history.push("/dashboard");
    }

    if (error === "User already exists") {
      alert("User Already Registered!");
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    username: "",
    emailAddress: "",
    password: "",
    password2: "",
  });

  const { username, emailAddress, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === "" || emailAddress === "" || password === "") {
      alert("Please enter all fields");
    } else if (password !== password2) {
      alert("Password not the same!");
    } else {
      register({
        username,
        emailAddress,
        password,
      });
    }
  };

  return (
    <>
      <LOGIUContainer>
        <LOGIUFormWrap>
          <LOGIUFromContent>
            <LOGIUForm onSubmit={onSubmit}>
              {/* Form Title */}
              <h1 className="display-2 ">Sign Up Your Account</h1>
              {/* Enter User Name */}
              <Container>
                <StyledInput
                  type="text"
                  name="username"
                  value={username}
                  onChange={onChange}
                  placeholder="User Name"
                  required
                  autocomplete="off"
                />
                <Status />
              </Container>
              <Container>
                {/* Enter Email Address */}
                <StyledInput
                  type="email"
                  name="emailAddress"
                  value={emailAddress}
                  onChange={onChange}
                  placeholder="Email Address"
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
                {/* Enter Password */}
                <StyledInput
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="password"
                  required
                  autocomplete="off"
                />
                <Status />
                Checking your password complexity
                <br />
                <PasswordStrengthMeter password={password} />
              </Container>

              <Container>
                {/* Confirm the Password */}
                <StyledInput
                  type="password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  placeholder="Confirm Password"
                  required
                  autocomplete="off"
                />
                <Status />
              </Container>

              <Button type="submit" value="Submit">
                Submit
              </Button>
            </LOGIUForm>
          </LOGIUFromContent>
          <Main>
            <LOGIUIcon to="/">Alety</LOGIUIcon>
          </Main>
        </LOGIUFormWrap>
        <BackAnime/>
      </LOGIUContainer>
    </>
  );
};

export default SignUp;
