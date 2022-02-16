import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../scss/cards.scss"
import "../scss/layout.scss"


function StepEigth({ update, goBackPage }) {
    return (
      <div className="container">
        <div className="section-title">
          <h2>Please select the pack of hours :</h2>
        </div>

        <div className="cards_container">

              <div className="card short-card only-text" onClick={() => update("Hours", "5")}>
                <div className="card_name">
                    5
                </div>
              </div>
            
              <div className="card short-card only-text" onClick={() => update("Hours", "10")}>
                <div className="card_name">
                    10
                </div>
              </div>
            
              <div className="card short-card only-text" onClick={() => update("Hours", "15")}>
                <div className="card_name">
                    15
                </div>
              </div>
            
              <div className="card short-card only-text" onClick={() => update("Hours", "20")}>
                <div className="card_name">
                    20
                </div>
              </div>
            
              <div className="card short-card only-text" onClick={() => update("Hours", "25")}>
                <div className="card_name">
                    25
                </div>
              </div>
            
              <div className="card short-card only-text" onClick={() => update("Hours", "30")}>
                <div className="card_name">
                    30
                </div>
              </div>
            
              <div className="card short-card only-text" onClick={() => update("Hours", "40")}>
                <div className="card_name">
                    40
                </div>
              </div>
            
              <div className="card short-card only-text" onClick={() => update("Hours", "50")}>
                <div className="card_name">
                    50
                </div>
              </div>
            <Grid xs={12} item container justifyContent="center" >
            <Fab variant="extended" size="medium" color="primary" onClick={() => goBackPage()} >
              <ArrowBackIcon />
            </Fab>
            </Grid>
        </div>
      </div>
    );
  }


  export default StepEigth;  