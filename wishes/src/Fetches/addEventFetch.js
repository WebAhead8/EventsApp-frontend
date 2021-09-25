require('dotenv').config()


export const AddEventFetch = (auth, Title, Description, Date, Location, Category,Image) => {

  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authentication: auth
    },
    body: JSON.stringify({ title: Title, description: Description, date: Date, location: Location, category: Category,image:"xj,jnxdk" })
  };

  return fetch(process.env.REACT_APP_SERVER_URL + "/addEvent", options);

}


