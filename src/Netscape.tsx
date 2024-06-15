import React, { useState } from 'react';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
} from 'react95';


export default ({setShowNetscape}) => {
  const sites = [
    {
      'title': '33chan',
      url: '/#/guestbook'
    },
    {
      'title': 'My homepage',
      url: '/'
    }
  ]

  const [currentSite, setCurrentSite] = useState(sites[0]);

  return (
    <>
      <Window style={{width: '550px', height: '450px'}} className='window'>
        <WindowHeader style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Netscape Navigator - {currentSite.title}</span>
          <Button style={{marginTop: '2px'}} onClick={()=>{
            setShowNetscape(false)}}>
            <b>x</b>
          </Button>
        </WindowHeader>
        <WindowContent>
          Bookmarks: {
          sites.map(
            site => 
              <Button onClick={
                () =>
                  setCurrentSite(site)
              }
              style={{marginRight: '5px'}}
              >
                {site.title}
              </Button>
            )
          }
          <iframe style={{
            marginTop: '5px',
            width: '100%',
            height: '310px'
          }} src={currentSite.url}></iframe>
        </WindowContent>
      </Window>

    </>
  );
}
