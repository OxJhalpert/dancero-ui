
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from '@mui/lab/DatePicker';


function StepFive({ update, goBackPage }) {
    
    const [dateFrom, setDateFrom] = useState(null);
    const [dateTo, setDateTo] = useState(null);

    const [error, setError] = useState(false);
    return (
      <div>
        <br></br>
        <Grid sx={{ flexGrow: 1 }} container spacing={2} p={2.5}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <h2>Choose dates for you classes :</h2>
            </Grid>
          </Grid>
          
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <Grid key={1} item>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                      label="Start of classes"
                      value={dateFrom}
                      onChange={(newValue) => {
                        setDateFrom(newValue);
                        setDateTo(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  -
                  <DatePicker
                      label="End of classes"
                      value={dateTo}
                      onChange={(newValue) => {
                        setDateTo(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />                    

                  </LocalizationProvider><br/>
                  <Button
                  variant="contained"
                  onClick={()=> goBackPage()}
                  >                  
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: "10px" }}
                    onClick={() =>{
                      console.log(dateFrom);
                      if(dateFrom !== null && dateTo !== null){
                        update("dates", {dateFrom : dateFrom, dateTo : dateTo})                        
                      }else {
                        setError(true);
                      }
                    }                            
                    }
                  >
                    next
                  </Button>

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
               
        </Grid>
      </div>
    );
  }

  export default StepFive;  