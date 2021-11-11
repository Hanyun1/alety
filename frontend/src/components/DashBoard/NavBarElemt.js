import styled from "styled-components";

export const Bar = styled.nav`
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
export const BarUl = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
export const BarLi = styled.li`
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const IconBtn = styled.a`
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
export const MenuItem = styled.a`
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
