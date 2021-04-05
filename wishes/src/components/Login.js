import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import "../Style/Login.css";
import { loginFetch } from "../Fetches/loginFetch";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

require("dotenv").config();

function Login(props) {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorViseble, setErrorViseble] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      history.push("/events");
    }
  });

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    loginFetch(email, password)
      .then((res) => res.json())
      .then((token) => {
        if (token.error) {
          setErrorViseble(true);
          setLoading(false);
        } else {
          setErrorViseble(false);
          setLoading(false);

          localStorage.setItem("user", token.access_token);
          history.push("/events");
        }
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
      });
  };

  return (
    <form className="loginForm" onSubmit={loginHandler}>
      <h1>Log in</h1>
      <label htmlFor="email">Email</label>
      <div className="inputLabel">
        <span>
          <FontAwesomeIcon icon={faUser} />
        </span>
        <input
          required
          placeholder="example@somthing.com"
          name="email"
          id="email"
          type="email"
          onChange={emailHandler}
          value={email}
        />
      </div>

      <label htmlFor="password">Password</label>
      <div className="inputLabel">
        <span>
          <FontAwesomeIcon icon={faKey} />
        </span>
        <input
          required
          placeholder="********"
          name="password"
          id="password"
          type="password"
          onChange={passwordHandler}
          value={password}
        />
      </div>

      <button type="submit" value="Login" id="LoginButton">
        Login <FontAwesomeIcon icon={faSignInAlt} />
      </button>

      <button
        type="button"
        value="SignUp"
        id="signUpButton"
        onClick={(e) => {
          history.push("/signup");
        }}
      >
        SignUp <FontAwesomeIcon icon={faSignInAlt} />
      </button>

      {errorViseble ? (
        <label className="errorLabel">invalid email or password</label>
      ) : (
        ""
      )}
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
  );
}

export default Login;
