import React, { useState } from 'react';
import {
  Box, Flex, IconButton, Container, useColorMode, Menu, MenuButton, MenuList, MenuItem,
  Button, Image, Link as ChakraLink
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const ethereumLogoUrl = "https://goerli.etherscan.io/images/svg/brands/ethereum-original.svg";

const networkOptions = [
  { name: 'Ethereum MainNet', logo: ethereumLogoUrl },
  { name: 'Ethereum TestNet', logo: ethereumLogoUrl },
  { name: 'Sepolia TestNet', logo: ethereumLogoUrl },
  { name: 'Goerli TestNet', logo: ethereumLogoUrl },
];

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedNetwork, setSelectedNetwork] = useState(networkOptions[0]);
  const logoTextColor = colorMode === 'light' ? 'black' : 'white';

  const bgHeader = colorMode === 'light' ? 'gray.200' : 'gray.800'; // Softer shade for the header in light mode
  const bgBody = colorMode === 'light' ? 'gray.100' : 'gray.900'; // Softer shade for the body background in light mode

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
  };

  return (
    <Box minHeight="100vh" bg={bgBody}>
      <Flex as="header" justify="space-between" align="center" p="4" bg={bgHeader} boxShadow="sm">
        <ChakraLink as={RouterLink} to="/" style={{ fontWeight: 'bold', fontSize: 'lg', color: logoTextColor }}>
          ZTrust
        </ChakraLink>
        <Flex align="center">
        <Menu>
          <MenuButton as={Button} variant="ghost">
            <Flex alignItems="center" justifyContent="center">
              <Image
                src={selectedNetwork.logo}
                boxSize="20px"
                alt="Network Logo"
                filter={colorMode === 'dark' ? 'invert(1)' : 'none'}
              />
            </Flex>
          </MenuButton>
          <MenuList>
            {networkOptions.map((network, index) => (
              <MenuItem key={index} onClick={() => handleNetworkChange(network)}>
                <Image
                  src={network.logo}
                  boxSize="24px"
                  mr="2"
                  alt={`${network.name} Logo`}
                  filter={colorMode === 'dark' ? 'invert(1)' : 'none'}
                />
                {network.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

          <IconButton
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            variant="ghost"
            ml={2}
          />
        </Flex>
      </Flex>
      <Container maxW="container.xl" pt="5">
        {children}
      </Container>
    </Box>
  );
};

export default Layout;