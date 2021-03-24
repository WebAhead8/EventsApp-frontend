require('dotenv').config()

export const signupFetch = (data) => {
  let options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  return fetch(process.env.REACT_APP_SERVER_URL + "/signUp", options)

}
