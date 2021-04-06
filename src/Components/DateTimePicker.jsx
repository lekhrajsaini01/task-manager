import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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

export default function DateAndTimePickers({ setDue }) {
  const classes = useStyles();

  const handleChange = (e) => {
    setDue(e.target.value);
  };

  return (
    <TextField
      id="datetime-local"
      label="Due Time"
      type="datetime-local"
      defaultValue={new Date().getTime()}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={handleChange}
    />
  );
}
