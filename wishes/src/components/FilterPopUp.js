import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const categotyOptions = [
  "all",
  "wedding",
  "birthday",
  "anniversary",
  "family Event",
  "seminars",
  "graduation",
];
function Filter({ setFilterClecked,CategoryFilter,setCategory,setDate,DateFilterChecked,setDateChecked,CategoryFilterChecked,setCategoryChecked }) {


  const categoryFilterHandler = (e) => {
    setCategory(e.target.value);
  };

  const DateFilterHandler = (e) => {
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
    <div className="filterDiv">
      <img
        src="/exit.png"
        alt="exit"
        onClick={(e) => {
          setFilterClecked(false);
        }}
      />

      <div>
        <label>Category</label>
        <select
          value={CategoryFilter}
          onChange={categoryFilterHandler}
          name="category"
          id="category"
        >
          {categotyOptions.map((cat) => {
            return (
              <option key={cat} value={cat}>
                {cat}
              </option>
            );
          })}
        </select>
        <input
      type="checkbox"
     checked={CategoryFilterChecked}
   onChange={(event) => setCategoryChecked(event.target.checked)}
    />
      </div>
      <div>
        <label>Date</label>

        <TextField
          id="date"
          type="date"
          defaultValue="2021-03-25"
          onChange={DateFilterHandler}
          className={classes.textField}
          // id="TextField"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <input
      type="checkbox"
       checked={DateFilterChecked}
       onChange={(event) => setDateChecked(event.target.checked)}
    />
      </div>

      <div>
        <label></label>
        <button>Filter</button>
      </div>
    </div>
  );
}

export default Filter;
