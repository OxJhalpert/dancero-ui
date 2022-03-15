import {  Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import hombre from "../images/Hombre.png";
import mujer from "../images/mujer.png";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../scss/cards.scss";
import "../scss/layout.scss";

function StepTwo ({ data,update, goBackPage,setPage }) {
    return (
      <div className="container">
          <div className="section-title">
            <p>Would you prefer to learn from a man or a woman? An instructor from the opposite sex is typically better for couple dancing, while an instructor from the same sex is ideal for solo dancing.</p>
          </div>
          <div className="cards_container">
            <div className="card tall-card" onClick={() => update("Gender", "Woman")}>
              <div className="card_image">
                  <img src={mujer}/>
              </div>
              <div className="card_name">
                  Woman
              </div>
            </div>
          
            <div className="card tall-card" onClick={() => update("Gender", "Man")}>
              <div className="card_image">
                  <img src={hombre}/>
              </div>
              <div className="card_name">
                  Man
              </div>
            </div>
          </div>
          <Grid xs={12} item container justifyContent="center" >
          <Fab variant="extended" size="medium" color="primary" onClick={()=> {
            if(data.Venue === 'Online')
          {
            setPage(3);
          }
          goBackPage()}} >
            {/* <ArrowBackIcon/> */}
            Go Back
          </Fab>
          </Grid>
      </div>
    );
  }
  export default StepTwo;  