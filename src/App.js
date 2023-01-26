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
  const boxRef = useRef();
  const [count, setCount] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const coordsCollection = collection(db, "coords");
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

  const [currentMapData, setCurrentMapData] = useState(mapData);

  const updateCoords = async (id, numX, numY) => {
    const coordDoc = doc(db, "coords", id);
    const newFields = { odlawX: numX, odlawY: numY };
    await updateDoc(coordDoc, newFields)
  }
  const checkPosition = (x, y) => {
    if (x >= 107 && x <= 115 && y >= 65 && y <= 86) {
      alert('found him');
    }
  }


  const checker = (mapName) => {
    // console.log(mapName);
    // console.log('inside app checking if this works')
    setCurrentMapData(currentMapData.filter(key => key === mapName))
  }
  // useEffect(() =>{
  //   setMapData(mapData.filter())
  // })
  // useEffect(() => {
  //   if (Object.keys(coords).length !== 0) {
  //     updateCoords(coords.id, coords.x, coords.y)
  //     checkPosition(coords.x, coords.y);
  //   }
  // })

  // useEffect(() => {
  //   console.log('oahe')
  //   let dataID = '';
  //   const getCoords = async () => {
  //     const data = await getDocs(coordsCollection);
  //     data.docs.map((doc) => dataID = doc.id)
  //   }

  //   getCoords()

  //   const myImg = document.getElementById('myWaldoImage')
  //   // const circle = document.getElementById('circle');
  //   const handleMouseClick = (event) => {
  //     setCoords({ id: dataID, x: event.clientX - event.target.offsetLeft, y: event.clientY - event.target.offsetTop })
  //   };
  //   // circle.addEventListener('click', handleMouseClick);
  //   myImg.addEventListener('click', handleMouseClick);
  //   return () => {
  //     // circle.removeEventListener('click', handleMouseClick)
  //     myImg.removeEventListener('click', handleMouseClick)

  //   }
  // }, [coords]);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<SelectMap checker={checker} mapData={mapData} />} />
          <Route path='/mapone' element={<MapOne mapData={mapData[0]}/>} />
          <Route path='/maptwo' element={<MapTwo mapData={mapData[1]}/>} />
          <Route path='/mapthree' element={<MapThree mapData={mapData[2]}/>} />
          <Route path='/mapfour' element={<MapFour mapData={mapData[3]}/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}


export default App;
