import React from 'react';
import { useHistory } from "react-router-dom";
import "../Style/UserCard.css";
import { getUserByToken } from "../Fetches/getUserByToken"
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import {editUser} from "../Fetches/editUserDetails";

function UserCard() {
  const [editing, setEditing]=React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [birthday, setBirthday] = React.useState();
const [profileImage,setProfileImage]=React.useState("https://lh3.googleusercontent.com/proxy/zg9ckdTiNj5VhgGpKiWFtNJYMHQjFqjUz8P_Mk8q_tS2aDQDTPAh37Hc4-XY75mWB2NrfzMGNrpXYdVifpBAfqQiBDwnUaA")
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
            if(data[0].profileImage)
            {
              setProfileImage(data[0].profileImage);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);


if (editing)
{
  return (
    <div className="userCardMainDiv">

      <div className="information">
        <input value={firstName} onChange={e=>{setFirstName(e.target.value)}}/>
        <input value={lastName} onChange={e=>{setLastName(e.target.value)}}/>
        <label>{email}</label>
        <input value={phone} onChange={e=>{setPhone(e.target.value)}}/>
        <input value={birthday} onChange={e=>{setBirthday(e.target.value)}}/>
      <span onClick={e=>{
        const obj={firstName:firstName,
          lastName:lastName,
          phoneNumber:phone,
          email:email,
          birthday:birthday,
          profileImage:profileImage
          }
          editUser(localStorage.getItem("user"),obj).then(res=>res.json())
          .then(data=>{
console.log(data)
          })
        
        console.log({firstName:firstName,
        lastName:lastName,
        phoneNumber:phone,
        email:email,
        birthday:birthday
        })

        
        setEditing(false)
      }}><SaveIcon/></span>
      </div>


      <div className="imageDiv">
        <img src={profileImage}></img>
        <input value={profileImage} onChange={e=>{setProfileImage(e.target.value)}}/>

      </div>
     
    </div>
  );

}
  return (
    <div className="userCardMainDiv">

      <div className="information">
        <label>{firstName + " " + lastName}</label>
        <label>{email}</label>
        <label>{phone}</label>
        <label>{birthday}</label>
      <span onClick={e=>{
setEditing(true)

      }}><EditIcon/></span>
      </div>


      <div className="imageDiv">
        <img src={profileImage}></img>
      </div>
     
    </div>
  );



};

export default UserCard;
