import { useEffect, useState } from 'react';
import { db } from '../firebase-config.js'
import { collection, getDocs } from 'firebase/firestore'
import mapone from '../img/mapone.jpg'
import uniqid from 'uniqid'
import Timer from './Timer.js';
const MapOne = ({ mapData }) => {

    let dataCoords;
    let currentX;
    let currentY;
    const [currentCharacters, setCurrentCharacters] = useState(mapData.characters);
    const [gameClearCheck, setGameClearCheck] = useState(false);
    const coordsCollection = collection(db, "coords");

    const checkWin = () => {
        if (currentCharacters.length === 0) {
            setGameClearCheck(true)
        }
        else {
            setGameClearCheck(false)
        }
    }
    const checkCoordinates = (char) => {
        const character = char.substring(char.lastIndexOf('/') + 1).split('.')[0]
        console.log(character);


        console.log('Min X: ', + dataCoords[0][`${character}MinX`]);
        console.log('Max X: ', + dataCoords[0][`${character}MaxX`]);
        console.log('Min Y: ', + dataCoords[0][`${character}MinY`]);
        console.log('Max Y: ', + dataCoords[0][`${character}MaxY`]);

        if (currentX >= dataCoords[0][`${character}MinX`] && currentX <= dataCoords[0][`${character}MaxX`] && currentY >= dataCoords[0][`${character}MinY`] && currentY <= dataCoords[0][`${character}MaxY`]) {
            const updatedCharacters = currentCharacters.filter((char) => !(char.substring(char.lastIndexOf('/') + 1).split('.')[0]).includes(character));
            setCurrentCharacters(updatedCharacters, () => checkWin());

        }
        else {
            console.log('sorry, that was not ' + character)
        }



    }
    useEffect(() => {
        checkWin()
    },[currentCharacters])

    const togglePopUp = (e) => {
        checkCoordinates(e.target.src,)
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
        currentX = (Math.round((offsetX / width) * 175))
        currentY = (Math.round((offsetY / height) * 175))

        const clickPositionX = e.clientX - parentPosition.x - (popup.offsetWidth / 2);
        const clickPositionY = e.clientY - parentPosition.y - (popup.offsetHeight / 2)
        let translate3DValue = "translate3d(" + (clickPositionX + 30) + "px," + clickPositionY + "px, 0)"

        popup.classList.add('active');
        popup.style.transform = translate3DValue;
    };


    useEffect(() => {
        const getCoords = async () => {
            const data = await getDocs(coordsCollection);
            const tempArray = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dataCoords = tempArray.filter((data) => data.id === 'mapone');
        }
        getCoords();
    },);

    return (
        <>

            <div className='container'>
                <Timer gameClearCheck={gameClearCheck} />
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
                </div>
            </div >

        </>
    )
}

export default MapOne;