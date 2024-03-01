// Header.js
import React from 'react';
import { Box, Flex, Text, useColorMode, Button, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue('gray.100', 'gray.900');
    const color = useColorModeValue('black', 'white');

    return (
        <Flex as="header" width="full" align="center" justifyContent="space-between" padding={4} bg={bgColor} color={color}>
            <Text fontSize="xl" fontWeight="bold">ZAudit</Text>
            <IconButton
                icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
                onClick={toggleColorMode}
                aria-label="Toggle theme"
                colorScheme="blue"
                variant={"ghost"}
            />
        </Flex>
    );
};

export default Header;