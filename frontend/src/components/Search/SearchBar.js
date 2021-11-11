import { KeyboardReturn } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import{StyledTextBox} from "../emaill/EmailElements"
const SearchContainer = styled.div`
height:100%;
width:100%;
display:flex;
flex-direction: column;
margin-top:75px;
`
const DropMenu = styled.div`
padding: 2rem 2rem
display:flex;
flex-direction: column;
width: 500px;
position: fixed;
justify-content: space-between;
align-items: center;
border-radius: 3px;
z-index: 10;
background-color: white;
box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
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
function getAllContacts(){
    const endPoint = "http://localhost:4000/api/user/contact/"+localStorage.getItem("user");
    

    return fetch(endPoint).then((res)=>res.json());
}

export function useEventsDetail(id){
    const [contacts, setContact]= useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getAllContacts()
        .then((contact)=>{
            setContact(contact);
            setLoading(false);
        })
        .catch((err)=>{
            setErr(err);
            setLoading(false);
            console.log(err)
        });
    },[])
    return {
        loading,
        contacts,
        err
    };
}
export function SearchBar(){
    const {loading, contacts, err} = useEventsDetail(localStorage.getItem("user"));
    const [searchTerm, setTerm] = useState("");
    if(loading){
        return <p>loading</p>
    }
    if(contacts==[]){
        console.log("?");
    }
    function findAll(val){
        if (val.fullname.toLowerCase().includes(searchTerm.toLowerCase())){
            return val;
        }
    }
    console.log(contacts);
    return(
        <SearchContainer>
        <StyledTextBox type = "text"
            placeholder = "Searching.."
            onChange = {(term)=>{setTerm(term.target.value)}}

        />
        <div>
        {searchTerm!=""&& 
        <DropMenu>
        {contacts.filter(findAll)
        .map((contact)=>{
            return(<DropItem key = {contact._id} onClick={()=>{window.location = "/email"}}>
                <p>{contact.fullname}</p>
                <p>{contact.emailAddress}</p>
                </DropItem>)
        })}
        </DropMenu>}
        </div>
        </SearchContainer>
    )
}