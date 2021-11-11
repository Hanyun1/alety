import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { AddCircleOutlineRounded, FilterListRounded } from "@material-ui/icons";
import { AddWindow } from "./AddEventWindow.js";
import { useEventsDetail } from "./DBapi.js";
import{BackAnime} from "../background/BackgroundAnime";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavBar from "./NavBar.js";
import { toast } from "react-toastify";
import {
  ShowAll,
  ShowStars,
  ShowToday,
  ShowThisMonth,
  ShowThisWeek,
  onlyToday,
} from "./SortFunc.js";
//dashboard style
export const DBContainer = styled.div`
  height: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(0deg, rgb(47, 49, 71) 0%, rgb(114, 119, 192) 35%, rgb(137, 199, 211) 100%);
`;

export const EventsContainer = styled.ul`
    position: absolute;
    width: 90%;
    display: flex;
    flex-direction: column;
    height: 80%;
    top: 15%;
    left:2%;
    justify-content:space-between
    text-align: center;
    
`;

const AddandFilter = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-content: flex-end;
`;
export const Load = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fde7f9;
  background: linear-gradient(0deg, rgb(47, 49, 71) 0%, rgb(114, 119, 192) 35%, rgb(137, 199, 211) 100%);
`;
const IconStyle = {
  color: "black",
  fontSize: 30,
};

//filter dropdown menu
const DropMenu = styled.div`
padding: 2rem 2rem
display:flex;
flex-direction: column;
width: 6rem;
position: fixed;
justify-content: space-between;
align-items: center;
border-radius: 5px;
z-index: 10;
background-color: rgba(0, 0, 0, 0.05);
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
backdrop-filter: blur(20px);
`;
const DropItem = styled.div`
  width: 100%;
  align-items: center;
  text-align: center;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;
const Bottom= styled.div`
margin-top :82.5vh;
width:100%;
height 4rem;
`

export default function dashBoard() {
  var noEvents = false;
  //get user  events
  const { loading, events, err } = useEventsDetail(
    localStorage.getItem("user")
  );
  //dropdown menu
  const [dropMenu, setMenuOpen] = useState(false);
  const [sortMethod, SetMethod] = useState("");
  function UseMethod(msg) {
    setMenuOpen(false);
    SetMethod(msg);
  }
  function Dropdown() {
    return (
      <DropMenu>
        <DropItem onClick={() => {UseMethod("All");}}>All</DropItem>
        <DropItem onClick={() => {UseMethod("Star");}}>Important</DropItem>
        <DropItem onClick={() => {UseMethod("Today");}}>Today</DropItem>
        <DropItem onClick={() => {UseMethod("Week");}}>This Week</DropItem>
        <DropItem onClick={() => {UseMethod("Month");}}>This Month</DropItem>
      </DropMenu>
    );
  }

  //fuctions to open adding event AddWindow
  const [eventWd, setWdIsOpen] = useState(false);
  function addNew() {
    setWdIsOpen(true);
  }
  function closeAddWindowHandler() {
    setWdIsOpen(false);
  }
  var firsturn = false;
  //for countdown
  var es = [];
  const CountDown = () => {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const today = new Date();
    const now = today.getTime();
    if(now%15!=0&&firsturn){
      return
    }
    es.forEach((e)=>{
      const countDate = Date.parse(e.eventTime);
      const gap = countDate - now;
      const minuteLeft = Math.floor((gap % hour) / minute);
      const secondLeft = Math.floor((gap % minute)/second);
      const name = e.eventname;
      console.log(minuteLeft)
      if (minuteLeft == 59) {
        toast.warning(name+" will end within 1 hour");
      }
      if (minuteLeft == 29) {
        toast.warning( name+" will end within 30 minutes");
      }
      if (minuteLeft == 14) {
        toast.warning( name+" will end within 15 minutes");
      }
      if (minuteLeft == 0 ) {
        toast.warning( name+" will end within 1 minutes");
      }

    })
  };
  if (loading) {
    return (
      <Load>
        <h1 style={{ color: "white" }}>Loading...</h1>
        <CircularProgress />
      </Load>
    );
  }
  if (err) {
    return (
      <Load>
        <h1 style={{ color: "white" }}>somthing went wrong, please try later</h1>
      </Load>
    );
  }
  if (events.length == 0) {
    noEvents = true;
    console.log(events);
  } else {
    es = events.filter(onlyToday);
    console.log(es);
    CountDown();
    firsturn=true
    setInterval(CountDown, (1000));
  }
  return (
    <DBContainer>
      <NavBar />
      <EventsContainer>
        <AddandFilter>
          <AddCircleOutlineRounded style={IconStyle} onClick={addNew} />
          <div>
          <FilterListRounded
            onClick={() => {
              setMenuOpen(!dropMenu);
            }}
          />
          {dropMenu && <Dropdown events={events} />}
          </div>
          {eventWd && (
            <AddWindow
              onCancel={closeAddWindowHandler}
            />
          )}
        </AddandFilter>
        {noEvents && <h1>nothing to do </h1>}
        {!noEvents && sortMethod == "" && <ShowAll events={events} />}
        {sortMethod == "All" && <ShowAll events={events} />}
        {sortMethod == "Star" && <ShowStars events={events} />}
        {sortMethod == "Today" && <ShowToday events={events} />}
        {sortMethod == "Week" && <ShowThisWeek events={events} />}
        {sortMethod == "Month" && <ShowThisMonth events={events} />}
        
      </EventsContainer>
      <BackAnime/>
      <Bottom/>
    </DBContainer>
  );
}
