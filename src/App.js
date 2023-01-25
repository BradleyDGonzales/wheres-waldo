import { useState, useEffect, useRef } from 'react';
import './App.css';
import { db } from './firebase-config'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import NavBar from './components/NavBar.js'
import SelectMap from './components/SelectMap.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MapOne from './components/MapOne';
import MapTwo from './components/MapTwo';
import MapThree from './components/MapThree';
import MapFour from './components/MapFour';

function App() {
  const boxRef = useRef();
  const [count, setCount] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [coords, setCoords] = useState({});
  const [mapName, setMapName] = useState('');
  const coordsCollection = collection(db, "coords");

  const updateCoords = async (id, numX, numY) => {
    const coordDoc = doc(db, "coords", id);
    const newFields = { x: numX, y: numY };
    await updateDoc(coordDoc, newFields)
  }
  const checkPosition = (x, y) => {
    if (x >= 107 && x <= 115 && y >= 65 && y <= 86) {
      alert('found him');
    }
  }

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
          <Route path="/" element={<SelectMap />} />
          <Route path='/mapone' element={<MapOne />} />
          <Route path='/maptwo' element={<MapTwo />} />
          <Route path='/mapthree' element={<MapThree />} />
          <Route path='/mapfour' element={<MapFour />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}


export default App;
