import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default function BootstrapNavbar({ handleLogout, currentUser }) {
    // if the user is logged in
    const loggedIn = (
        <>
            {/* if the user is loggerd in..... */}
            <Nav.Link>
                <Link to="/">
                    {/* todo: app function to logout */}
                    <span onClick={handleLogout}>log out</span>
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/profile">Profile</Link>
            </Nav.Link>
        </>
    );

    // if the user is logged out
    const loggedOut = (
        <>
            {/* if the user in logged out..... */}
            <Nav.Link>
                <Link to="/register">register</Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/login">login</Link>
            </Nav.Link>
        </>
    );

    //     {/* <Link to="/">User App</Link>
    // {currentUser ? loggedIn : loggedOut} */}
    return (
        <Navbar className="bg-custom" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav styles={{textDecoration: "none"}} className="me-auto">
                        <Nav.Link>
                            <Link to="/">Home Page</Link>
                        </Nav.Link>
                        {currentUser ? loggedIn : loggedOut} 
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
