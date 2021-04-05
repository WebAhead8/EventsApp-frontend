import React from "react";
import { Table, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Events.css";
import NavBar from "./NavBar";
import Filter from "./FilterPopUp";
import { getAllEvents } from "../Fetches/getAllEvents";
import { useHistory } from "react-router-dom";
// import 

function Events(props) {      
  const history = useHistory();

  const [eventsArr, setEventArr] = React.useState([]);
  const [tableRows, setTableRows] = React.useState([]);
  const [CategoryFilter, setCategory] = React.useState("All");
  const [DateFilter, setDate] = React.useState("25/03/2021");
  const [DateFilterChecked, setDateChecked] = React.useState(false);
  const [CategoryFilterChecked, setCategoryChecked] = React.useState(false);

  const [filterClicked, setFilterClecked] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    if (!localStorage.getItem("user")) {
      history.push("/");
    }
  });

  React.useEffect(() => {
    getAllEvents()
      .then((res) => res.json())
      .then((data) => {
        if (!data.status) {
          setEventArr(data);
        }
      })
      .catch((err) => console.error);
  });

  React.useEffect(() => {
    if (eventsArr.length > 0) {
      const toBeRender = eventsArr
        .filter((event, i) => {
          return (
            event.title.toLowerCase().includes(searchInput.toLowerCase()) ||
            event.date.toLowerCase().includes(searchInput.toLowerCase()) ||
            event.owner[0].firstName
              .toLowerCase()
              .includes(searchInput.toLowerCase()) ||
            event.owner[0].lastName
              .toLowerCase()
              .includes(searchInput.toLowerCase())
          );
        })
        .filter((event, i) => {
          return (
            !CategoryFilterChecked ||
            event.category
              .toLowerCase()
              .includes(CategoryFilter.toLowerCase()) ||
            CategoryFilter.toLowerCase() === "all"
          );
        })
        .filter((event, i) => {
          return (
            !DateFilterChecked ||
            event.date.toLowerCase().includes(DateFilter.toLowerCase())
          );
        })
        .map((event, i) => {
          return (
            <tr
              key={i}
              onClick={(e) => {
                history.push("/events/" + event._id);
              }}
            >
              <td>{i + 1}</td>
              <td>{event.title}</td>
              <td>{event.date}</td>
              {event.owner.length > 0 ? (
                <td>
                  {event.owner[0].firstName + " " + event.owner[0].lastName}
                </td>
              ) : (
                <td>no Owner</td>
              )}
            </tr>
          );
        });

      setTableRows(toBeRender);
    }
  }, [
    eventsArr,
    searchInput,
    CategoryFilter,
    CategoryFilterChecked,
    DateFilter,
    DateFilterChecked,
    history
  ]);

  return (
    <div>
      {filterClicked ? (
        <Filter
          CategoryFilter={CategoryFilter}
          setCategory={setCategory}
          DateFilter={DateFilter}
          setDate={setDate}
          setFilterClecked={setFilterClecked}
          DateFilterChecked={DateFilterChecked}
          setDateChecked={setDateChecked}
          CategoryFilterChecked={CategoryFilterChecked}
          setCategoryChecked={setCategoryChecked}
        />
      ) : (
        ""
      )}
      <NavBar />
      <div className="tableDiv">
        <form className="searchForm">
          <img
            src="/filter.png"
            alt="FILTER"
            onClick={(e) => {
              setFilterClecked(true);
   
            }}
          />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            placeholder="ID/TITLE/OWNER/DATE(DD/MM/YYYY)"
          />
          <input type="submit" value="Search" />
        </form>

        <Table striped bordered hover variant="primary">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.length === 0 && eventsArr.length > 0
              ? "no event match"
              : tableRows}
          </tbody>
        </Table>
      </div>
      {eventsArr.length > 0 ? (
        ""
      ) : (
        <div>
          <Spinner animation="grow" />
          <Spinner animation="grow" />
          <Spinner animation="grow" />
        </div>
      )}
    </div>
  );
}

export default Events;
