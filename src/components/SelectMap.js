// import mapone from '../img/mapone.jpg'
// import maptwo from '../img/maptwo.jpg'
// import mapthree from '../img/mapthree.jpg'
// import mapfour from '../img/mapfour.jpg'
// import waldo from '../img/waldo.png'
// import wenda from '../img/wenda.png'
// import odlaw from '../img/odlaw.png'
// import wizard from '../img/wizard.png'
// import woof from '../img/woof.png'
import uniqid from 'uniqid'
import { useEffect} from 'react'
import {Link} from 'react-router-dom'
const SelectMap = ({ checker, mapData }) => {
    

    useEffect(() => {
        console.log('ohay11s', mapData)

    })
    return (
        <div className='container'>
            <div className="myImage">
                {mapData.map((selectedMap) => {
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
                                <Link onClick={() => checker(selectedMap.img)} to={`/${selectedMap.img.substring(selectedMap.img.lastIndexOf('/') + 1, selectedMap.img.indexOf('.'))}`}>
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