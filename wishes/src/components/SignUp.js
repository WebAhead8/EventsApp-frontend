import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "../Style/SignUp.css";
import passwordValidationFunction from "../helperFunction/passwordValidation";
import emailValidationFunction from "../helperFunction/emailValidation";
import { signupFetch } from "../Fetches/signUpFetches";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function SignUp() {
  const [loading, setLoading] = React.useState(false);

  const [Fname, setFname] = React.useState("");
  const [firstNameValidation, setFirstNameValidation] = React.useState("");
  const [Lname, setLname] = React.useState("");
  const [lastNameValidation, setLastNameValidation] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [emailValidation, setEmailValidation] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [phoneNumberValidation, setphoneNumberValidation] = React.useState("");
  const [Date, setDate] = React.useState("2017/05/24");
  const [FirstPassword, setFirstPassword] = React.useState("");
  const [passwordValidation, setPasswordValidation] = React.useState("");
  const [SecondPassword, setSecondPassword] = React.useState("");
  const [
    confirmPasswordValidation,
    setConfirmPasswordValidation,
  ] = React.useState("");
  const [signupValidation, setSignupValidation] = React.useState(true);
  const [emailExist, setEmailExist] = React.useState(false);

  const history = useHistory();

  const signUpHandler = (e) => {
    e.preventDefault();
    const finalData = {
      firstName: Fname,
      lastName: Lname,
      email: Email,
      birthday: Date,
      phoneNumber: Phone,
      password: FirstPassword,
    };
    if (
      emailValidation ||
      firstNameValidation ||
      lastNameValidation ||
      passwordValidation ||
      confirmPasswordValidation
    ) {
      console.log("NOT valid");
      setSignupValidation(false);
    } else {
      setLoading(true);

      setSignupValidation(true);
      signupFetch(finalData)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setEmailExist(true);
            setLoading(false);
          } else {
            setEmailExist(false);
            setLoading(false);
            localStorage.setItem("user", data.access_token);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const firstNameHandler = (e) => {
    setFname(e.target.value);
    if (e.target.value.length < 2) {
      setFirstNameValidation("error");
    } else {
      setFirstNameValidation("");
    }
  };

  const lastNameHandler = (e) => {
    setLname(e.target.value);

    if (e.target.value.length < 2) {
      setLastNameValidation("error");
    } else {
      setLastNameValidation("");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (!emailValidationFunction(e.target.value)) {
      setEmailValidation("error");
    } else {
      setEmailValidation("");
    }
  };

  const phoneNumberHandler = (e) => {
    setPhone(e.target.value);
    if (e.target.value.length < 10) {
      setphoneNumberValidation("error");
    } else {
      setphoneNumberValidation("");
    }
  };

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

  const passwordHandler = (e) => {
    setFirstPassword(e.target.value);
    if (!passwordValidationFunction(e.target.value)) {
      setPasswordValidation("error");
    } else {
      setPasswordValidation("");
    }
  };

  const confirmPasswordHandler = (e) => {
    setSecondPassword(e.target.value);
    if (passwordValidation || e.target.value !== FirstPassword) {
      setConfirmPasswordValidation("error");
    } else {
      setConfirmPasswordValidation("");
    }
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

  return (
    <>
      <h1 className="h1">Sign Up</h1>
      <form className="signUpForm" onSubmit={signUpHandler}>
        <label htmlFor="Fname">First Name :</label>
        <input
          required
          type="text"
          onChange={(e) => firstNameHandler(e)}
          value={Fname}
          className={firstNameValidation}
          placeholder="First Name"
        ></input>

        <label htmlFor="Lname">Last Name :</label>
        <input
          required
          type="text"
          onChange={(e) => lastNameHandler(e)}
          value={Lname}
          className={lastNameValidation}
          placeholder="Last Name"
        ></input>

        <label htmlFor="Email">Email :</label>
        <input
          required
          type="email"
          onChange={(e) => emailHandler(e)}
          value={Email}
          className={emailValidation}
          placeholder="Email"
        ></input>

        <label htmlFor="Phone">Phone :</label>
        <input
          required
          type="text"
          onChange={(e) => phoneNumberHandler(e)}
          value={Phone}
          className={phoneNumberValidation}
          placeholder="Phone"
        ></input>

        <label htmlFor="Date">Date of birth :</label>
        <TextField
          id="date"
          type="date"
          defaultValue="2017-05-24"
          onChange={DateHandler}
          className={classes.textField}
          // id="TextField"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <label htmlFor="FirstPassword">Password :</label>
        <input
          required
          type="password"
          onChange={(e) => passwordHandler(e)}
          value={FirstPassword}
          className={passwordValidation}
          placeholder="Password"
        ></input>

        <label htmlFor="SecondPassword">Password :</label>
        <input
          type="password"
          onChange={(e) => confirmPasswordHandler(e)}
          value={SecondPassword}
          className={confirmPasswordValidation}
          placeholder="Confirm password"
        ></input>

        {!signupValidation ? (
          <label className="errorLabel">check all the feilds</label>
        ) : (
          ""
        )}
        {emailExist ? (
          <label className="errorLabel">emai already exist</label>
        ) : (
          ""
        )}

        <div className="buttons">
          <input type="submit" value="SignUp" className="SignupButton"></input>
          <button
            type="button"
            className="LoginButton"
            onClick={(e) => {
              history.push("/");
            }}
          >
            Login
          </button>
        </div>
        {loading ? (
          <div>
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
          </div>
        ) : (
          ""
        )}
      </form>
    </>
  );
}

export default SignUp;
