import logo from '../img/logo.png';


const NavBar = () => {
    return (
        <>
            <nav className='navbar'>
                <img id='navLogo' src={logo} alt="logo"/>
                <h3>Where's Waldo</h3>
            </nav>

        </>
    )
}

export default NavBar;