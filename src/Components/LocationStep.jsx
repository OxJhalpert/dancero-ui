import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import cali from "../images/cali.jpg";
import bogota from "../images/bogota.jpg";
import cartagena from "../images/cartagena.jpeg";
import medellin from "../images/medellin.jpg";
import Fab from '@mui/material/Fab';
import "../scss/cards.scss"
import "../scss/layout.scss"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function StepFour({ data,update, goBackPage,setPage }) {
    return (
      <div className="container">
            <div className="section-title">
              <h2>Please select your city :</h2>
            </div>

            <div className="cards_container">
              <div className="card location-card" onClick={() => {
                if(data.Venue === 'Online')
                {
                  setPage(3)
                }update("City", "Cartagena")}}>
                <div className="card_image">
                  <img src={cartagena}/>
                </div>
                <div className="card_name">
                    Cartagena
                </div>
              </div>
              <div className="card" onClick={() => {
                if(data.Venue === 'Online')
                {
                  setPage(3)
                }update("City", "Bogota")}}>

                <div className="card_image">
                  <img src={bogota}/>
                </div>
                <div className="card_name">
                    Bogota
                </div>
              </div>
              <div className="card" onClick={() => 
                {
                  if(data.Venue === 'Online')
                {
                  setPage(3)
                }update("City", "Medellin")}}>
                <div className="card_image">
                  <img src={medellin}/>
                </div>
                <div className="card_name">
                    Medellin
                </div>
              </div>
              <div className="card" onClick={() => 
                {if(data.Venue === 'Online')
                {
                  setPage(3)
                }
                  update("City", "Cali")}}>
                <div className="card_image">
                  <img src={cali}/>
                </div>
                <div className="card_name">
                    Cali
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

  export default StepFour;  