import React, { useEffect, useState } from 'react';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  TextInput
} from 'react95';


export default ({setShowAOL}) => {
  const sisterLetter = `
  Dear beloved sister,

  I've missed you every single day for the past 6 years.
  Thank God that I will get to see you again soon. We're all so excited for you to come here!

  Sending huge hugs and kisses!!!

  - Your lil bro
  `.trim().split('\n').map(line => line.trim()).join('\n')
  return (
    <>
      <Window style={{width: '460px'}} className='window'>
        <WindowHeader style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>America Online - You've got mail!</span>
          <Button style={{marginTop: '2px'}} onClick={()=>{
            setShowAOL(false)}}>
            <b>x</b>
          </Button>
        </WindowHeader>
        <WindowContent>
          <b>Send to: </b>Camille Winters<br />
          <b>Subject: </b>I miss you!
          <TextInput multiline rows={9} defaultValue={sisterLetter} fullWidth />
        </WindowContent>
      </Window>

    </>
  );
}
