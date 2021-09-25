import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../Style/AddEvent.css";
import Navbar from "./NavBar";
import { AddEventFetch } from "../Fetches/addEventFetch";
import { useHistory } from "react-router-dom";
const axios = require('axios');

function AddEvent() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState(""); 
  const [Date, setDate] = useState("24/05/2017");
  const [Location, setLocation] = useState("");
  const [Image, setImage] = useState("");
  const [Category, setCategory] = useState("birthday");

  const history = useHistory();

  const categotyOptions = [
    "wedding",
    "birthday",
    "anniversary",
    "family Event",
    "seminars",
    "graduation",
  ];

  const DateHandler = (e) => {
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
    setDate(newDate);
  };

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

  const addEventHandler = (e) => {
    e.preventDefault();
    AddEventFetch(
      localStorage.getItem("user"),
      Title,
      Description,
      Date,
      Location,
      Category,
      Image
    )
      .then((res) => res.json())
      .then((data) => {
        history.push("/events");
      });
      const data = new FormData();
      data.append('file', Image);
      axios.post('http://localhost:4000/upload', data)

      .then(data=>{
        console.log(data)
      })
  };

  return (
    <>
      <Navbar />
      <form className="AddEventForm" onSubmit={(e) => addEventHandler(e)}>
        <label htmlFor="Title">Title :</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={Title}
          placeHolder="Enter the Title"
          required
        ></input>

        <label htmlFor="Description">Description : </label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={Description}
          placeHolder="Enter the Description"
          required
          className="Description"
        ></textarea>

        <label htmlFor="Date">Date :</label>
        <TextField
          required
          id="date"
          type="date"
          defaultValue="2017-05-24"
          onChange={DateHandler}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <label htmlFor="Location">Location : </label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={Location}
          placeHolder="Enter the Location"
          required
        ></input>

        <label>Category</label>
        <select
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          id="category"
        >
          {categotyOptions.map((cat) => {
            return (
              <option key={cat} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>

        <label htmlFor="Image">Image : </label>
        <span className="img">
          {/* <input
            type="text"
            onChange={(e) => setImage(e.target.value)}
            value={Image}
            placeHolder="Enter the Image"
            className="imgInput"
          ></input> */}
          <input type="file" name="file" onChange={event=>{
            setImage(event.target.files[0])
          }}/>
        </span>
        <input
          type="submit"
          value="Add Event"
          className="AddEventClass"
        ></input>
      </form>
    </>
  );
}
export default AddEvent;
