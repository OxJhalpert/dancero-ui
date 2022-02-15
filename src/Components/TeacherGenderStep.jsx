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


function StepTwo ({ data,update, goBackPage,setPage }) {
    return (
      <Grid sx={{ flexGrow: 2 }} container spacing={2} p={2.5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <h2>Please select gender of the teacher :</h2>
              </Grid>
            </Grid>
            <Grid key={3} item>
              <Card sx={{ maxWidth: 300 }}  onClick={() => update("Gender", "Woman")}>
                <CardMedia
                  component="img"
                  alt="Woman"
                  height="300"
                  image={mujer}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Woman
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={4} item>
              <Card sx={{ maxWidth: 300 }}  onClick={() => update("Gender", "Man")}>
                <CardMedia
                  component="img"
                  alt="Man"
                  height="300"
                  image={hombre}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Man
                  </Typography>
                </CardContent>
                <CardActions>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} item container justifyContent="center" >
            <Fab variant="extended" size="medium" color="primary" onClick={()=> {
              if(data.Venue === 'Online')
            {
              setPage(3);
            }
            goBackPage()}} >
              <ArrowBackIcon/>
            </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  export default StepTwo;  