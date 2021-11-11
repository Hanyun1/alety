import axios from "axios"
import {useState, useEffect} from "react"

const baselink1 = "http://localhost:4000/api/user/"
const baselink2 = "http://localhost:4000/api/contact/"

// 1)get current user contacts
function getAllContacts(){
    const endPoint = baselink1+"contact/"+localStorage.getItem("user");
    return fetch(endPoint).then((res)=>res.json());
}

export function useContactsDetail(){
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

// 2) add one contact
export function addContact(newContact){
    const endPoint = baselink2+"create";
    return axios.post(endPoint, newContact).then((res)=>{
        

    })
}
// 3) edit selected contact
export function editContact(newc){
    const endPoint = baselink2+newc.id;
    return axios.put(endPoint, newc).then((res)=>{
        console.log(res)
    })
}

// 4) delete selected contacts
export function deleteContact(msg){
    const endPoint = baselink2+msg.id;
    return axios.delete(endPoint, msg).then((res)=>{
        console.log(res);
    })
}

// 5) get detail of selected contact
 export function getOneContact(id){
    const endPoint = baselink2+id;
    return fetch(endPoint).then((res)=>res.json());
    
}
export function useOneDetail(id){
    const [one, setOne]= useState([]);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        getOneContact(id)
        .then((c)=>{
            setOne(c);
            setLoading(false);
            console.log(c)
        })
        .catch((err)=>{
            setErr(err);
            setLoading(false);
            console.log(err)
        });
    },[])
    return {
        loading,
        one,
        err
    };
}