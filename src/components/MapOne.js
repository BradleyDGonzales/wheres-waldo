import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase-config.js'
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
import mapone from '../img/mapone.jpg'
import uniqid from 'uniqid'
import { useFetcher } from 'react-router-dom';
const MapOne = ({ mapData }) => {

    const imgRef = useRef();
    const [currentCharacters, setCurrentCharacters] = useState(mapData.characters)
    const [coords, setCoords] = useState({});
    const coordsCollection = collection(db, "coords");
    // const updateCoords = async (id, numX, numY) => {
    //     const coordDoc = doc(db, "coords", id);
    //     const newFields = { waldoX: numX, waldoY: numY };
    //     await updateDoc(coordDoc, newFields)
    // }
    // const checkPosition = (x, y) => {
    //     if (x >= 107 && x <= 115 && y >= 65 && y <= 86) {
    //         alert('found him');
    //     }
    // }

    const checkCoordinates = (char) => {
        const character = char.substring(char.lastIndexOf('/') + 1, char.indexOf('.'))
        console.log(character);
        console.log(currentCharacters);
    }
    const togglePopUp = (e) => {
        checkCoordinates(e.target.src)
        const popup = document.querySelector('.popup')
        popup.classList.remove('active')
    }
    const getPosition = (el) => {
        let xPosition = 0;
        let yPosition = 0;
        while (el) {
            if (el.tagName === "BODY") {
                // deal with browser quirks with body/window/document and page scroll
                let xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
                let yScrollPos = el.scrollTop || document.documentElement.scrollTop;

                xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
                yPosition += (el.offsetTop - yScrollPos + el.clientTop);
            } else {
                xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
            }

            el = el.offsetParent;
        }
        return {
            x: xPosition,
            y: yPosition
        };
    }

    const charactersPopUp = (e) => {
        const parentPosition = getPosition(document.querySelector('.map'))
        const popup = document.querySelector('.popup')
        const { width, height } = e.target.getBoundingClientRect();
        const { offsetX, offsetY } = e.nativeEvent;
        const currentX = (Math.round((offsetX / width) * 175))
        const currentY = (Math.round((offsetY / height) * 175))

        const clickPositionX = e.clientX - parentPosition.x - (popup.offsetWidth / 2);
        const clickPositionY = e.clientY - parentPosition.y - (popup.offsetHeight / 2)
        let translate3DValue = "translate3d(" + (clickPositionX + 30) + "px," + clickPositionY + "px, 0)"
        document.getElementById('x').textContent = `X: ${currentX}`
        document.getElementById('y').textContent = `Y: ${currentY}`

        popup.classList.add('active');
        popup.style.transform = translate3DValue;
    };
    let firebaseDataID = '';
    useEffect(() => {
        const getCoords = async () => {
            const data = await getDocs(coordsCollection);
            const tempArray = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            const dataCoords = tempArray.filter((data) => data.id === 'mapone');
            console.log(dataCoords);
        }
        getCoords();



        // const myImg = document.getElementById('mapone')
        // // const circle = document.getElementById('circle');
        // const handleMouseClick = (event) => {
        //     console.log(event);
        //     setCoords({ id: firebaseDataID, x: event.offsetX, y: event.offsetY })
        // };
        // // circle.addEventListener('click', handleMouseClick);
        // // myImg.addEventListener('click', (e) => printCoordinates(e));
        // // return () => {
        // //     // circle.removeEventListener('click', (e) => printCoordinates(e))
        // //     myImg.removeEventListener('click', (e) => printCoordinates(e))

        // // }
    },[]);
    console.log(coords);
    // useEffect(() => {
    //     if (Object.keys(coords).length !== 0) {
    //         updateCoords(coords.id, coords.x, coords.y)
    //         checkPosition(coords.x, coords.y);
    //     }
    // })

    return (
        <div className='container'>
            <div className="charactersToFind active">

                {mapData.characters.map((char) => {
                    return (
                        <img key={uniqid()} className='characterIcons' alt='charLogo' src={char} />
                    )
                })}
            </div>
            <div className='map'>
                <div className='popup'>
                    <ul className='charactersToFindList'>
                        {currentCharacters.map((char) => {
                            const characterName = char.substring(char.lastIndexOf('/') + 1, char.indexOf('.'))
                            return (
                                <div key={uniqid()}>
                                    <img onClick={(e) => togglePopUp(e)} alt='charImage' key={uniqid()} src={char} width="40" height="40" />
                                    <li key={uniqid()} className="currentCharactersToFindList">{characterName.charAt(0).toUpperCase() + characterName.slice(1)}</li>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                <img onClick={(e) => charactersPopUp(e)} className='currentMap' id="mapone" src={mapone} alt='mapone' />
                <p id='x'></p>
                <p id='y'></p>
            </div>
        </div >
    )
}

export default MapOne;