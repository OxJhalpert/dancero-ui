import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function StepSeven({ update, goBackPage }) {
    return (
      <div className="container">
            <div className="section-title">
              <h2>Please select level you want :</h2>
            </div>
            
            <div className="cards_container">

              <div className="card only-text" onClick={() => update("Level", "Semi")}>
                <div className="card_name">
                    Semi
                </div>
              </div>
            
              <div className="card only-text" onClick={() => update("Level", "Pro")}>
                <div className="card_name">
                    Pro
                </div>
              </div>
            
              <div className="card only-text" onClick={() => update("Level", "Master")}>
                <div className="card_name">
                    Master
                </div>
              </div>
            </div>
            <Grid xs={12} item container justifyContent="center" >
            <Fab variant="extended" size="medium" color="primary" onClick={() => goBackPage()} >
              <ArrowBackIcon />
            </Fab>
            </Grid>
      </div>
    );
  }

  export default StepSeven;  