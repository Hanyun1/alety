import "./statusLine.css";
import { AddWindow } from "./AddContact.js";
import { useState } from "react";
import "./task.css"
import { deleteContact } from "./ContactAPI.js";
import EditWindow from "./EditContact.js";
import { Link } from "react-router-dom";
import {BiEdit} from "react-icons/bi"
import { toast } from "react-toastify";
import {Delete} from "@material-ui/icons";

const IconStyle = {
  color: "black",
  fontSize: 30,
};
export default function StatusLine(props) {
  const {status, contact, setId} =props;
  const [eventWd, setWdIsOpen] = useState(false);
  const [editWin, SetEditOpen] = useState(null);
  const collapsed =true;
  function addNew() {
    setWdIsOpen(true);
  }
  function closeWindowHandler() {
    setWdIsOpen(false);
  }
  function deleteOne(id){
    const msg = {
        id: id,
        uid: localStorage.getItem("userid")
    };
    deleteContact(msg);
    window.location="/contact";
    toast.error("delete successfully")
}
const handleChange = (e) => {
  setId(e.target.value);
};
  return (
    <div className="statusLine">
      
      <h2>{status}</h2>
      {contact.map((c)=>{
        return (
          <div className={`task ${collapsed ? "collapsedTask" : ""}`}>
          <form  className={collapsed ? "collapsed" : ""} key = {c._id}>
          <input type="checkbox" value={c._id} onChange={handleChange} />
          <input
          type="text"
          className="title input"
          name="title"
          placeholder="Enter Name"
          disabled={collapsed}
          defaultValue={c.fullname}
        />
       
           
            <Link to={`/profile/${c._id}`} className="btn btn-xs">
                View
            </Link>
            <BiEdit style={IconStyle} onClick={()=>{SetEditOpen(c)}}/>
          <Delete style={IconStyle} onClick = {()=>{deleteOne(c._id)}}/>
         </form>
         </div>

        );
      })}
      {editWin!=null && <EditWindow c = {editWin}  onCancel={()=>{SetEditOpen(null);}}/>}

      <button onClick={addNew} className="button addTask">
        +
      </button>
      {eventWd && (
            <AddWindow
              status = {status}
              onCancel={closeWindowHandler}
              onConfirm={closeWindowHandler}
            />
          )}
      
    </div>
  );
}
