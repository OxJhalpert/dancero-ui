import {Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DoneIcon from "@mui/icons-material/Done";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../scss/cards.scss"
import "../scss/layout.scss"

function StepSix({ update,goBackPage }) {
    return (
      <div className="container">
        <div className="section-title">
        <h2>The basic service connects you to an instructor that matches the requirements. The standard service is a bit more expensive but you have the freedom to switch up your instructors. And with the premium option, you get a concierge service to help you book taxis, hotels, tours or anything else you need during your trip. <a href={"https://salsaclasses.co/packs/"}>Lear more here.</a></h2>

        </div>
        
        <div className="cards_container">
            <div className="card" onClick={() => update("Service", "Basic")}>
              <div className="card_image">
                <DoneIcon/>
              </div>
              <div className="card_name">
                Basic
              </div>
            </div>
            
            <div className="card" onClick={() => update("Service", "Standard")}>
              <div className="card_image">
                <StarIcon/>
              </div>
              <div className="card_name">
                Standard
              </div>
            </div>
            
            <div className="card" onClick={() => update("Service", "Premium")}>
              <div className="card_image">
                <DiamondIcon/>
              </div>
              <div className="card_name">
                Premium
              </div>
            </div>
        </div>
            <Grid xs={12} item container justifyContent="center" >
            <Fab variant="extended" size="medium" color="primary" onClick={() => goBackPage()} >
              {/* <ArrowBackIcon /> */}
              Go Back
            </Fab>
            </Grid>
      </div>
    );
  }


  export default StepSix;  