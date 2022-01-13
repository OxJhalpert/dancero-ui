import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Web3 from "web3";
import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";

import StepOne from './Components/stepOne.js';
import StepTwo from './Components/stepTwo.js';
import StepThree from './Components/stepThree.js';
import StepFour from './Components/stepFour.js';
import StepFive from './Components/stepFive.js';
import StepSix from './Components/stepSix.js';
import StepSeven from './Components/stepSeven.js';
import StepEigth from './Components/stepEigth.js';
import StepNine from './Components/stepNine.js';


export default function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user: "",
  });

  async function connect() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      updateData("user", account[0]);
      
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
 
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  function goNextPage() {
    if (page === 9) return;
    setPage((page) => page + 1);
  }

  function goBackPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  function updateData(type, newData) {
    setData((data) => {
      return { ...data, [type]: newData };
    });
    goNextPage();
    
  }
   

  async function transferToken(amount, _contractAbi, _addressContract) {
    const user = await window.web3.eth.getAccounts();
    window.web3.eth.getBlock("latest").then(async function (response) {
      console.log(response.gasLimit);
      window.web3.eth.getGasPrice().then(function (gas) {
        console.log(gas);
        var item = {
          from: user[0],
          gasprice: gas,
          gaslimit: response.gasLimit,
        };
        console.log(item);
        amount = window.web3.utils.toWei(amount, "Ether");
        const contract = new window.web3.eth.Contract(
          _contractAbi,
          _addressContract
        );
        contract.methods
          .transfer("0x02a10A6182B60Ee989fd611cab17bd0512885205", amount)
          .send(item)
          .on("transactionHash", (hash) => {
            alert("Successful payment");
          });
      });
    });
  }

  return (
    <div className="App" >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              Dancero App
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <progress max="9" value={page} />
      </div>
       <div>
        {page === 1 && <StepOne data={data} update={updateData} />}
        {page === 2 && <StepTwo  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 3 && <StepThree  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 4 && <StepFour  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 5 && <StepFive  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 6 && <StepSix  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 7 && <StepSeven  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 8 && <StepEigth  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 9 && (<StepNine  data={data} update={updateData} connect={connect} transferToken={transferToken} goBackPage={goBackPage}/>
        )}
       </div>  
    </div>
  );
}
