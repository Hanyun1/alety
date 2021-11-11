import React from "react";
import styled from "styled-components";
import { useState } from "react";
import {Delete} from "@material-ui/icons";
import {BiEdit} from "react-icons/bi"
import {AiFillStar} from "react-icons/ai"
import { deleteEvent, starEvent } from "./DBapi.js";
import EditWindow from "./EditWindow";
import { toast } from "react-toastify";

export const SingleEvent = styled.div`
  padding: 16px;
  border-radius: 5px;
  width: 90%;
  display: flex;
  margin: 5px auto;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(4px);
  &:hover {
    -webkit-transform: scale(1.03);
  transform: scale(1.03);
  -webkit-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
  }
`;
const Event = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
width: 15%;
align-items: center;
`;
const Text = styled.h5`
fontSize: "10%";
`;
const Star = styled(AiFillStar)`
color: rgba(0, 0, 0, 0.5);
font-size: 1.75rem;
transition: ease background-color 250ms;
  &:hover {
    color:#fce043;
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`
const ReversedStar = styled(AiFillStar)`
color: #fce043;
font-size: 1.75rem;
transition: ease background-color 250ms;
  &:hover {
    color:rgba(0, 0, 0, 0.5);
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`
const IconStyle = {
  color: "black",
  fontSize: 30,
};
//event text function
function EventText(props){
    return(
      <TextContainer>
        <Text>{props.text}</Text>
      </TextContainer>
    )
}
export default function OneEvent(props){
    //open and close edit AddWindow
    const[editWd, setEditOpen] = useState(null);
    function editEvent(event){
      setEditOpen(event);
      
    }
    function closeEditWD(){
      setEditOpen(null);
    }
  
    //delete event function
    function deleteE(id) {
      const deleteMsg = {
        email: localStorage.getItem("user"),
        id: id,
      };
      deleteEvent(deleteMsg);
      window.location = "/dashboard";
      toast.error("delete successfully")
      return;
    }
    //set this event important(star)
    function eventStar(event){
      const msg = {
        id: event._id,
        data:{
          star: !event.star
        }
      }
      starEvent(msg);
      window.location = "/dashboard";
      return;
    }
    return(
      props.sortedEvents.map((event) => {
        return (
          <Event key={event._id}>
            {!event.star && <Star onClick = {()=>{eventStar(event)}}/>}
            {event.star && <ReversedStar onClick = {()=>{eventStar(event)}}/>}
            <SingleEvent>
              <EventText text = {event.eventname}/>
              <EventText
                text = {event.eventTime.substring(0, 10)+" "+
                event.eventTime.substring(11, 16)}
              />
              <EventText text = {event.peoplewith}/>
              <EventText text = {event.Address}/>
              <EventText text = {event.remainder}/>
            </SingleEvent>
            <BiEdit style={IconStyle} onClick={()=>{editEvent(event)}}/>
            {editWd!==null && (<EditWindow e = {editWd} onCancel = {closeEditWD}/>)}
            <Delete style={IconStyle} onClick={() => deleteE(event._id)} />
          </Event>
        );
      }))
      
  }
  