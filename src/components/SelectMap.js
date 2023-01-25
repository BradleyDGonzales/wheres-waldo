import mapone from '../img/mapone.jpg'
import maptwo from '../img/maptwo.jpg'
import mapthree from '../img/mapthree.jpg'
import mapfour from '../img/mapfour.jpg'
import waldo from '../img/waldo.png'
import wenda from '../img/wenda.png'
import odlaw from '../img/odlaw.png'
import wizard from '../img/wizard.png'
import woof from '../img/woof.png'
import uniqid from 'uniqid'
import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
const SelectMap = () => {




    useEffect(() => {
        console.log('ohays')
    })
    const [mapDetails, setMapDetails] = useState([
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


    let currentMap = '';

    useEffect(() => {
    })
    const handleLinkClick = (event) => {
        currentMap = event.target.src.substring(event.target.src.lastIndexOf('/') + 1, event.target.src.indexOf('.'))
    }

    return (
        <div className='container'>
            <div className="myImage">
                {mapDetails.map((selectedMap) => {
                    return (
                        <div key={uniqid()} className='levelCard'>
                            <div key={uniqid()} className="charactersToFind">
                                {selectedMap.characters.map((character) => {
                                    return (
                                        <img key={uniqid()} alt="charactericon" className='characterIcons' src={character} />
                                    )
                                })}
                            </div>
                            <div key={uniqid()} className='levelMap'>
                                <Link onClick={(e) => handleLinkClick(e)} to={`/${selectedMap.img.substring(selectedMap.img.lastIndexOf('/') + 1, selectedMap.img.indexOf('.'))}`}>
                                    <img alt="map" className='mapImage' src={selectedMap.img}></img>
                                </Link>
                                <h3>{selectedMap.mapName}</h3>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default SelectMap;