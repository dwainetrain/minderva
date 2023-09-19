import React, { useState, useRef } from "react";
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../firebase'
import { Link as ChaLink, Flex, Box, BoxProps, forwardRef, StackDivider, Stack, HStack } from '@chakra-ui/react'
import { FiMenu, FiX } from 'react-icons/fi'

/* Primary site navigation bar */
const NavbarLink = forwardRef<BoxProps, 'div'>(({ children, ...props }, ref) => {

  return (
    <Box
      _hover={{
        textDecoration: "none", borderBottom: "1px solid #f4fff4",
        transition: "border-bottom 0.5s ease-in-out", color: "white"
      }}
      _active={{ color: "white" }}
      _focus={{ color: "white", textDecoration: "none" }}
      as="a"
      color="white"
      fontWeight="semibold"
      letterSpacing="wide"
      px={3}
      {...props}
    >{children}</Box>
  )
});

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleToggle = () => setShowMenu(!showMenu);
  const ref = useRef(null);

  return (
    <Stack
      bg="tomato"
      w="100%"
      as="nav"
      px={{ sm: 10, md: 24 }}
      py={3}
      flexDirection={{ sm: "column", md: "row" }}
      justifyContent="flex-start"
      alignItems="baseline"
      wrap="wrap"
      color="white"
    >

      <HStack width={{ sm: '100%', md: 'initial' }}>
        <Box fontWeight="extrabold">
          <ChaLink as={Link} to='/' color="white"
            _hover={{ textDecoration: "none", color: "white" }}
            _active={{ color: "white" }}
            _focus={{ color: "white", textDecoration: "none" }}
            fontFamily="span"
            letterSpacing="0.1em"
            fontSize="lg"
            lineHeight="0"
          >
            Minderva
          </ChaLink>
        </Box>

        <Box display={{ sm: "block", md: "none" }} onClick={handleToggle} ml={'auto'}>
          <title>Menu</title>
          {!showMenu ? <Box as={FiMenu} size={24} /> : <Box as={FiX} size={24} />}
        </Box>
      </HStack>

      <Stack display={{ sm: showMenu ? "flex" : "none", md: "flex" }} direction={{ sm: 'column', md: 'row' }} align='baseline' justify='flex-start' shouldWrapChildren={true} divider={<StackDivider borderColor={{ sm: 'transparent', md: 'gray.200' }} />} spacing={{ sm: '0px', md: 2 }} ml={{ sm: 0, md: 12 }}>
        <Box my={{ sm: 3, md: 0 }}>
          <NavbarLink as={NavLink} px={{ sm: 0, md: 2 }} ref={ref} to="/review" key="review">Review</NavbarLink>
        </Box>
        <Box my={{ sm: 3, md: 0 }}>
          <NavbarLink as={NavLink} px={{ sm: 0, md: 2 }} to="/add-cards" key="add">Add Cards</NavbarLink>
        </Box>
        <Box my={{ sm: 3, md: 0 }}>
          <NavbarLink as={NavLink} px={{ sm: 0, md: 2 }} to="/card-collection" key="collection">Card Collection</NavbarLink>
        </Box>
      </Stack>

      <Stack display={{ sm: showMenu ? "flex" : "none", md: "flex" }} direction={{ sm: 'column', md: 'row' }} divider={<StackDivider borderColor={{ sm: 'transparent', md: 'gray.200' }} />}
        spacing={{ sm: '0px', md: 2 }}
        align='stretch'
        ml={{ sm: "initial", md: "auto" }} >
        <Box my={{ sm: 3, md: 0 }} ml={{ sm: 0, md: "-0.25rem" }}>
          <NavbarLink as={NavLink} px={{ sm: 0, md: 2 }} to="/user-profile" key="user-profile">User Profile</NavbarLink>
        </Box>
        <Box my={{ sm: 3, md: 0 }}>
          <NavbarLink as={Link} px={{ sm: 0, md: 2 }} color="white" to="" onClick={signOut} key="sign-out">Sign Out</NavbarLink>
        </Box>
      </Stack>


    </Stack >
  );
};

export default Header;