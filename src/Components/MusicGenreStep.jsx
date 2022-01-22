import { Typography } from "@mui/material";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import salsa from "../images/salsa.jpg";
import reggaeton from "../images/reggaeton.jpg";
import bachata from "../images/bachata.jpg";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function StepThree({ update, goBackPage }) {
  return (
    <Grid sx={{ flexGrow: 3 }} container spacing={2} p={2.5}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <h2>Please select the music genre :</h2>
            </Grid>
          </Grid>
          <Grid key={5} item>
            <Card sx={{ maxWidth: 300 }} onClick={() => update("Musical_gender", "Reggaeton")}>
              <CardMedia
                component="img"
                alt="reggaeton"
                height="300"
                image={reggaeton}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Reggaeton
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
          </Grid>
          <Grid key={6} item>
            <Card sx={{ maxWidth: 300 }} onClick={() => update("Musical_gender", "Salsa")}>
              <CardMedia
                component="img"
                alt="salsa"
                height="300"
                image={salsa}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Salsa
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
          </Grid>
          <Grid key={7} item>
            <Card sx={{ maxWidth: 300 }} onClick={() => update("Musical_gender", "Bachata")}>
              <CardMedia
                component="img"
                alt="bachata"
                height="300"
                image={bachata}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Bachata
                </Typography>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={12} item container justifyContent="center" >
            <Fab variant="extended" size="medium" color="primary" onClick={() => goBackPage()} >
              <ArrowBackIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default StepThree;