import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../firebase'
import { Link as ChaLink, Flex, Box, Stack, Divider, PseudoBox } from '@chakra-ui/core'

// Create a small component to carry over settings for each link
const NavbarLink = ({ children, ...props }) => (
  <PseudoBox
    _hover={{textDecoration:"none", borderBottom: "1px solid #f4fff4",
    transition: "border-bottom 0.5s ease-in-out", color:"white"}}
    _active={{color:"white"}}
    _focus={{color:"white", textDecoration:"none"}}
    as="a"
    color="white"
    fontWeight="semibold"
    letterSpacing="wide"
    px={3}
    {...props}
  >{children}</PseudoBox>
  );

const Nav = () => {

      // const [show, setShow] = React.useState(false);
      // const handleToggle = () => setShow(!show);

      return(
        <Flex
        bg="tomato"
        w="100%"
        px="10rem"
        py={4}
        justifyContent="space-between"
        alignItems="center"
      >
        
        <Flex flexDirection="row" justifyContent="center" alignItems="baseline" py={3}>
          <Stack isInline align="center">   

            <Box fontWeight="extrabold">
              <ChaLink as={Link} to="/" color="white"
              _hover={{textDecoration:"none", color:"white"}}
              _active={{color:"white"}}
              _focus={{color:"white", textDecoration:"none"}}
              fontFamily="Playfair Display"
              letterSpacing="0.1em"
              fontSize="lg"
              lineHeight="0"
              >
                  Minderva
              </ChaLink>
            </Box>
            <Box d="flex" ml="3rem">
              <Box>
                <NavbarLink as={NavLink} px={2} to="/review" key="review">Review</NavbarLink>
              </Box>
              <Divider orientation="vertical" />
              <Box>
                <NavbarLink as={NavLink} px={2} to="/add-cards" key="add">Add Cards</NavbarLink>
              </Box>
              <Divider orientation="vertical" />
              <Box>
                <NavbarLink as={NavLink} px={2} to="/card-collection" key="collection">Card Collection</NavbarLink>
              </Box>
            </Box>
          </Stack>
          
        </Flex>
        
        <Box d="flex">
            <Box>
              <NavbarLink as={NavLink} to="/user-profile">User Profile</NavbarLink>
            </Box>
            <Divider orientation="vertical" />
            <Box>
              <NavbarLink as={Link} px={2} color="white" to="" onClick={signOut}>Sign Out</NavbarLink>
            </Box>
        </Box>
      </Flex>
      )
}

export default Nav;