import React from "react";
//import EventNoteIcon from "@mui/icons-material/EventNote";
//import PhoneIcon from "@mui/icons-material/Phone";
import {BiCalendarEvent} from "react-icons/bi";
import {Phone} from "@material-ui/icons";
import {
  EmailBarLi,
  EmailIconBtn,
  EmailBar,
  EmailBarUl,
} from "./EmailElements";

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
      <h1>Email Page</h1>
      <EmailBarUl>
        <NavItem
          icon={<BiCalendarEvent style={style} />}
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        />
        <NavItem
          icon={<Phone style={style} />}
          onClick={() => {
            window.location.href = "/contact";
          }}
        />
      </EmailBarUl>
    </EmailBar>
  );
}
