import React from "react";
import * as NavStyle from "./NavBarElemt";
import { AiTwotoneMail } from "react-icons/ai";
import { Phone, AccountCircleRounded, ExitToApp } from "@material-ui/icons";
import { getUserDetail } from "./DBapi.js";
import { Load } from "./DBElement";
import CircularProgress from "@material-ui/core/CircularProgress";

const style = {
  color: "black",
  fontSize: 40,
  position: "relative",
};

export default function Navbar() {
  const { loading, detail, error } = getUserDetail(
    localStorage.getItem("user")
  );
  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }
  if (loading) {
    return (
      <Load>
        <h1 style={{ color: "white" }}>Almost there</h1>
        <CircularProgress />
      </Load>
    );
  }
  localStorage.setItem("userid", detail._id);
  return (
    <NavStyle.Bar>
      <h1>welcome Back, {detail.username}</h1>
      <NavStyle.BarUl>
        <NavItem
          icon={<Phone style={style} />}
          onClick={() => {
            window.location.href = "/contact";
          }}
        />
        <NavItem
          icon={<AiTwotoneMail style={style} />}
          onClick={() => {
            window.location.href = "/email";
          }}
        />
        <NavItem icon={<ExitToApp style={style} />} onClick={logout} />
      </NavStyle.BarUl>
    </NavStyle.Bar>
  );
}
function NavItem(props) {
  return (
    <NavStyle.BarLi>
      <NavStyle.IconBtn onClick={props.onClick}>{props.icon}</NavStyle.IconBtn>
    </NavStyle.BarLi>
  );
}
