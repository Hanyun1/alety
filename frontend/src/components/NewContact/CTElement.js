import React, { useState, useEffect, useRef } from "react";
import "./main.css";
import styled from "styled-components";
import { useContactsDetail, deleteContact } from "./ContactAPI.js";
import{BackAnime} from "../background/BackgroundAnime";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavBar from "./ContactNavBar";
import StatusLine from "./StatusLine";
import { DBContainer } from "../DashBoard/DBElement";
import { toast } from "react-toastify";


export const Load = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fde7f9;
  background: linear-gradient(0deg, rgb(47, 49, 71) 0%, rgb(114, 119, 192) 35%, rgb(137, 199, 211) 100%);
`;
const Bottom= styled.div`
margin-top :65.5vh;
width:100%;
height 4rem;
`

export default function contact() {
  var noEvents = false;
  const { loading, contacts, err } = useContactsDetail(
    localStorage.getItem("user")
  );
  const [ids, setId] = useState();
  const arrRef = useRef({ arr: [] });
  useEffect(() => {
    arrRef.current.arr.push(ids);
  }, [ids]);
  function handleClick(){
    console.log(arrRef.current.arr);
    for(var i =1; i<arrRef.current.arr.length;i++){
      if(i!==0){
        const msg = {
          id: arrRef.current.arr[i],
          uid: localStorage.getItem("userid")
      };
      deleteContact(msg);
      }
    }
    window.location="/contact";
    toast.error("delete successfully")
      
  }
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
 
  // filter function to get different status array 
  var ClientContact = contacts.filter((c)=>{
    return c.description === "Client"
  });
  var FriendContact =  contacts.filter((c)=>{
    return c.description === "Friend"
  });
  var ParterContact = contacts.filter((c)=>{
    return c.description === "Partner" 
  })
  return (
    <DBContainer>
      <NavBar />
      <main>
        <section>
        <StatusLine                       
        status="Client"
        contact = {ClientContact}
        setId={setId}
        />
        <StatusLine                       
        status="Friend" 
        contact = {FriendContact} 
        setId={setId}          
        />
        <StatusLine                       
        status="Partner"
        contact = {ParterContact}
        setId={setId}
        />   
        </section>
        
      </main>
      <button className="button delete" onClick={handleClick}>
        Delete Seleted
      </button>
      <BackAnime/>
      <Bottom/>
    </DBContainer>
  );
}
