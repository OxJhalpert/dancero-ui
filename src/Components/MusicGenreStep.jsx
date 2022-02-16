import { Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import salsa from "../images/salsa.jpg";
import reggaeton from "../images/reggaeton.jpg";
import bachata from "../images/bachata.jpg";
import  kizomba from '../images/Kizomba.jpg';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../scss/cards.scss"
import "../scss/layout.scss"

function StepThree({ update, goBackPage }) {
  return (
    <div className="container">
          <div className="section-title">
            <h2>Please select the music genre:</h2>
          </div>
          <div className="cards_container">
            <div className="card" onClick={() => update("Musical_gender", "Salsa")}>
              <div className="card_image">
                <img src={salsa}/>
              </div>
              <div className="card_name">
                Salsa
              </div>
            </div>
            <div className="card" onClick={() => update("Musical_gender", "Bachata")}>
              <div className="card_image">
                <img src={bachata}/>
              </div>
              <div className="card_name">
                  Bachata
              </div>
            </div>
            <div className="card" onClick={() => update("Musical_gender", "Kizomba")}>
              <div className="card_image">
                <img src={reggaeton}/>
              </div>
              <div className="card_name">
                Kizomba
              </div>
            </div>
            <div className="card" onClick={() => update("Musical_gender", "Something else")}>
              <div className="card_image">
                <img src={kizomba}/>
              </div>
              <div className="card_name">
                Something else
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
export default StepThree;