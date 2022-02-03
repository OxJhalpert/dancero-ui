import { Typography } from "@mui/material";
//import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import studio from '../images/studio.jpg';
import home from '../images/home.jpg';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function HomeStudioStep({ update, goBackPage }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} p={2.5}>
      <Grid item xs={12} >
        <Grid container justifyContent="center" spacing={2}  alignItems="center">
          <h2>
            Welcome to Dancero wizard, please select one of the following
            options :
          </h2>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid key={1} item>
            <Card
              sx={{ maxWidth: 300 }}
              onClick={() => update("place", "home")}
            >
              <CardMedia
                component="img"
                alt="Online"
                height="300"
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
          <Grid key={3} item>
            <Card
              sx={{ maxWidth: 300 }}
              onClick={() => update("place", "studio")}
            >
              <CardMedia
                component="img"
                alt="Studio"
                height="300"
                image={studio}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  studio
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
            <Grid xs={12} item container justifyContent="center" >
              <Fab variant="extended" size="medium" color="primary" onClick={()=> goBackPage()} >
                <ArrowBackIcon/>
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  );
}

export default HomeStudioStep;
