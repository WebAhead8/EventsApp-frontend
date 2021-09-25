import React from "react";
import "../Style/EditEvents.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { editEvent } from "../Fetches/editEventFech";
import { getMyEvents } from "../Fetches/getMyEvents";
import { Spinner } from "react-bootstrap";
import DeleteComponent from "./DeleteComponent";

function EditEvents({
  eventTitle,
  eventLocation,
  eventDate,
  setEventDate,
  eventDescription,
  setEventTitle,
  setEventLocation,
  setEventDescription,
  eventId,
  setEditEventClicked,
  setMyEvents,
  eventImage,
  setEventImage,
}) {
  const fetchEvents = () => {
    getMyEvents(localStorage.getItem("user"))
      .then((res) => res.json())
      .then((data) => {
        setMyEvents(data);
      });
  };

  const [textFieldDate, setTextFieldDate] = React.useState();
  const [deleteChecked, setDeleteChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    let newDate = eventDate.replaceAll("/", "-");
    console.log(newDate);
    newDate =
      newDate.charAt(6) +
      newDate.charAt(7) +
      newDate.charAt(8) +
      newDate.charAt(9) +
      "-" +
      newDate.charAt(3) +
      newDate.charAt(4) +
      "-" +
      newDate.charAt(0) +
      newDate.charAt(1);

    setTextFieldDate(newDate);
  }, [eventDate]);
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  const classes = useStyles();

  return (
    <div className="editEvent">
      {deleteChecked ? (
        <DeleteComponent
          setDeleteChecked={setDeleteChecked}
          eventId={eventId}
          setMyEvents={setMyEvents}
          setEditEventClicked={setEditEventClicked}
        />
      ) : (
        ""
      )}

      <div className="deleteDiv">
        <img
          src="/exit.png"
          alt=""
          onClick={(e) => {
            setEditEventClicked(false);

          }}
        />

        <img
          src="/delete.png"
          alt=""
          onClick={(e) => {
            setDeleteChecked(true);
          }}
        />
      </div>
      <input
        value={eventTitle}
        onChange={(e) => {
          setEventTitle(e.target.value);
        }}
      />
      <label>
        <TextField
          id="date"
          type="date"
          value={textFieldDate}
          onChange={(e) => {
            let theDate = e.target.value;
            theDate = theDate.replaceAll("-", "/");
            const newDate =
              theDate.charAt(8) +
              theDate.charAt(9) +
              "/" +
              theDate.charAt(5) +
              theDate.charAt(6) +
              "/" +
              theDate.charAt(0) +
              theDate.charAt(1) +
              theDate.charAt(2) +
              theDate.charAt(3);
            setEventDate(newDate);
          }}
          className={classes.textField}
          // id="TextField"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </label>
      <input
        value={eventLocation}
        onChange={(e) => {
          setEventLocation(e.target.value);
        }}
      />
      <textarea
        value={eventDescription}
        onChange={(e) => {
          setEventDescription(e.target.value);
        }}
      />

      <input 
      className="imageInput"
      value={eventImage}onChange={e=>{
        setEventImage(e.target.value)
      }}
      />

      <div className="deleteDiv">
        <img
            alt=""
          src="/save.png"
          onClick={(e) => {
            const obj = {
              title: eventTitle,
              description: eventDescription,
              date: eventDate,
              location: eventLocation,
              id: eventId,
              image:eventImage
            };
            setLoading(true);

            editEvent(localStorage.getItem("user"), obj)
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                setTimeout(function () {
                  fetchEvents();
                  setEditEventClicked(false);
                  setLoading(false);
                }, 1000);
              })
              .catch((err) => console.error("error:" + err));
          }}
        />
        {loading ? (
          <div>
            <Spinner animation="grow" size="sm" />{" "}
            <Spinner animation="grow" size="sm" />{" "}
            <Spinner animation="grow" size="sm" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
export default EditEvents;
