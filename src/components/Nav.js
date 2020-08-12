import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../firebase'
/// Styling ///
import { Menu, Container } from 'semantic-ui-react'

const Nav = () => (
        <Menu>
            <Container>
                <Menu.Item header as={Link} to="/">Minderva</Menu.Item>
                <Menu.Item name="Review" as={NavLink} to="/quiz" />
                <Menu.Item name="Add Cards" as={NavLink} to="/add-cards" />
                <Menu.Item name="Card Collection" as={NavLink} to="/card-collection" />
                <Menu.Item name="User Profile" as={NavLink} to="/user-profile" />
                <Menu.Menu position="right">
                    <Menu.Item name="Sign Out" as={Link} to="/" onClick={signOut}/>
                </Menu.Menu>
            </Container>
        </Menu>
)

export default Nav;