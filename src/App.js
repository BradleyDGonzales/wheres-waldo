import { useState, useEffect, useRef } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import NavBar from './components/NavBar.js'
import SelectMap from './components/SelectMap.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import mapone from './img/mapone.jpg'
import maptwo from './img/maptwo.jpg'
import mapthree from './img/mapthree.jpg'
import mapfour from './img/mapfour.jpg'
import waldo from './img/waldo.png'
import wenda from './img/wenda.png'
import odlaw from './img/odlaw.png'
import wizard from './img/wizard.png'
import woof from './img/woof.png'
import MapOne from './components/MapOne';
import MapTwo from './components/MapTwo';
import MapThree from './components/MapThree';
import MapFour from './components/MapFour';

function App() {
  const [mapData, setMapData] = useState([
    {
      img: mapone,
      characters: [waldo, wenda, odlaw, wizard, woof],
      mapName: `Where's Waldo At The Beach`
    },
    {
      img: maptwo,
      characters: [waldo, wenda, odlaw, wizard, woof],
      mapName: `Where's Waldo In Outer Space`
    },
    {
      img: mapthree,
      characters: [waldo, wenda, odlaw, wizard, woof],
      mapName: `Where's Waldo Ski Slopes`
    },
    {
      img: mapfour,
      characters: [waldo, wenda, odlaw, wizard, woof],
      mapName: `Where's Waldo At A Track Meet`
    }
  ])
  
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<SelectMap mapData={mapData} />} />
          <Route path='/mapone' element={<MapOne mapData={mapData[0]} />} />
          <Route path='/maptwo' element={<MapTwo mapData={mapData[1]} />} />
          <Route path='/mapthree' element={<MapThree mapData={mapData[2]} />} />
          <Route path='/mapfour' element={<MapFour mapData={mapData[3]} />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}


export default App;
