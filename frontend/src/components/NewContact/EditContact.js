import React, { useState} from "react";
import Close from '@material-ui/icons/Close';
import styled from "styled-components";
import {Button,FormInput} from "../SignUp/SignUpElement";
import {editContact} from "./ContactAPI.js"
import { toast } from "react-toastify";
import {ModalStyle} from "./AddContact"

const Text = styled.div`
text-align: center;
font-weight: bold;
font-size: 30px;
`;
const CheckBoxDiv = styled.div`
display:flex;
font-size: 20px;
flex-direction: row;
justify-content: space-between;
align-items: center;

`
export function checkRequired(contact){
  if(contact.fullname===""){
    toast.warning("Please enter the name");
    return 0;
  }
  if(contact.gender===""){
    toast.warning("Please enter the gender");
    return 0;
  }
  if(contact.emailAddress===""){
    toast.warning("Please enter the email");
    return 0;
  }
  if(contact.birtheday===""){
    toast.warning("Please enter the birthday");
    return 0;
  }
  return 1;
  
}
export default function EditWindow(props) {
    const [fullname, setName] = useState(props.c.fullname);
    const [email, setEmail] = useState(props.c.emailAddress);
    const [gender, setGender] = useState(props.c.gender);
    const [phoneNumber, setNumber] = useState(props.c.phoneNumber);
    const [birthday, setBirthday] = useState(props.c.birthday.split('T')[0]);
    const [description, setDescription] = useState(props.c.description);
    
    //function to close window
    function closeHandler() {
      props.onCancel();
    }
    //function to add new event
    function submitNew(){
      const newContact = {
        id: props.c._id,
        fullname: fullname,
        gender:gender,
        description:description,
        phoneNumber:phoneNumber,
        emailAddress:email,
        birthday:birthday
        

      }
      if(checkRequired(newContact)===0){
        return;
      }
      editContact(newContact);
      window.location = "/contact";
      toast.success("Edit contact  successfully!");   
    }
    
      return (
        <ModalStyle>
           <Close onClick={closeHandler}/>
          <Text>Edit Contact details</Text>
          <FormInput
              type = "text"
              name = "fullname"
              value = {fullname}
              id = "FullName"
              placeholder = "FullName"
              onChange = {(event)=>{
                setName(event.target.value)
              }}
              />
               <CheckBoxDiv>
         Description:
        <FormInput
            type = "checkbox"
            name = "Gender"
            value = {"Client"}
            id = "gender"
            placeholder = "Gender"
            onChange = {(event)=>{
            setDescription(event.target.value)
            }}
        />Client
        <FormInput
            type = "checkbox"
            name = "Gender"
            value = {"Friend"}
            id = "gender"
            placeholder = "Gender"
            onChange = {(event)=>{
            setDescription(event.target.value)
            }}
        />Friend
        <FormInput
            type = "checkbox"
            name = "Gender"
            value = {"Partner"}
            id = "gender"
            placeholder = "Gender"
            onChange = {(event)=>{
            setDescription(event.target.value)
            }}
        />Partner</CheckBoxDiv>
            <CheckBoxDiv>
          Gender:
        <FormInput
            type = "checkbox"
            name = "Gender"
            value = {"other"}
            id = "gender"
            placeholder = "Gender"
            onChange = {(event)=>{
              setGender(event.target.value)
            }}
        />Other
        <FormInput
            type = "checkbox"
            name = "Gender"
            value = {"woman"}
            id = "gender"
            placeholder = "Gender"
            onChange = {(event)=>{
              setGender(event.target.value)
            }}
        />Woman
        <FormInput
            type = "checkbox"
            name = "Gender"
            value = {"man"}
            id = "gender"
            placeholder = "Gender"
            onChange = {(event)=>{
              setGender(event.target.value)
            }}
        />Man</CheckBoxDiv>
          <FormInput
              type = "text"
              name = "email"
              value = {email}
              id = "email"
              placeholder = "Email"
              onChange = {(event)=>{
                setEmail(event.target.value)
              }}
          />
           <FormInput
            type = "string"
            name = "phoneNumber"
            value = {phoneNumber}
            id = "phoneNumber"
            placeholder = "phoneNumber"
            onChange = {(event)=>{
              setNumber(event.target.value)
            }}
        />
         <FormInput
            type = "date"
            name = "birtday"
            value = {birthday}
            id = "birthday"
            placeholder = "Birthday"
            onChange = {(event)=>{
              setBirthday(event.target.value)
            }}
        />
          <div>
          <Button type= "submit" onClick = {submitNew}>Confirm</Button>
          </div>
          
        </ModalStyle>
      );
    }