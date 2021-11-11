import React from "react";
//import EventNoteIcon from "@mui/icons-material/EventNote";
//import PhoneIcon from "@mui/icons-material/Phone";
import { ExitToApp } from "@material-ui/icons";
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
      <h1>Profile</h1>
      <EmailBarUl>
      <NavItem icon={<ExitToApp style={style} />} 
        onClick={() => {
            window.location.href = "/contact";
          }}
      />
      </EmailBarUl>
    </EmailBar>
  );
}
