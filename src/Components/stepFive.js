
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





function StepFive({ update, goBackPage }) {
    
    const [value, setValue] = useState([null, null]);
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
                    <DateRangePicker
                      startText="Start"
                      endText="End"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(startProps, endProps) => (
                        <React.Fragment>
                          <TextField {...startProps} />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider>
                  <Button
                  variant="contained"
                  onClick={()=> goBackPage()}
                  >                  
                    back
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: "10px" }}
                    onClick={() =>{
                      if(value[0] != null && value[1] != null){
                        update("dates", {dateFrom : value[0], dateTo : value[1]})                        
                      }else {
                        setError(true);
                        
                        //alert('choose the valid date')
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