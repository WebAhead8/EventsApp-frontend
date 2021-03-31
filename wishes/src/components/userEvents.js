import React from "react";
import Navbar from "./NavBar";
import EditIcon from "@material-ui/icons/Edit";
import "../Style/MyEvents.css";
import { useHistory } from "react-router-dom";
import { getMyEvents } from "../Fetches/getMyEvents";
import { Spinner } from "react-bootstrap";
import { Visibility } from "@material-ui/icons";
import EditEvent from "./EditEvents";
import UserCard from './UserCard';
import {getUserByEmail} from "../Fetches/getUserByEmail"
import {getUserEvents} from "../Fetches/getUserEvents"

function MyEvents(props) {
    const history = useHistory();

  const [loading, setLoading] = React.useState(true);
  const [userFound, setUserFound] = React.useState(false);
  const [userEvents, setUserEvents] = React.useState([]);
  const [eventsToRender, setEventsToRender] = React.useState(true);
  const [haveEvents, setHaveEvents] = React.useState(true);



  React.useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/");
    } else {
        getUserByEmail(props.location.state.params.email)
        .then(res=>res.json())
        .then(data=>{
            setUserFound(true)

            getUserEvents(data[0]._id)

            .then (res=>res.json())
            .then(d=>{
                setLoading(false)

                if(!d.status)
                {

                setUserEvents(d)
                }else{
                    setHaveEvents(false)

                }

            }).catch(err=>{
                setLoading(false)
                setHaveEvents(false)
    
            })

        }).catch(err=>{
            setUserFound(false)
            setLoading(false)

        })
     
    }
  }, []);








  React.useEffect(() => {
    const arr = userEvents.map((event) => {
      return (
        <div className="eventDiv" key={event._id}>
          <div className="editIcon">
            <span
              onClick={(e) => {
                history.push(history.push("/events/" + event._id));
              }}
            >
              <Visibility />
            </span>
          </div>

          <div className="eventInformationDiv">
            <div id="info">
              <label className="eventLabel">{event.title}</label>
              <label className="eventLabel">{event.location}</label>
              <label className="eventLabel">{event.date}</label>
            </div>

            <div id="eventPhoto">
            {event.image ?  <img alt="" src={event.image} />: <img alt="" src="https://blog.walls.io/wp-content/uploads/2017/02/ideas-for-making-event-more-social.jpg" />}
           

            </div>
          </div>

          <div className="divDescription">
            <p>{event.description}</p>
          </div>
        </div>
      );
    });
    setEventsToRender(arr);
  }, [userEvents]);

















  if (loading) {
    return (
      <div className="myEventsMainDiv">
        <Navbar />
        <div className="spinner">
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      </div>
    );
  }

  if (!userFound) {
    return (
      <div className="myEventsMainDiv">
        <Navbar />
        <div className="userCardDiv">
          <UserCard user={props.location.state.params.email} />
        </div>
        <div className="eventDiv">
          <div className="divDescription">
            <p>no user Found</p>
          </div>
        </div>
      </div>
    );
  }


if(!haveEvents)
{
    return (
        <div className="myEventsMainDiv">
    
          <Navbar />
          <div className="userCardDiv">
            <UserCard user={props.location.state.params.email} />
          </div>
          <div className="eventDiv">
          <div className="divDescription">
            <p>User Have No Events</p>
          </div>
          </div>
          
        </div>
    )
}

  return (
    <div className="myEventsMainDiv">

      <Navbar />
      <div className="userCardDiv">
        <UserCard user={props.location.state.params.email} />
      </div>
      {eventsToRender}
      
    </div>
  );
}

export default MyEvents;
