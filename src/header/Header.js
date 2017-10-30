import React from 'react';
import LinkContainer from './LinkContainer';
import {
    Navbar,
    NavItem,
    NavDropdown,
    MenuItem,
	FormControl,
	Button,
	FormGroup, 
	ControlLabel,
    Nav
} from 'react-bootstrap'

import ButtonBar from './ButtonBar'

class Header extends React.Component {
    render() {
        return (
            <Navbar collapseOnSelect fixedTop className="test">
                <Navbar.Header>
                    <Navbar.Brand>
                        Reciprocity™
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer exact to="/" ><NavItem eventKey={1}>Home</NavItem></LinkContainer >
                        <LinkContainer exact to="/about"><NavItem eventKey={2}>About</NavItem></LinkContainer>
						<Navbar.Form pullLeft>
						<FormGroup>
							<FormControl type="text" placeholder="Search for recipes..." />
							{' '}
							<Button type="search" onClick={() => null}>Search!</Button>
						</FormGroup>
                        </Navbar.Form>
						<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <LinkContainer exact to="/topics"><MenuItem eventKey={3.1}>Topics</MenuItem></LinkContainer>
                            <LinkContainer exact to="/calculator"><MenuItem eventKey={3.2}>Calculator </MenuItem></LinkContainer>
                            <LinkContainer exact to="/about"><MenuItem eventKey={3.3}>About </MenuItem></LinkContainer>
                            <MenuItem divider />
                            <LinkContainer exact to="/"><MenuItem eventKey={3.3}>Home </MenuItem></LinkContainer>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <ButtonBar/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Header;