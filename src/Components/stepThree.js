import {Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import salsa from "../images/salsa.jpg";
import reggaeton from "../images/reggaeton.jpg";
import bachata from "../images/bachata.jpg";

function StepThree({ update }) {
    return (
      <Grid sx={{ flexGrow: 3 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid key={5} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="reggaeton"
                  height="140"
                  image={reggaeton}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Reggaeton
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Musical_gender", "Reggaeton ")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={6} item>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  alt="salsa"
                  height="140"
                  image={salsa}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Salsa
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Musical_gender", "Salsa ")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={7} item>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia
                  component="img"
                  alt="bachata"
                  height="140"
                  image={bachata}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Bachata
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Musical_gender", "Bachata ")}
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
  export default StepThree;