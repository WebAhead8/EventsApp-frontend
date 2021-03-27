import React from "react";
import "../Style/SingleEvent.css";
import NavBar from "./NavBar";
import {getEventById} from "../Fetches/getEventById"
import {getWishesForEvent} from "../Fetches/getWishesForEvent"
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";


function SingleEvent(props) {
const [idFound,setIdFound]=React.useState("checking")
const history = useHistory();


const [eventOwner,setEventOwner]=React.useState("")
const [eventTitle,setEventTitle]=React.useState("")
const [eventDate,setEventDate]=React.useState("")
const [eventLocation,setEventLocation]=React.useState("")
const [eventDescription,setEventDescription]=React.useState("")
const [wishesToRender,setWishesToRender]=React.useState([])
const [eventWishes,setEventWishes]=React.useState([])

React.useEffect(()=>{
  if(!localStorage.getItem("user"))
  {
    history.push('/')
  }
},[])


React.useEffect(()=>{

getEventById(props.match.params.eventId)
.then(res=>res.json())
.then(data=>{
    if(data.status)
    {
        setIdFound("notFound")
    }
    else{
        setIdFound("Found")
        setEventOwner(data[0].owner[0].firstName+" "+data[0].owner[0].lastName)
        setEventLocation(data[0].location);
        setEventDate(data[0].date);
        setEventTitle(data[0].title);
        setEventDescription(data[0].description)
    }

}).catch(error=>{
    setIdFound("notFound")
    console.log(error)
})


getWishesForEvent(props.match.params.eventId).then(res=>res.json())
.then(data=>{
if(data.status)
{
setWishesToRender([
  <div className="wish" key="1">
  <p>
    
      no Wishes Yet!<br/>
be the first to add an wish

  </p>
  
</div>
])


}else{
  setEventWishes(data);
  const arr=data.map(wish=>{
   return ( <div className="wish">
    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1201202312.jpg" />
    <label className="wishSender">{wish.owner[0].firstName + " " +wish.owner[0].lastName}</label>
    <p>
    {wish.wish}
    </p>
  </div>)
  })
  setWishesToRender(arr)

}
}).catch(error=>{
  console.log(error)
})

},[])

if(idFound==="checking")
{
    return(
        <div className="mainSingleEventDiv">
            <NavBar />
            <div className="spinner">
            <Spinner animation="grow" /><Spinner animation="grow" /><Spinner animation="grow" />
            <Spinner animation="grow" /><Spinner animation="grow" /><Spinner animation="grow" />
            <Spinner animation="grow" /><Spinner animation="grow" /><Spinner animation="grow" />
        </div>
        </div>
    )
}else if(idFound==="notFound"){
    return (
    <div className="mainSingleEventDiv">
    <NavBar />
    <div className="spinner">
<label>ID Not Found</label>
</div>
</div>
)
}
  return (
    <div className="mainSingleEventDiv">
      <NavBar />
      <div className="eventDiv">
        <div className="eventInformationDiv">
          <div id="info">
            <label className="eventLabel">{eventOwner}</label>
            <label className="eventLabel">{eventTitle}</label>
            <label className="eventLabel">{eventDate}</label>
            <label className="eventLabel">{eventLocation}</label>
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
         {eventDescription}
          </p>
        </div>
      </div>

      <div className="WishesDiv">

        {wishesToRender}
      </div>
    </div>
  );
}
export default SingleEvent;
