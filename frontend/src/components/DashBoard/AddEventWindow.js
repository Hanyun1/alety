import React, { useState } from "react";
import Close from "@material-ui/icons/Close";
import styled from "styled-components";
import {Button,FormInput} from "../SignUp/SignUpElement";
import {addNewEvent} from "./DBapi.js"
import { toast } from "react-toastify";
export const ModalStyle = styled.div`
  box-shadow: 0 5px 9px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  background-color: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(50px);
  padding: 2rem 1rem;
  width: 20rem;
  z-index: 10;
  position: fixed;
  top: 25vh;
  left: calc(50% - 10rem);
`;
export const Text = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`;
export const FormDiv = styled.div`
width: 100%;
height: 80%;
display: flex;
flex-direction: column;
justify-content: center;
justify-content: flex-end;
`
export const ButtonDiv = styled.div`
width:100%;
height: 20%;
display:flex;
flex-direction: row;
justify-content: center;

`
export function checkRequiredE(e){
  if(e.eventname===""){
    toast.warning("please enter your event name");
    return 0;
  }
  if(e.Address===""){
    toast.warning("please enter address");
    return 0;
  }
  if(e.eventTime==="TZ"){
    toast.warning("please enter your eventime");
    return 0;
  }
  return 1;

}
export function AddWindow(props) {
  const [eventname, setEventName] = useState("");
  const [address, setAddress] = useState("");
  const [remainder, setRemainder] = useState("");
  const [dueDate, setDate] = useState("");
  const [duetime, setTime] = useState("00:00");
  const [people, setPeople] = useState("");
  
  //function to close window
  function closeHandler() {
    props.onCancel();
  }
  //function to add new event
  function submitNew(){
    
    const newEvent = {
      email: localStorage.getItem("user"),
      eventname: eventname,
      Address: address,
      remainder: remainder,
      eventTime: dueDate+'T'+ duetime+'Z',
      peoplewith: people

    }
    if(checkRequiredE(newEvent)===0){
      return;
    }else{
      addNewEvent(newEvent);
      window.location = "/dashboard";
      toast.success("Add event successfully");
      return;
    }
  }

  

    return (
      <ModalStyle>
         <Close onClick={closeHandler}/>
        <Text>Add Your New Event</Text>
        <FormDiv>
        <FormInput
            type = "text"
            name = "eventname"
            value = {eventname}
            id = "EventName"
            placeholder = "EventName"
            onChange = {(event)=>{
              setEventName(event.target.value)
            }}
            />
        <FormInput
            type = "text"
            name = "address"
            value = {address}
            id = "Address"
            placeholder = "Address"
            onChange = {(event)=>{
              setAddress(event.target.value)
            }}
        />
         <FormInput
            type = "text"
            name = "remainder"
            value = {remainder}
            id = "Remainder"
            placeholder = "Remainder"
            onChange = {(event)=>{
              setRemainder(event.target.value)
            }}

        />
        <FormInput
            type = "text"
            name = "people"
            value = {people}
            id = "people"
            placeholder = "peoplewith"
            onChange = {(event)=>{
              setPeople(event.target.value)
            }}

        />
         <FormInput
            type = "date"
            name = "due date"
            value = {dueDate}
            id = "DueDate"
            placeholder = "DueDate"
            onChange = {(event)=>{
              setDate(event.target.value)
            }}

        />
        <FormInput
            type = "time"
            name = "time"
            value = {duetime}
            id = "duetime"
            placeholder = "time"
            onChange = {(event)=>{
              setTime(event.target.value)
            }}

        />
        <ButtonDiv>
        <Button type= "submit" style = {{position:"center"}} onClick = {submitNew}>Confirm</Button>
        </ButtonDiv>
        </FormDiv>
      </ModalStyle>
    );
  }
