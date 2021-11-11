import React, { useState } from "react";
import { BackAnime } from "../background/BackgroundAnime";
import "./main.css";
import {useParams } from "react-router-dom";
import { DBContainer } from "../DashBoard/DBElement";
import ProfileNavBar from "../NewContact/ProfileNavBar";
import {useOneDetail} from "./ContactAPI";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Load} from "./CTElement.js"
import styled from "styled-components";
const Bottom= styled.div`
margin-top :50.5vh;
width:100%;
height 4rem;
`

const ContactDetail = () => {
 
  const { id } = useParams();
  const {loading, one, err} = useOneDetail(id);
  if(loading){
    return <Load><h1 style={{ color: "white" }}>Loading...</h1>
    <CircularProgress /></Load>
  }
  console.log(one);
 
  return (
    <DBContainer >
      <ProfileNavBar />     
      <div className="display-6 row justify-content-center">
        <label className="col-3 ">Name:</label>
        <div className="col-3">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            name="name"
            value={one.fullname}
          />
        </div>
      </div>
      <div className="display-6 row justify-content-center">
        <label className="col-3 ">Email:</label>
        <div className="col-3">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            Email="Email"
            value={one.emailAddress}
          />
        </div>
      </div>
      <div className="display-6 row justify-content-center">
        <label className="col-3 ">Number:</label>
        <div className="col-3">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            number="number"
            value={one.phoneNumber}
          />
        </div>
      </div>
      <div className="display-6 row justify-content-center">
        <label className="col-3 ">Gender:</label>
        <div className="col-3">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            gender="gender"
            value={one.gender}
          />
        </div>
      </div>
    
      <BackAnime />
      <Bottom/>
    </DBContainer>
  );
};

export default ContactDetail;
