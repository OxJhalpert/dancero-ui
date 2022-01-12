
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import UstToken from "../abis/UstToken.json";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function createData(name, option, name2, option2) {
  return { name, option, name2, option2 };
}


function StepNine({ data, connect, transferToken, goBackPage }) {

  const rows = [
    createData(<b>Date from</b>, '', <b>City</b>, data.City),
    createData(<b>Date to</b>, '', <b>Service Type</b>, data.Service),
    createData(<b>Mode</b>, data.Mode, <b>Level</b>, data.Level),
    createData(<b>Teacher Gender</b>, data.Gender, <b>Hours Pack</b>, data.Hours),
    createData(<b>Musical genre</b>, data.Musical_gender),

  ];
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid key={1} item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                  </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}

                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.option}</TableCell>
                      <TableCell align="right">{row.name2}</TableCell>
                      <TableCell align="right">{row.option2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid key={30} item>
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
              <ListItem>
                <Grid key={19} item>
                  <Card  >
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Total to Pay
                      </Typography>
                      <Typography variant="h2" component="div">
                        10 USD
                      </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                  </Card>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid key={19} item>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Pay with crypto
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        style={{ margin: "10px" }}
                        onClick={async (e) => {
                          connect();
                        }}
                      >
                        Connect Metamask
                      </Button>
                      <Button
                        variant="contained"
                        style={{ margin: "10px" }}
                        disabled={!data.user}
                        id="btnPay"
                        onClick={async (event) => {
                          var amount = "15";
                          var _contractAbi = UstToken.abi;
                          var _addressContract =
                            "0x67862E5fD5DdCDAC1007786d8ce4469dDa847635";
                          transferToken(amount, _contractAbi, _addressContract);
                        }}
                      >
                        Pay with UST
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid key={19} item>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Pay with FIAT
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant="contained" >pay with paypal</Button>
                      <Button variant="contained" >pay with stripe</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid key={19} item>
                  <Card sx={{ maxWidth: 80 }}>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => goBackPage()}
                      >
                        back
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default StepNine;  