import React, { useEffect, useState } from 'react';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView
} from 'react95';


export default ({setShowKali}) => {

  return (
    <>
      <Window style={{width: '360px'}} resizable className='window'>
        <WindowHeader style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Black boobies.jpg</span>
          <Button style={{marginTop: '2px'}} onClick={()=>{
            setShowKali(false)}}>
            <b>x</b>
          </Button>
        </WindowHeader>
        <WindowContent>
          <center><img style={{width: '300px'}} src='kali.webp'></img></center>
        </WindowContent>
      </Window>

    </>
  );
}
