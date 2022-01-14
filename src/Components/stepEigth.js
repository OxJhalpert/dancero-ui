import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
//import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";




function StepEigth({ update, goBackPage }) {
    return (
      <Grid sx={{ flexGrow: 3 }} container spacing={2} p={2.5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <h2>Please select the pack of hours :</h2>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid key={18} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Hours", "5")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    5
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={19} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Hours", "10")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    10
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={20} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Hours", "15")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    15
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={21} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Hours", "20")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    20
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={22} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Hours", "30")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    30
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={23} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Hours", "40")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    40
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={24} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Hours", "50")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    50
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} item container justifyContent="center" >
            <Button
                  size='small'
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


  export default StepEigth;  