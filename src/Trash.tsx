import React, { useEffect, useState } from 'react';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  ScrollView
} from 'react95';


export default ({setShowTrash, setShowKali}) => {

  return (
    <>
      <Window style={{width: '500px'}} className='window'>
        <WindowHeader style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Recycling Bin</span>
          <Button style={{marginTop: '2px'}} onClick={()=>{
            setShowTrash(false)}}>
            <b>x</b>
          </Button>
        </WindowHeader>
        <WindowContent>
          <ScrollView style={{
            backgroundColor: 'white',
            height: '300px',
            width: '100%',
          }}>
            <div onClick={()=>setShowKali(true)} style={{textAlign: 'center', width: 'max-content', margin: '20px', cursor: 'pointer'}}>
              <img style={{width: '60px', marginBottom: '5px'}} src='/imgicon.svg'></img>
              <br />Black Boobies.jpg
            </div>
          </ScrollView>
        </WindowContent>
      </Window>

    </>
  );
}
