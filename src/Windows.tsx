import React, { useState, useEffect } from "react";

import { AppBar, Button, MenuList, MenuListItem, Separator, Toolbar, styleReset } from 'react95';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Netscape from "./Netscape.tsx";
import Napster from "./Napster.tsx";
import Trash from "./Trash.tsx";
import Kali from "./Kali.tsx";
import AOL from "./AOL.tsx";

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;


export default ({handleClose}) => {
  const [open, setOpen] = useState(false);
  const [showNetscape, setShowNetscape] = useState(false);
  const [showNapster, setShowNapster] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [showKali, setShowKali] = useState(false);
  const [showAOL, setShowAOL] = useState(false);

  useEffect(()=>{
    if (window.location.hash.includes('33chan')) {
      setShowNetscape(true)
    }
  }, [])

  return (
    <div style={{height: '100%'}}>
    <ThemeProvider theme={original}>
      {/* put screen here, make app par just @ bottom */}
      <div style={{
        position: 'absolute',
        top: '90px',
        left: '145px'
      }}>
        {(showAOL) ? <AOL setShowAOL={setShowAOL} /> : ''}
        {(showNetscape) ? <div style={{
        position: 'absolute',
        top: '-45px',
        left: '-20px'
      }}><Netscape setShowNetscape={setShowNetscape} /></div> : ''}
        {(showNapster) ? <Napster setShowNapster={setShowNapster} /> : ''}
        {(showTrash) ? <Trash setShowTrash={setShowTrash} setShowKali={setShowKali} /> : ''}
        {(showKali) ? <div style={{
        position: 'absolute',
        top: '-30px',
        left: '80px'
      }}><Kali setShowKali={setShowKali} /></div> : ''}
      </div>
      <div id="windows-background" style={{
        textAlign: 'center',
        width: 'max-content',
        color: 'white',
        height: '92%',
        padding: '20px',
      }}>
        
        <div onClick={()=>setShowTrash(true)}
        style={{
          cursor: 'pointer',
}}>
          <img width="60px" src="/bin.png"></img><br />
          Recycling Bin
        </div>
        <div 
          onClick={()=>setShowNapster(true)}
          style={{
            cursor: 'pointer',
          marginTop: '20px'
        }}>
          <img width="70px" src="/napster.png"></img><br />
          Napster
        </div>
      </div>
      <AppBar style={{position: 'relative', bottom: '0px'}} position="inherit">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: 'bold', width: '110px' }}
          >
            <img
              src="/windows_logo.png"
              alt='windows logo'
              style={{ height: '20px', marginRight: 10 }}
            />
            Start
          </Button>
          {open && (
            <MenuList
              style={{
                position: 'absolute',
                left: '0',
                bottom: '65%',
                width: '130px'
              }}
              onClick={() => setOpen(false)}
            >
              <MenuListItem onClick={()=>setShowNetscape(true)}>
                <span role='img' aria-label='🌐'>
                🌐
                </span>
                Netscape
              </MenuListItem>
              <MenuListItem onClick={()=>setShowAOL(true)}>
                <span role='img' aria-label='📫'>
                📫
                </span>
                AOL Mail
              </MenuListItem>
              <MenuListItem disabled>
                <span role='img' aria-label='👨‍💻'>
                  <b>&gt;_</b>
                </span>
                cmd.exe
              </MenuListItem>
              <Separator />
              <MenuListItem onClick={() => {(new Audio('/shutoff.mp3')).play();setTimeout(()=>{handleClose()}, 300)}}>
                <span role='img' aria-label='⏻'>
                 <b>⏻</b>
                </span>
                Power-off
              </MenuListItem>
            </MenuList>
          )}
        </div>
        <div style={{marginRight: '10px'}}>{(new Date()).toLocaleTimeString()}</div>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  </div>
  )
}