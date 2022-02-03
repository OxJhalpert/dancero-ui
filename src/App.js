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
    if (page === 11) return;
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
    var chainId = await window.ethereum.request({  method: 'eth_chainId'  });
    const user = await window.web3.eth.getAccounts();
    if (chainId === '0x6357d2e0')
    {
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
    }else
    {
      window.alert('Please select Harmony Mainet')
    }
  }

  return (
    <div className="App" >
      <Box sx={{ flexGrow: 2, bgcolor: "#2F348B" }}>
        <AppBar position="static" sx={{ bgcolor: "#2F348B" }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
              Dancero 
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
        { page > 1 ? <LinearProgress variant="determinate" value={(page -1)* 10}  /> : null}
      </div>
       <div>
        {page === 1 && <LandingPage update={updateData}/>}
        {page === 2 && <ClassTypeStep data={data} update={updateData} setPage={setPage}/>  }
        {page === 3 &&  <LocationStep  data={data} update={updateData} goBackPage={goBackPage} setPage={setPage}/>  }
        {page === 4 && <HomeStudioStep data={data} update={updateData} goBackPage={goBackPage} />}
        {/* {page === 3 && data.Venue === "Offline" ? 
            <HomeStudioStep data={data} update={updateData} /> 
          : page === 3 && data.Venue !== "Offline" ? <TeacherGenderStep  data={data} update={updateData} goBackPage={goBackPage}/> : null } */}
        {page === 5 && <TeacherGenderStep data={data} update={updateData} goBackPage={goBackPage} setPage={setPage}/>}
        {page === 6 && <MusicGenreStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 7 && <MembershipStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 8 && <HoursStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 9 && <LevelStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 10 && <DatesStep  data={data} update={updateData} goBackPage={goBackPage}/>}
        {page === 11 && <BoardStep  data={data} update={updateData} connect={connect} transferToken={transferToken} goBackPage={goBackPage} />}
       
       </div> 
    </div>
  );
}
