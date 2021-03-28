require('dotenv').config();



export const addWishFetch = (auth, Wish, eventId) => {

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authentication: auth
    },
    body: JSON.stringify({ event: eventId, wish: Wish })
  };

  return fetch(process.env.REACT_APP_SERVER_URL + "/addWish", options);

}
