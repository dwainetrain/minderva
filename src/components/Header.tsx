import React, { useState, useRef } from "react";
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../firebase'
import { Link as ChaLink, Flex, Box, BoxProps, forwardRef, Divider, useBreakpointValue, HStack, StackDivider } from '@chakra-ui/react'
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
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const ref = useRef(null);

  return (
    <Flex
      bg="tomato"
      w="100%"
      as="nav"
      px={{ sm: 10, md: 24 }}
      py={3}
      justifyContent="flex-start"
      alignItems="baseline"
      wrap="wrap"
      color="white"
    >

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

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <title>Menu</title>
        {!show ? <Box as={FiMenu} size={4} /> : <Box as={FiX} size={4} />}
      </Box>

      <HStack align='baseline' justify='flex-start' shouldWrapChildren={true} divider={<StackDivider borderColor='gray.200' />} spacing={2} ml={12}>
        <Box my={{ sm: 3, md: 0 }}>
          <NavbarLink as={NavLink} px={2} ref={ref} to="/review" key="review">Review</NavbarLink>
        </Box>
        <Box my={{ sm: 3, md: 0 }}>
          <NavbarLink as={NavLink} px={2} to="/add-cards" key="add">Add Cards</NavbarLink>
        </Box>
        <Box my={{ sm: 3, md: 0 }}>
          <NavbarLink as={NavLink} px={2} to="/card-collection" key="collection">Card Collection</NavbarLink>
        </Box>
      </HStack>



      <HStack divider={<StackDivider borderColor='gray.200' />}
        spacing={2}
        align='stretch'
        ml="auto" >
        <Box ml="-0.25rem">
          <NavbarLink as={NavLink} to="/user-profile">User Profile</NavbarLink>
        </Box>
        {/* {!show ? <Divider orientation='vertical' /> : null} */}
        {/* <Divider my={3} variant={useBreakpointValue({ sm: 'horizontal', md: 'vertical' })} /> */}
        <Box>
          <NavbarLink as={Link} px={2} color="white" to="" onClick={signOut}>Sign Out</NavbarLink>
        </Box>
      </HStack>


    </Flex >
  );
};

export default Header;