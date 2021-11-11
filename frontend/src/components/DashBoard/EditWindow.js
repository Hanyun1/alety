import React, { useState} from "react";
import Close from '@material-ui/icons/Close';

import {Button,FormInput} from "../SignUp/SignUpElement";
import {editEvent} from "./DBapi.js"
import { toast } from "react-toastify";
import {checkRequiredE, ModalStyle, Text, FormDiv, ButtonDiv } from "./AddEventWindow.js" 

export default function EditWindow(props) {
    const [eventname, setEventName] = useState(props.e.eventname);
    const [address, setAddress] = useState(props.e.Address);
    const [remainder, setRemainder] = useState(props.e.remainder);
    const [dueDate, setDate] = useState(props.e.eventTime.substring(0, 10));
    const [duetime, setTime] = useState(props.e.eventTime.substring(11, 16));
    
    //function to close window
    function closeHandler() {
      props.onCancel();
    }
    //function to add new event
    function submitNew(){
      const newEvent = {
        id: props.e._id,
        
        eventname: eventname,
        Address: address,
        remainder: remainder,
        eventTime: dueDate+'T'+ duetime+'Z',
        

      }
      if(checkRequiredE(newEvent)===0){
        return;
      }else{
        editEvent(newEvent);
        window.location = "/dashboard";
        toast.success("Add event successfully")
        return;
      }
      
    }
  
    
  
      return (
        <ModalStyle>
           <Close onClick={closeHandler}/>
          <Text>Change Your Event</Text>
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
          </FormDiv>
          <ButtonDiv >
          <Button type= "submit" onClick = {submitNew}>Confirm</Button>
          </ButtonDiv >
          
        </ModalStyle>
      );
    }