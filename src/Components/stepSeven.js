import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";



function StepSeven({ update, goBackPage }) {
    return (
      <Grid sx={{ flexGrow: 3 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid key={15} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Semi
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Level", "Semi")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={16} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Pro
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Level", "Pro")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={17} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Master
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Level", "Master")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={26} item>
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