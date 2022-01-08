import {Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DoneIcon from "@mui/icons-material/Done";
import StarIcon from "@mui/icons-material/Star";
import DiamondIcon from "@mui/icons-material/Diamond";


function StepSix({ update }) {
    return (
      <Grid sx={{ flexGrow: 3 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid key={12} item>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <DoneIcon sx={{ minWidth: 200, fontSize: 80 }} />
                  <Typography gutterBottom variant="h5" component="div">
                    Basic
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Service", "Basic ")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={13} item>
              <Card sx={{ maxWidth: 345 }}>
                <StarIcon sx={{ minWidth: 200, fontSize: 80 }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Standard
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Service", "Standard ")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid key={14} item>
              <Card sx={{ maxWidth: 345 }}>
                <DiamondIcon sx={{ minWidth: 200, fontSize: 80 }} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Premium
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => update("Service", "Premium ")}
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


  export default StepSix;  