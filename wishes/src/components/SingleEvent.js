import React from "react";
import "../Style/SingleEvent.css";
import NavBar from "./NavBar";
import { getEventById } from "../Fetches/getEventById";
import { getWishesForEvent } from "../Fetches/getWishesForEvent";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import AddWish from "./AddWish";
import WishesSuggestions from "./WishesSuggestions"

function SingleEvent(props) {
  const [idFound, setIdFound] = React.useState("checking");
  const history = useHistory();

  const [eventOwner, setEventOwner] = React.useState("");
  const [eventImage, setEventImage] = React.useState(
    "https://blog.walls.io/wp-content/uploads/2017/02/ideas-for-making-event-more-social.jpg"
  );
  const [eventId, setEventId] = React.useState("");
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventDescription, setEventDescription] = React.useState("");
  const [eventCategory, setEventCategory] = React.useState("");
  const [wishesToRender, setWishesToRender] = React.useState([]);
  const [eventWishes, setEventWishes] = React.useState([]);
  const [addWishClicked, setAddWishClicked] = React.useState(false);
  const [wishesSuggestionsClicked, setWishesSuggestionsClicked] = React.useState(false);
  const [wish, setWish] = React.useState("");


  React.useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/");
    }
  }, []);

  React.useEffect(() => {
    getEventById(props.match.params.eventId)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setIdFound("notFound");
        } else {
          setIdFound("Found");
          setEventOwner(
            data[0].owner[0].firstName + " " + data[0].owner[0].lastName
          );
          setEventLocation(data[0].location);
          setEventDate(data[0].date);
          setEventTitle(data[0].title);
          setEventDescription(data[0].description);
          setEventId(data[0]._id);
          setEventCategory(data[0].category)
          if (data[0].image) {
            setEventImage(data[0].image);
          }
        }
      })
      .catch((error) => {
        setIdFound("notFound");
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    getWishesForEvent(props.match.params.eventId)
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setWishesToRender([
            <div className="wish" key="1">
              <p>
                no Wishes Yet!
                <br />
                be the first to add an wish
              </p>
            </div>,
          ]);
        } else {
          setEventWishes(data);
          const arr = data.map((wish) => {
            return (
              <div className="wish" key={wish._id}>
                {wish.image ? (
                  <img src={wish.image} />
                ) : (
                  <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1201202312.jpg" />
                )}
                <label className="wishSender">
                  {wish.owner[0].firstName + " " + wish.owner[0].lastName}
                </label>
                <div className="wishp">
                  <p>{wish.wish}</p>
                </div>
              </div>
            );
          });
          setWishesToRender(arr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventWishes]);

  if (idFound === "checking") {
    return (
      <div className="mainSingleEventDiv" key="1">
        <NavBar />
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
  } else if (idFound === "notFound") {
    return (
      <div className="mainSingleEventDiv" key="1">
        <NavBar />
        <div className="spinner">
          <label>ID Not Found</label>
        </div>
      </div>
    );
  }
  return (
    <div className="mainSingleEventDiv">
      <NavBar />
      {wishesSuggestionsClicked ? 
      <WishesSuggestions category={eventCategory} setWishesSuggestionsClicked={setWishesSuggestionsClicked}
      wish={wish}
      setWish={setWish}
      />:""
}
      {addWishClicked ? (
        <AddWish
        wishesSuggestionsClicked={wishesSuggestionsClicked}
        setWishesSuggestionsClicked={setWishesSuggestionsClicked}
          setAddWishClicked={setAddWishClicked}
          eventId={eventId}
          setEventWishes={setEventWishes}
          wish={wish}
          setWish={setWish}
        />
      ) : (
        ""
      )}
      <div className="eventDiv">
        <div className="eventInformationDiv">
          <div id="info">
            <label className="eventLabel">{eventOwner}</label>
            <label className="eventLabel">{eventTitle}</label>
            <label className="eventLabel">{eventDate}</label>
            <label className="eventLabel">{eventLocation}</label>
          </div>

          <div id="eventPhoto">
            <img alt="" src={eventImage} />
          </div>
        </div>

        <div className="divDescription">
          <p>{eventDescription}</p>
        </div>
        <div className="addWishIconDiv">
          <img
            src="/sign-add-icon.png"
            onClick={(e) => {
              setAddWishClicked(true);
            }}
          ></img>
          <label></label>
        </div>
      </div>

      <div className="WishesDiv">{wishesToRender}</div>
    </div>
  );
}
export default SingleEvent;
