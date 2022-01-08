
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
import ListItemAvatar from "@mui/material/ListItemAvatar";
import UstToken from "../abis/UstToken.json";

function createData(name, option) {
  return { name, option };
}


function StepNine({ data, connect, transferToken }) {
    const rows = [
      createData("User", data.user),
      createData("Mode", data.Mode),
      createData("Gender", data.Gender),
      createData("Musical gender", data.Musical_gender),
      createData("City", data.City),
      createData("Service", data.Service),
      createData("Level", data.Level),
      createData("Hours", data.Hours),
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
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Option</TableCell>
                    </TableRow>
                  </TableHead>
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid key={18} item>
              <List
                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Button
                      variant="contained"
                      style={{ margin: "10px" }}
                      onClick={async (e) => {
                        connect();
                      }}
                    >
                      Connect Metamask
                    </Button>
                  </ListItemAvatar>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Button
                      variant="contained"
                      style={{ margin: "10px" }}
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
                  </ListItemAvatar>
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Button variant="contained">Pay with paypal</Button>
                  </ListItemAvatar>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  export default StepNine;  