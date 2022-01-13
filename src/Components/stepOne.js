import { Typography } from "@mui/material";
//import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import offline from "../images/offline.jpg";
import online from "../images/online.jpg";



function StepOne({ update }) {
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
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
              sx={{ maxWidth: 345 }}
              onClick={() => update("Mode", "Online")}
            >
              <CardMedia
                component="img"
                alt="Online"
                height="140"
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
          <Grid key={2} item>
            <Card
              sx={{ maxWidth: 345 }}
              onClick={() => update("Mode", "Offline")}
            >
              <CardMedia
                component="img"
                alt="Offline"
                height="140"
                image={offline}
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
