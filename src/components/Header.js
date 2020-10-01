import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../firebase'
import { Link as ChaLink, Flex, Box, Divider, PseudoBox } from '@chakra-ui/core'
import { FiMenu, FiX } from 'react-icons/fi'

/* Primary site navigation bar */

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

const Header = () => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
        bg="tomato"
        w="100%"
        as="nav"
        px={{ sm: 10, md: 24 }}
        py={3}
        justifyContent="space-between"
        alignItems="baseline"
        wrap="wrap"
        color="white"
    >
    
      <Box fontWeight="extrabold">
            <ChaLink as={Link} to="/" color="white"
            _hover={{textDecoration:"none", color:"white"}}
            _active={{color:"white"}}
            _focus={{color:"white", textDecoration:"none"}}
            fontFamily="span"
            letterSpacing="0.1em"
            fontSize="lg"
            lineHeight="0"
            >
                Minderva
            </ChaLink>
    </Box>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <title>Menu</title>
          {!show ? <Box as={FiMenu} size={4}/> : <Box as={FiX} size={4}/>}
      </Box>

      <Box
        display={{ sm: show ? "flex" : "none", md: "flex" }}
        flexDirection={{ sm:"column", md: "row" }}
        width={{ sm: "full", md:"auto"}}
        ml={{sm:"-0.5rem", md:36}}
        mt={{ base: 4, md: 0 }}
        flexGrow={1}
      >
        <Box my={{sm:3, md:0}}>
            <NavbarLink as={NavLink} px={2}  to="/review" key="review">Review</NavbarLink>
        </Box>
        <Divider orientation="vertical" />
        <Box my={{sm:3, md:0}}>
            <NavbarLink as={NavLink} px={2} to="/add-cards" key="add">Add Cards</NavbarLink>
        </Box>
        <Divider orientation="vertical" />
        <Box my={{sm:3, md:0}}>
            <NavbarLink as={NavLink} px={2} to="/card-collection" key="collection">Card Collection</NavbarLink>
        </Box>
      </Box>


      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        mt={{ base: 4, md: 0 }}
        ml={{sm:"-0.5rem", md: 0}}
      >
          <Box ml="-0.25rem">
              <NavbarLink as={NavLink} to="/user-profile">User Profile</NavbarLink>
          </Box>
          {!show ? <Divider orientation='vertical' /> : null}
          <Divider my={3} orientation={{sm:'default', md: 'vertical'}} />
          <Box>
              <NavbarLink as={Link} px={2} color="white" to="" onClick={signOut}>Sign Out</NavbarLink>
          </Box>
      </Box>
    </Flex>
  );
};

export default Header;