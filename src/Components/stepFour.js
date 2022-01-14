import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
//import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import cali from "../images/cali.jpg";
import bogota from "../images/bogota.jpg";
import cartagena from "../images/cartagena.jpeg";
import medellin from "../images/medellin.jpg";


function StepFour({ update, goBackPage }) {
    return (
      <Grid sx={{ flexGrow: 4 }} container spacing={2} p={2.5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <h2>Please select your city :</h2>
              </Grid>
            </Grid>
            <Grid key={8} item>
              <Card sx={{ maxWidth: 200 }} onClick={() => update("City", "Cartagena")}>
                <CardMedia
                  component="img"
                  alt="cartagena"
                  height="140"
                  image={cartagena}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Cartagena
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={9} item>
              <Card sx={{ maxWidth: 200 }} onClick={() => update("City", "Bogota ")}>
                <CardMedia
                  component="img"
                  alt="bogota"
                  height="140"
                  image={bogota}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Bogota
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={10} item>
              <Card sx={{ maxWidth: 200 }} onClick={() => update("City", "Medellin ")}>
                <CardMedia
                  component="img"
                  alt="medellin"
                  height="140"
                  image={medellin}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Medellin
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={11} item>
              <Card sx={{ maxWidth: 200 }} onClick={() => update("City", "Cali")}>
                <CardMedia component="img" alt="cali" height="140" image={cali} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Cali
                  </Typography>
                </CardContent>
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

  export default StepFour;  