import React, { useState } from "react";
import "../Style/AddWish.css";
// import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { addWishFetch } from "../Fetches/addWishFetch";
import { getWishesForEvent } from "../Fetches/getWishesForEvent";
// import FileBase64 from "react-file-base64";
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';

function AddWish({ setAddWishClicked, eventId, setEventWishes,setWishesSuggestionsClicked ,wish,setWish}) {
  const getWishesFunction = () => {
    getWishesForEvent(eventId)
      .then((res) => res.json())
      .then((data) => {
        setEventWishes(data);
      });
  };

  const [image, setImage] = useState("");

  const addWishHandler = (e) => {
    e.preventDefault();
    addWishFetch(localStorage.getItem("user"), wish, eventId, image)
      .then((res) => res.json())
      .then((data) => {
        getWishesFunction();
        setAddWishClicked(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="addWishMainDiv">
      
      <div>
       <CardGiftcardIcon onClick={e=>{setWishesSuggestionsClicked(true)}}/>
        <img
        alt=""
          src="/exit.png"
          onClick={(e) => {
            setAddWishClicked(false);
            setWishesSuggestionsClicked(false)
          }}
        />
      </div>
      <form className="AddWishForm" onSubmit={(e) => addWishHandler(e)}>
        <label htmlFor="Wish">Wish :</label>
        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          className="wish"
          required
        >
          {" "}
        </textarea>

        <label htmlFor="Image">Image :</label>
        <input
          type="text"
          onChange={(e) => {
            setImage(e.target.value);
          }}
        ></input>

        {/* <FileBase64
          // multiple={ true }
          onDone={(e) => {
            setImage(e.base64);
          }}
        /> */}

        <input type="submit" value="Add" className="addButton"></input>
      </form>
    </div>
  );
}

export default AddWish;
