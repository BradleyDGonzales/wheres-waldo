import uniqid from 'uniqid'
import { Link } from 'react-router-dom'
const SelectMap = ({ mapData }) => {
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
                                <Link to={`/${selectedMap.img.substring(selectedMap.img.lastIndexOf('/') + 1, selectedMap.img.indexOf('.'))}`}>
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