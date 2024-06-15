import React from 'react';
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Window,
  WindowContent,
  WindowHeader
} from 'react95';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5rem;
  background: ${({ theme }) => theme.desktopBackground};
`;

export default {
  title: 'Controls/Table',
  component: Table,
  subcomponents: {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableHeadCell,
    TableDataCell
  },
  decorators: [story => <Wrapper>{story()}</Wrapper>]
};

const songs = [
  {
    'title': 'I hate it here',
    'artist': 'Chillzara',
    'file': 'chillzara.mp3'
  },
  {
    'title': 'Morning star',
    'artist': 'Gezebelle',
    'file': 'gez.mp3'
  },
  {
    'title': 'The communists have the music',
    'artist': 'TMBG',
    'file': 'giants.mp3'
  },
  {
    'title': 'No soy de aqui ni soy de allá',
    'artist': 'Jorge Cafrune',
    'file': 'jorge.mp3'
  },
  {
    'title': 'Obey NATO',
    'artist': 'Cereal XP',
    'file': 'cereal.mp3'
  }
]

export function NapsterSelect({setCurrentSong}) {
  return (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Artist</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {songs.map(song=>(
              <TableRow onClick={()=>setCurrentSong(song)}>
                <TableDataCell style={{ textAlign: 'center' }}>
                  <span role='img' aria-label='lightning'>
                    {song.artist}
                  </span>
                </TableDataCell>
                <TableDataCell>{song.title}</TableDataCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

  );
}

NapsterSelect.story = {
  name: 'default'
};
