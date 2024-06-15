import React, { useEffect, useState } from 'react';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader
} from 'react95';
import { NapsterSelect } from './NapsterSelect.tsx';


export default ({setShowNapster}) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [audio, setAudio] = useState(null)
  useEffect(()=>{
    if (currentSong !== null) {
      if (audio !== null) {
        audio.pause()
      }
      const newAudio = new Audio(`/${currentSong.file}`)
      newAudio.play()
      setAudio(newAudio)
    } else {
      if (audio !== null) {
        audio.pause()
      }
    }
  }, [currentSong])

  return (
    <>
      <Window style={{width: '500px'}} className='window'>
        <WindowHeader style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Napster - share tunes!</span>
          <Button style={{marginTop: '2px'}} onClick={()=>{
            if (audio !== null) audio.pause();
            setCurrentSong(null);
            setShowNapster(false)}}>
            <b>x</b>
          </Button>
        </WindowHeader>
        <WindowContent>
          <table>
            <tr>
              <td>Now playing:</td>
              <td><marquee style={{ marginLeft: '5px', marginTop: '3px', width: '200px' }}>{currentSong?.artist} {(currentSong) ? '-' : ''} {currentSong?.title}</marquee></td>
            </tr>
            <tr>
              <td>
                
              </td>
            </tr>
          </table>
          <NapsterSelect setCurrentSong={setCurrentSong} />
        </WindowContent>
      </Window>

    </>
  );
}
