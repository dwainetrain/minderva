import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../firebase'
import { Link as ChaLink, Heading, Flex, Box, Stack, Divider, PseudoBox, Text, Button } from '@chakra-ui/core'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

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

const Header = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.25rem"
      bg="tomato"
      color="white"
      px="10rem"
      {...props}
    >
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

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
       
              <Box>
                <NavbarLink as={NavLink} px={2} to="/review" key="review">Review</NavbarLink>
              </Box>
              <Divider orientation={{ sm: show ? "horizontal" : "horizontal", md: "vericle" }} />
              <Box>
                <NavbarLink as={NavLink} px={2} to="/add-cards" key="add">Add Cards</NavbarLink>
              </Box>
              <Divider orientation={{ sm: show ? "horizontal" : "horizontal", md: "vericle" }} />
              <Box>
                <NavbarLink as={NavLink} px={2} to="/card-collection" key="collection">Card Collection</NavbarLink>
              </Box>
            
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button bg="transparent" border="1px">
          Create account
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;