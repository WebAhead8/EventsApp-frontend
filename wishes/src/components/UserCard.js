import React from 'react';
import { useHistory } from "react-router-dom";
import "../Style/UserCard.css";
import { getUserByToken } from "../Fetches/getUserByToken"


function UserCard() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthday, setBirthday] = React.useState();

  const history = useHistory();


  React.useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/");
    } else {
      getUserByToken(localStorage.getItem("user"))
        .then((res) => res.json())
        .then((data) => {
          if (data[0].length == 0) {
            console.log("not found");
          } else {
            setFirstName(data[0].firstName)
            setLastName(data[0].lastName)
            setEmail(data[0].email)
            setPhone(data[0].phoneNumber)
            setBirthday(data[0].birthday)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);



  return (
    <div className="userCardMainDiv">

      <div className="information">
        <label>{firstName + " " + lastName}</label>
        <label>{email}</label>
        <label>{phone}</label>
        <label>{birthday}</label>

      </div>


      <div className="imageDiv">
        <img src="https://lh3.googleusercontent.com/proxy/zg9ckdTiNj5VhgGpKiWFtNJYMHQjFqjUz8P_Mk8q_tS2aDQDTPAh37Hc4-XY75mWB2NrfzMGNrpXYdVifpBAfqQiBDwnUaA"></img>
      </div>
    </div>
  );



};

export default UserCard;
