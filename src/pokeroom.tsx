import useKeypress from 'react-use-keypress';
import React, { useEffect, useState } from 'react';
import PC from './PC.tsx'
import './App.css'

function Pokeroom({handleClose}) {
  const height = 600;
  const width = 600;
  const playerWidth = 48;
  const playerHeight = 60;
  const [playerHistory, setPlayerHistory]: any = useState([['left', [252, 140]], ['left', [264, 140]]].reverse());

  const [openPC, setOpenPC] = useState(false)
  const [stepping, setStepping] = useState(false)
  const [companionPosition, setCompanionPosition] = useState([260, 140]);
  const [playerPosition, setPlayerPosition] = useState([220, 140]);
  const [playerFacing, setPlayerFacing] = useState('down')
  const [companionFacing, setCompanionFacing] = useState('down')

  useEffect(()=>{
    setPlayerHistory(playerHistory.concat([[playerFacing, playerPosition]]))
  }, [playerPosition])

  useEffect(()=>{
    if (playerPosition[1] < -110) {
      handleClose()
    }
    if (playerHistory.length % 3 === 0) {
      setStepping(true);
    } else {
      setStepping(false);
    }
  }, [playerPosition])

  useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'], (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (playerFacing !== 'left')
            setPlayerFacing('left')
        if (playerPosition[1] <= -15)
          if (playerPosition[0] > 300 && playerPosition[0] < 450) {
            setOpenPC(true)
            break
          }

        if ((playerPosition[0]-12) >= -15)
          setPlayerPosition([playerPosition[0]-12, playerPosition[1]]);
        break;
      case 'ArrowRight':
        if (playerFacing !== 'right')
          setPlayerFacing('right')
        // bump into desk
        if (playerPosition[1] <= -15)
          if (playerPosition[0] > 283 && playerPosition[0] < 400) {
            setOpenPC(true)
            break
          }
        if ((playerPosition[0]+12) <= (width - playerWidth))
        setPlayerPosition([playerPosition[0]+12, playerPosition[1]]);
        break;
      case 'ArrowUp':
        if (playerFacing !== 'up')
          setPlayerFacing('up')
        // desk
        if (playerPosition[0] > 290 && playerPosition[0] < 440) {
          if (playerPosition[1] < 0) {
            setOpenPC(true)
            break
          }
        // go through door if it's there...
        } 
        if (playerPosition[0] > 35 && playerPosition[0] < 150 - playerWidth) {
          //if ((playerPosition[1]) > 0)
            setPlayerPosition([playerPosition[0], playerPosition[1]-12]);
        } else if ((playerPosition[1]) > -50)
        setPlayerPosition([playerPosition[0], playerPosition[1]-12]);
        // get blocked by desk...
        break;
      case 'ArrowDown':
        if (playerFacing !== 'down')
          setPlayerFacing('down')
        if ((playerPosition[1]+12) <= (height - playerHeight))
        setPlayerPosition([playerPosition[0], playerPosition[1]+12]);
        break;
    }

    if (playerHistory.length >= 5) {
      if (playerHistory.length === 7) {
        setCompanionFacing(playerHistory.slice(-4)[0][0])
      } else {
        setCompanionFacing(playerHistory.slice(-5)[0][0])
      }
      setCompanionPosition(playerHistory.slice(-5)[0][1])
    }
  });
  
  useEffect(()=>{
    if (window.location.hash.includes('33chan')) {
      setOpenPC(true)
    }
  }, [])

  if (openPC) {
    return <PC handleClose={()=>setOpenPC(false)} />
  }

  return (
    <div id="page" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <div style={{     
        position: 'relative', 
        border:"10px solid black",
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: 'beige'
      }} id="screen">
        <img 
          id="player"
          style={{
            zIndex: 100000,
            position: "relative",
            left: `${playerPosition[0]}px`,
            top: `${playerPosition[1]}px`,
            width: '78px',
            height: '85px'
          }} src={
            (!stepping) 
            ? `${playerFacing}_still.png` 
            : `${playerFacing}_step.png`}>
        </img>
        <img style={{
          zIndex: 10001,
          position: "relative",
          left: `${companionPosition[0]-72}px`,
          top: `${companionPosition[1]-4}px`,
          width: '68px',
          height: '68px'
        }} src={`companion_${companionFacing}.png`}>
        </img>
        <img style={{
          position: "relative",
          left: `200px`,
          top: `-45px`,
          width: '120px',
        }} src={`desk.png`}></img>
        <img id="big-bed" style={{
          position: "relative",
          left: `-240px`,
          top: `380px`,
          width: '180px',
        }} src={`bed.png`}></img>
      </div>
    </div>

  );
}

export default Pokeroom;
