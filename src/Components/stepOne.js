import { Typography } from "@mui/material";
//import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import online from "../images/online.jpg";
import studio from '../images/studio.jpg';
import home from '../images/home.jpg';



function StepOne({ update }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} p={2.5}>
      <Grid item xs={12} >
        <Grid container justifyContent="center" spacing={2}>
          <h2>
            Welcome to Dancero wizard, please select one of the following
            options :
          </h2>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid key={1} item>
            <Card
              sx={{ maxWidth: 200 }}
              onClick={() => update("Venue", "Virtual")}
            >
              <CardMedia
                component="img"
                alt="Online"
                height="140"
                image={online}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Virtual
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid key={3} item>
            <Card
              sx={{ maxWidth: 200 }}
              onClick={() => update("Venue", "Studio")}
            >
              <CardMedia
                component="img"
                alt="Studio"
                height="140"
                image={studio}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Studio
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid key={2} item>
            <Card
              sx={{ maxWidth: 200 }}
              onClick={() => update("Venue", "Home")}
            >
              <CardMedia
                component="img"
                alt="Home"
                height="140"
                image={home}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Home
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepOne;
