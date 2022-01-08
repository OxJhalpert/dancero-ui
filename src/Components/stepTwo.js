import {  Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import hombre from "../images/Hombre.png";
import mujer from "../images/mujer.png";

function StepTwo ({ update }) {
    return (
      <Grid sx={{ flexGrow: 2 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid key={3} item>
              <Card sx={{ maxWidth: 345 }}>
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
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Gender", "Woman")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={4} item>
              <Card sx={{ maxWidth: 345 }}>
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
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Gender", "Man")}
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
  export default StepTwo;  