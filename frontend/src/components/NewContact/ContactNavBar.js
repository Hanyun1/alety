import React from "react";
//import EventNoteIcon from "@mui/icons-material/EventNote";
//import PhoneIcon from "@mui/icons-material/Phone";
import { AiTwotoneMail } from "react-icons/ai";
import { BiCalendarEvent } from "react-icons/bi";
import {
  EmailBarLi,
  EmailIconBtn,
  EmailBar,
  EmailBarUl,
} from "../emaill/EmailElements";

function NavItem(props) {
  return (
    <EmailBarLi>
      <EmailIconBtn onClick={props.onClick}>{props.icon}</EmailIconBtn>
    </EmailBarLi>
  );
}
const style = {
  color: "black",
  fontSize: 40,
  position: "relative",
};

export default function EmailNavBar() {
  return (
    <EmailBar>
      <h1>Contact List</h1>
      <EmailBarUl>
        <NavItem
          icon={<BiCalendarEvent style={style} />}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        />
        <NavItem
          icon={<AiTwotoneMail style={style} />}
          onClick={() => {
            window.location.href = "/email";
          }}
        />
      </EmailBarUl>
    </EmailBar>
  );
}
