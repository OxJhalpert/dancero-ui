import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import Web3 from "web3";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";
import '@fontsource/roboto/300.css';

import LandingPage from './Components/LandingStep.jsx';
import ClassTypeStep from './Components/ClassTypeStep.jsx';
import TeacherGenderStep from './Components/TeacherGenderStep.jsx';
import MusicGenreStep from './Components/MusicGenreStep.jsx';
import LocationStep from './Components/LocationStep.jsx';
import DatesStep from './Components/DatesStep.jsx';
import MembershipStep from './Components/MembershipStep.jsx';
import LevelStep from './Components/LevelStep.jsx';
import HoursStep from './Components/HoursStep.jsx';
import BoardStep from './Components/Board.jsx';

import './css/cards.css';
import HomeStudioStep from "./Components/HomeStudioStep.jsx";

export default function App() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user: "",
  });

  const pages = ['Products', 'Pricing', 'Blog'];
  

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
    if (page === 10) return;
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
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              Dancero App
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        { page > 1 ? <LinearProgress variant="determinate" value={page * 10}  /> : null}
      </div>
       <div>
        {page === 1 && <LandingPage update={updateData}/>}
        {page === 2 && <ClassTypeStep data={data} update={updateData} />}
        {page === 3 && data.Venue === "Offline" ? 
            <HomeStudioStep data={data} update={updateData} /> 
          : page === 3 && data.Venue !== "Offline" ? <TeacherGenderStep  data={data} update={updateData} goBackPage={goBackPage}/> : null }
        {page === 4 && <MusicGenreStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 5 && <LocationStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 6 && <DatesStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 7 && <MembershipStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 8 && <LevelStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 9 && <HoursStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 10 && <BoardStep  data={data} update={updateData} connect={connect} />}
        {page === 11 && <BoardStep  data={data} update={updateData} connect={connect} transferToken={transferToken} goBackPage={goBackPage} />}

       </div> 
    </div>
  );
}
