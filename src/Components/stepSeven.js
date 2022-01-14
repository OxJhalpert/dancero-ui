import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
//import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";



function StepSeven({ update, goBackPage }) {
    return (
      <Grid sx={{ flexGrow: 3 }} container spacing={2} p={2.5}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={2}>
                <h2>Please select level you want :</h2>
              </Grid>
            </Grid>
            <Grid key={15} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Level", "Semi")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Semi
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={16} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Level", "Pro")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Pro
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={17} item>
              <Card sx={{ maxWidth: 345 }} onClick={() => update("Level", "Master")}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Master
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

  export default StepSeven;  