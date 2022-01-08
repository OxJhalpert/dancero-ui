import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import cali from "../images/cali.jpg";
import bogota from "../images/bogota.jpg";
import cartagena from "../images/cartagena.jpeg";
import medellin from "../images/medellin.jpg";


function StepFour({ update }) {
    return (
      <Grid sx={{ flexGrow: 4 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid key={8} item>
              <Card sx={{ maxWidth: 200 }}>
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
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("City", "Cartagena")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={9} item>
              <Card sx={{ maxWidth: 200 }}>
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
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("City", "Bogota ")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={10} item>
              <Card sx={{ maxWidth: 200 }}>
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
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("City", "Medellin ")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={11} item>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia component="img" alt="cali" height="140" image={cali} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Cali
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("City", "Cali")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  export default StepFour;  