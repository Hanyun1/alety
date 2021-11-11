import styled from "styled-components";

export const EmailBar = styled.nav`
  height: 80px;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0 1rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const EmailBarUl = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
export const EmailBarLi = styled.li`
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const EmailIconBtn = styled.a`
  width: 45px;
  height: 45px;
  fill: #dadce1;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  padding: 5px;
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 500ms;
  cursor: pointer;
  &:hover {
    filter: brightness(1.5);
  }
`;
export const EmailMenuItem = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  transition: 500ms;
  padding: 0.5rem;
  &:hover {
    filter: brightness(1.5);
  }
`;

export const EmailContainer = styled.div`
  height: 80%;
  display: flex;
`;

export const ContactBox = styled.div`
  flex: 3;
  margin-left: 10%;
`;

export const EmailBox = styled.div`
  flex: 7;
`;

export const StyledTextBox = styled.textarea`
  width: 500px;
  height: 40px;
  border: black;
  margin: 0.5rem 0;
  font-size: 20px;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 0 2rem;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const EmailTextBox = styled.textarea`
  width: 500px;
  height: 200px;
  border: black;
  margin: 0.5rem 0;
  background-color: #f5f5f5;
  box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 0 2rem;
  transition: all 0.2s ease-in;

  &:hover {
    transform: translateY(-5px);
  }
`;
