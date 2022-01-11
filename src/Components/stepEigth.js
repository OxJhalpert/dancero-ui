import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function StepEigth({ update, goBackPage }) {
    return (
      <Grid sx={{ flexGrow: 3 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <h2>Please select the pack of hours :</h2>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid key={18} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    5
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Hours", "Five")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={19} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    10
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Hours", "Ten")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={20} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    15
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Hours", "Fifteen")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={21} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    20
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Hours", "Twenty")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={22} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    30
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Hours", "Thirty")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={23} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    40
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Hours", "Forty")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={24} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    50
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Hours", "Fifty")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Button
                  size='samll'
                  variant="contained"
                  onClick={()=> goBackPage()}
                  >                  
                    back
                  </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }


  export default StepEigth;  