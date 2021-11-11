import React from "react";
import OneEvent from "./OneEvent.js";

const date = new Date();
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = String(date.getFullYear());
const today = year + "-" + month + "-" + day;
const lastSunday = date.getDate() - date.getDay();

export function ShowAll(props) {
  if(props.events.length==0){
    return <h1>nothing to do </h1>
  }
  const sortedE = sortByStar(props.events);
  return <OneEvent sortedEvents={sortedE} />;
}
export function ShowStars(props) {
  function onlyStar(e) {
    console.log(today);
    return e.star == true;
  }
  const sortedE = sortBytimeDescd(props.events.filter(onlyStar));
  if (sortedE.length != 0) {
    return <OneEvent sortedEvents={sortedE} />;
  } else {
    return <h1>no important events</h1>;
  }
}
export function ShowToday(props) {
 
  const sortedE = sortByStar(props.events.filter(onlyToday));
  if (sortedE.length != 0) {
    return <OneEvent sortedEvents={sortedE} />;
  } else {
    return <h1>no events for today</h1>;
  }
}
export function onlyToday(e) {
  console.log(e.eventTime.substring(5, 7));
  return e.eventTime.substring(0, 10) === today;
}

export function ShowThisWeek(props) {
  const thisWeek=[];
  for (var i = 1; i <= 7; i++) {
    var newDay = new Date(date.setDate(lastSunday + i))
      .toISOString()
      .slice(0, 10);
    thisWeek.push(String(newDay));
  }
  function onlyThisWeek(e) {
    for (let i in thisWeek) {
      if (e.eventTime.substring(0, 10) === thisWeek[i]) {
        return true;
      }
    }
    return false;
  }
  const sortedE = sortByStar(props.events.filter(onlyThisWeek));
  if (sortedE.length != 0) {
    return <OneEvent sortedEvents={sortedE} />;
  } else {
    return <h1>no events for this week</h1>;
  }
}

export function ShowThisMonth(props) {
  function onlyThisMonth(e) {
    return e.eventTime.substring(5, 7) === month;
  }
  const sortedE = sortByStar(props.events.filter(onlyThisMonth));
  if (sortedE.length != 0) {
    return <OneEvent sortedEvents={sortedE} />;
  } else {
    return <h1>no events for this month</h1>;
  }
}

//sort events in time descending sequence
function sortBytimeDescd(events) {
  return events.sort((a, b) =>
    a.eventTime < b.eventTime ? -1 : a.eventTime < b.eventTime ? 1 : 0
  );
}
//sort events by star
function sortByStar(events) {
  return sortBytimeDescd(events).sort((a, b) => (a.star == true ? -1 : b.star == true ? 1 : 0));
}

