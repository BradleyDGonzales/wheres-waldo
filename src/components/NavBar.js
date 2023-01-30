import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import leaderboardLogo from '../img/leaderboard.png'
const NavBar = () => {

    return (
        <>
            <nav className='navbar'>
                <Link to={"/"} >
                    <img id='navLogo' src={logo} alt="logo" />
                </Link>
                <h3>Where's Waldo</h3>
                <Link id='leaderboardTag' to={"/leaderboard"}>
                    <img width={35} src={leaderboardLogo} alt="leadearboardLogo" />
                    <h3>Leaderboard</h3>
                </Link>
            </nav>

        </>
    )
}

export default NavBar;