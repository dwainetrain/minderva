import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../firebase'
import { Link as ChaLink, Flex, Box, Stack } from '@chakra-ui/core'

// Create a small component to carry over settings for each link
const NavbarLink = ({ children, ...props }) => (
    <ChaLink px={2} color="white" {...props}>
      {children}
    </ChaLink>
  );

const Nav = () => (
        <Flex
        bg="tomato"
        w="100%"
        px={5}
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
                <Stack
                isInline
                align="center"
                py={3}
                fontSize="2xl"
                fontWeight="extrabold"
                >
                    <ChaLink as={Link} to="/" color="white">
                        Minderva
                    </ChaLink>
                </Stack>
        </Flex>
        <Box>
            <NavbarLink as={NavLink} px={2} to="/review">Review</NavbarLink>
            <NavbarLink as={NavLink} to="/add-cards">Add Cards</NavbarLink>
            <NavbarLink as={NavLink} to="/card-collection">Card Collection</NavbarLink>
            <NavbarLink as={NavLink} to="/user-profile">User Profile</NavbarLink>
            <NavbarLink as={NavLink} to="/" onClick={signOut}>Sign Out</NavbarLink>
        </Box>
      </Flex>
)

export default Nav;