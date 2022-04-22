import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import goBackIcon from "../images/go-back.png"
import DatePicker from "@mui/lab/DatePicker";
import Fab from "@mui/material/Fab";
import moment from "moment";
import { Box } from "@mui/system";
import "../scss/step.scss";
import "../scss/dates-step.scss";

function StepFive({ update, goBackPage }) {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const [error, setError] = useState(false);
  return (
    <div className="container flex-container">
        <div className="section-title">
          <p>
            What’s your approximate start and finish date to complete your
            classes? Your answer here will also give us an idea of your
            preferred the volume per day or per week, which is useful to find an
            instructor with the appropriate availability. Note that you can
            always change these dates later if you wish.{" "}
          </p>
        </div>

        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns} >
              <div className="dates-form"> 
                <DatePicker 
                  className="date-picker"
                  label="Start date"
                  minDate={new Date()}
                  value={dateFrom}
                  onChange={(newValue) => {
                    setDateFrom(newValue);
                    setDateTo(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  className="date-picker"
                  label="Finish date"
                  value={dateTo}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    setDateTo(newValue);
                  }}
                  placeholder="End of the classes"
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
            
            <Fab
                variant="extended"
                size="medium"
                color="primary"
                onClick={() => {
                  var now = moment();
                  var today = moment(now, "DD.MM.YYYY"); 
                  var finalDate = moment(dateFrom, "DD.MM.YYYY");
                  var isAfter = moment(today).isAfter(finalDate);
                  var dateFinal = moment(dateTo, "DD.MM.YYYY");
                  var isAfterTwo = moment(finalDate).isAfter(dateFinal);
                  if (
                    dateFrom !== null &&
                    dateTo !== null &&
                    isAfter === false &&
                    isAfterTwo === false
                  ) {
                    update("dates", { dateFrom: dateFrom, dateTo: dateTo });
                  } else {
                    setError(true);
                  }
                }}
              >
                Next
              </Fab>
            {error ? (
              <Alert
                variant="outlined"
                severity="warning"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Please select valid dates to continue
              </Alert>
            ) : null}
        </div>
        <div className="go-back">
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => goBackPage()}
          >
            <img src={goBackIcon} alt="" />
            Back
          </Fab>
        </div>
    </div>
  );
}

export default StepFive;
