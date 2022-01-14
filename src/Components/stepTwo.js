import {  Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import hombre from "../images/Hombre.png";
import mujer from "../images/mujer.png";


function StepTwo ({ update, goBackPage }) {
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
              <Card sx={{ maxWidth: 345 }}  onClick={() => update("Gender", "Woman")}>
                <CardMedia
                  component="img"
                  alt="Woman"
                  height="140"
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
              <Card sx={{ maxWidth: 345 }}  onClick={() => update("Gender", "Man")}>
                <CardMedia
                  component="img"
                  alt="Man"
                  height="140"
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
            <Button
                  variant="contained"
                  onClick={()=> goBackPage()}
                  >                  
                    back
                  </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  export default StepTwo;  