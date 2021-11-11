import React, { useState } from "react";
import Close from "@material-ui/icons/Close";
import styled from "styled-components";
import {Button,FormInput} from "../SignUp/SignUpElement";
import {addContact} from "./ContactAPI.js"
import { checkRequired } from "./EditContact";
import "./task.css";
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
const Text = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`;
const FormDiv = styled.div`
width: 100%;
height: 80%;
display: flex;
flex-direction: column;
justify-content: center;
justify-content: flex-end;
`
const ButtonDiv = styled.div`
display:flex;
align-items:center;
`
const CheckBoxDiv = styled.div`
display:flex;
font-size: 20px;
flex-direction: row;
justify-content: space-between;
align-items: center;

`
export function AddWindow(props) {

    const [fullname, setName] = useState("");    
    const [gender, setGender] = useState("");
    const [phoneNumber, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("1998-10-07");
  
  //function to close window
  function closeHandler() {
    props.onConfirm();
  }
  //function to add new event
  function submitNew(){
    
        const newContact = {
          uid: localStorage.getItem("userid"),
          star: false,
          fullname: fullname,
          gender:gender,
          phoneNumber:phoneNumber,
          description:props.status,
          emailAddress:email,
          birthday:birthday
        };
    if(checkRequired(newContact)===0){
      return;
    }
    addContact(newContact); 
    toast.success("add contact  successfully!");  
    window.location = "/contact";
      
    }
 

    return (
      <ModalStyle>
         <Close onClick={closeHandler}/>
        <Text>Add {props.status} Contact</Text>
        <FormDiv>
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
       
       
        <ButtonDiv>
        <Button type= "submit" style = {{position:"center"}} onClick = {submitNew}>Confirm</Button>
        </ButtonDiv>
        </FormDiv>
      </ModalStyle>
    );
}