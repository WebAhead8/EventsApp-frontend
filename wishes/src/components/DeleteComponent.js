import React from "react";
import {deleteEvent} from "../Fetches/deleteEvent"
import {getMyEvents} from "../Fetches/getMyEvents"



function DeleteComponent({setDeleteChecked,eventId,setMyEvents,setEditEventClicked}) {
    
    const fetchEvents=()=>{
        getMyEvents(localStorage.getItem("user")).then(res=>res.json())
        .then(data=>{
            setMyEvents(data)
        })
    }

  return (
    <div className="delMainDiv">
     <p>
     are you sure you want to delete this event?
     </p>
     <p>
     every wishes for this event will be deleted.
     </p>
     <div>
         <button type="button" onClick={e=>{
             console.log(eventId)
deleteEvent(localStorage.getItem("user"),eventId)
.then(res => res.json())
.then(json => {console.log(json);
    setTimeout(function(){
        fetchEvents();
    setEditEventClicked(false)

     }, 1000);

}
    )
         }}>Delete</button>
         <button type="button"
         onClick={e=>{
            setDeleteChecked(false)
        }}
         >cancel</button>
     </div>
    </div>
  );
}

export default DeleteComponent;
