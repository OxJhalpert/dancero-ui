import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import online from "../images/online.jpg";
import studio from '../images/studio.jpg';



function StepOne({ update, setPage  }) {
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
              onClick={() => {
                // setPage(3)
                update("Venue", "Online")}
              }
            >
              <CardMedia
                component="img"
                alt="Online"
                height="300"
                image={online}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Online
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid key={3} item>
            <Card
              sx={{ maxWidth: 300 }}
              onClick={() =>   
              update("Venue", "Offline")}
              
            >
              <CardMedia
                component="img"
                alt="Studio"
                height="300"
                image={studio}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Offline
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
