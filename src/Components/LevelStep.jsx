import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
              <Card sx={{ width: 250 }} onClick={() => update("Level", "Semi")}>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div" align="center">
                    Semi
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={16} item>
              <Card sx={{ width: 250}} onClick={() => update("Level", "Pro")}>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div" align="center">
                    Pro
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid key={17} item>
              <Card sx={{ width: 250 }} onClick={() => update("Level", "Master")}>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div" align="center">
                    Master
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} item container justifyContent="center" >
            <Fab variant="extended" size="medium" color="primary" onClick={() => goBackPage()} >
              <ArrowBackIcon />
            </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  export default StepSeven;  