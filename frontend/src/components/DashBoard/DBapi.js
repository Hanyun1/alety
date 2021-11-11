import axios from "axios"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const baseLink = "http://localhost:4000/api/event/"

// 1) add new event to event database
export function addNewEvent(newEvent){
    const endPoint = baseLink+"create"
  
    axios
        .post(endPoint,newEvent)
        .then((response) => {
         
        }); 
  
}

// 2) get all events of current user
function getAllEvent(id){
    const endPoint = "http://localhost:4000/api/user/events/"+id;
    return fetch(endPoint).then((res)=>res.json());
}

export function useEventsDetail(id){
    const [events, setEvent]= useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getAllEvent(id)
        .then((event)=>{
            setEvent(event);
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
        events,
        err
    };
}

//3) delete one event
export function deleteEvent(msg){
    const endPoint = baseLink +'delete/'+msg.email+'/'+msg.id;
    return axios.delete(endPoint,msg).then((res)=>res.json());
}
// 4) edit event
export function editEvent(msg){
    const endPoint = baseLink + "update/"+msg.id;
    if(!msg){
        alert("you didn't input anything");
        return;
    }
    axios
    .put(endPoint, msg)
    .then((res) => {
        if(response.status===200){
            toast.success("edit event successfully")
        }
      });
}
// 5) set one event important
export function starEvent(msg){
    const endPoint = baseLink + "starevent/"+msg.id;
    axios.post(endPoint, msg.data)
    .then(()=>{
        console.log("successfully set the star")
    });
}
// 6) get user details(for personal profile)
function getUser(email){
    const endPoint = "http://localhost:4000/api/user/" + email;
    return fetch(endPoint).then((res) => res.json());
    
}

export function getUserDetail(email){
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const [error, setError] = useState(null);
    useEffect(()=>{
        getUser(email)
        .then((user)=>{
            setDetail(user);
            setLoading(false);
        })
        .catch((err)=>{
            setError(err);
            setLoading(false);
        });
    },[]);

    return{
        loading,
        detail,
        error
    };
}

