import React from "react"
import Navbar from "./NavBar"
import EditIcon from '@material-ui/icons/Edit';
import "../Style/MyEvents.css"
import { useHistory } from "react-router-dom";
import {getMyEvents} from "../Fetches/getMyEvents"
import { Spinner } from "react-bootstrap";
import { Visibility } from "@material-ui/icons";
import EditEvent from "./EditEvents";


function MyEvents (props)
{
    const [eventTitle,setEventTitle]=React.useState("DSD");
    const [eventDate,setEventDate]=React.useState("25/06/1997");
    const [eventLocation,setEventLocation]=React.useState("");
    const [eventDescription,setEventDescription]=React.useState("");
    const [eventId,seteventId]=React.useState("");
    const [editEventClicked,setEditEventClicked]=React.useState(false);

  const history = useHistory();
  const [myEvents,setMyEvents]=React.useState([]);
  const [eventsFound,setEventsFound]=React.useState(false);
  const [loading,setLoading]=React.useState(true);
  const [eventsToRender,setEventsToRender]=React.useState(true);

React.useEffect(()=>{
if(!localStorage.getItem("user"))
{
history.push("/")
}else{
    getMyEvents(localStorage.getItem("user")).then(res=>res.json())
    .then(data=>{
        setLoading(false)
       if(!data.status)
       {
           setEventsFound(true)
           setMyEvents(data);


       }else{
           setEventsFound(false);
       }
    })           
    .catch(error=>{
        console.log(error)
    })


}
},[])

React.useEffect(()=>{
    const arr=myEvents.map(event=>{
        return (
         <div className="eventDiv" key={event._id} >
         <div className="editIcon">
<span onClick={e=>{
             history.push(history.push("/events/"+event._id))
         }}>
<Visibility/>
</span>

             <span onClick={e=>{
            setEditEventClicked(true)
             setEventTitle(event.title)
             setEventDate(event.date)
             setEventLocation(event.location)
             setEventDescription(event.description)
             seteventId(event._id)
         }}><EditIcon className=""/>
         </span>
         </div>

         <div className="eventInformationDiv">
           <div id="info">
             <label className="eventLabel">{event.title}</label>
             <label className="eventLabel">{event.location}</label>
             <label className="eventLabel">{event.date}</label>
           </div>
 
           <div id="eventPhoto">
             <img
               alt=""
               src="https://wallpaperaccess.com/full/1552186.jpg"
             />
           </div>
         </div>
 
         <div className="divDescription">
           <p>
             {event.description}
           </p>
         </div>
       </div>
 
         
        )
    })
    setEventsToRender(arr);
},[myEvents])

if(loading)
{
    return(
        <div className="myEventsMainDiv">
            <Navbar />
            <div className="spinner">
            <Spinner animation="grow" /><Spinner animation="grow" /><Spinner animation="grow" />
            <Spinner animation="grow" /><Spinner animation="grow" /><Spinner animation="grow" />
            <Spinner animation="grow" /><Spinner animation="grow" /><Spinner animation="grow" />
        </div>
        </div>
    )
}

if(!eventsFound)
{
    return(
    <div className="myEventsMainDiv">

            <Navbar/>
            <div className="eventDiv">

    <div className="divDescription">
      <p>You Have No Events</p>
</div>
  </div>
  </div>
)
}

    return (
        <div className="myEventsMainDiv">
            {
                editEventClicked?
            
        <EditEvent 
        eventTitle={eventTitle}
        setEventDate={setEventDate}
        eventLocation={eventLocation}
        setEventLocation={setEventLocation}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        eventDate={eventDate}
        setEventTitle={setEventTitle}
        eventId={eventId}
        setEditEventClicked={setEditEventClicked}
        setMyEvents={setMyEvents}
        />
        :""
            }




            <Navbar/>
        {eventsToRender}

        </div>
    )
}

export default MyEvents