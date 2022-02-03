
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from '@mui/lab/DatePicker';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import moment from 'moment';

function StepFive({ update, goBackPage }) {
    
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const [error, setError] = useState(false);
    return (
      <div>
        <Grid sx={{ flexGrow: 1 }} container spacing={2} p={2.5}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <h2>Choose dates for you classes :</h2>
            </Grid>
          </Grid>
          
            <Grid container justifyContent="center">
              <Grid key={1} item>
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container justifyContent= "center" spacing={2}>
                  <Grid item>
                    <DatePicker className="date-picker"
                        label="Start of classes"
                        value={dateFrom}
                        onChange={(newValue) => {
                          setDateFrom(newValue);
                          setDateTo(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                  </Grid>
                  <Grid item>
                    <DatePicker
                      label="End of classes"
                      value={dateTo}
                      onChange={(newValue) => {
                        setDateTo(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />                    
                  </Grid>
                </Grid>
                  </LocalizationProvider>
                  <br/>
                  <Fab variant="extended" size="medium" color="primary" onClick={() => goBackPage()} >
                  <ArrowBackIcon />
                  </Fab>
                  <Fab variant="extended" size="medium" color="primary" 
                    onClick={() =>{
                      var now = moment();
                      var today= moment(now, "DD.MM.YYYY");//Date format
                      var finalDate= moment(dateFrom, "DD.MM.YYYY");
                      var isAfter =moment(today).isAfter(finalDate)
                      var dateFinal = moment(dateTo, "DD.MM.YYYY")
                      var isAfterTwo = moment(finalDate).isAfter(dateFinal)
                      if(dateFrom !== null && dateTo !== null && isAfter === false && isAfterTwo === false){
                        update("dates", {dateFrom : dateFrom, dateTo : dateTo})                           
                      }else {
                        setError(true);
                      }
                    }                            
                    } >
                  <ArrowForwardIcon />
                  </Fab>
                  { error ?
                  <Alert variant="outlined" severity="warning"
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
                        </IconButton>}
                  >
                    Please select valid dates to continue
                  </Alert>  : null }
                      
                </Grid>
              </Grid>
            </Grid>
          {/* </Grid>     
        </Grid> */}
      </div>
    );
  }

export default StepFive;  