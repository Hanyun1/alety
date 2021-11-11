import styled from "styled-components";
import { Link } from "react-router-dom";


export const LOGIUContainer = styled.div`
background:#eefcff;
position: absolute;
top:0;
left:0;
bottom:0;
right:0;
);
`;

export const LOGIUFormWrap = styled.div`
background: linear-gradient(0deg, rgb(47, 49, 71) 0%, rgb(114, 119, 192) 35%, rgb(137, 199, 211) 100%);
background-position: center;
background-size: cover;
background-repeat: no-repeat;
width: 100%;
height: 100%;
display: flex;
}
`;

export const LOGIUIcon = styled(Link)`
color: rgba(23,0,0,0.96);
width:70%;
height:80%;
font-weight: 500;
font-size: 220px;
display:flex;
justify-content: center;
align-items: center;

@media screen and (max-width: 480px) {
  margin-left: 90px;
  margin-top: 90px;
}
`;

export const LOGIUFromContent = styled.div`
min-width: 50%;
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
height: 100%
padding: 0 2rem;
`;

export const LOGIUForm = styled.form`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items: center;
  h3 {
    color:#000000
    margin-bottom: 2rem;
  }
`;

export const StyledInput = styled.input`
  width: 80%;
  max-width: 500px;
  min-width: 400px;
  height: 60px;
  border: none;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
  border-radius: 14px;
  padding: 0 1rem;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-3px);

  }
`;

export const Container = styled.div`
  diaplay: flex;
  justify-content: center;
  align-items: center;
`;

export const Status = styled.div`
  height: 10px;
  width:10px;
  background: #9d9d9d;
  border-radius:10px;
  margin-left: 1rem;

  ${StyledInput}:focus + & {
    background:#ffa689;
  }

  ${StyledInput}:invalid + & {
    background:#F50E0E;
  }

  ${StyledInput}:valid + & {
    background:#70edb9;
  }
`;

export const Main = styled.div`
  width:100%;
  height:100%
  display:flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size:65px;
    font-weight；900;
    color: #343434;

    @media (max-width: 900px){
      display: none;
    }
  }
`;

export const Button = styled.button`
  width:75%;
  max-width: 400px;
  min-width: 300px;
  height: 60px;
  border: none;
  margin: 1rem 0;
  box-shadow: 0px 14px 9px -15px rgba(0,0,0,0.25);
  border-radius: 14px;
  background-color: #3298E2;
  color:#fff;
  font-weight:60%;
  cursor:pointer;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-3px);

  }
`;




export const Icon = styled(Link)`
  margin-left: 32px;
  margin-top: 32px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  font-size: 60px;

  @media screen and (max-width: 480px) {
    margin-left: 16px;
    margin-top: 8px;
  }
`;


export const FormButton = styled.button`
  background: #01bf71;
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
`;




