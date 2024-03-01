// Home.js
import React from 'react';
import { Box, Container, Heading, Text, VStack, Button, useColorModeValue } from '@chakra-ui/react';
import Header from './util/Header';

function Home() {
    const containerBg = useColorModeValue('gray.50', 'gray.800');

    return (
        <Box>
            <Header />
            <Container maxW="container.xl" p={5} bg={containerBg} borderRadius="lg">
                <VStack spacing={4} align="stretch">
                    <Heading as="h1" size="xl">Welcome to the Security Report Registry</Heading>
                    <Text fontSize="md">Here, you can find on-chain security reports and smart contract code similar to Etherscan's interface.</Text>
                    <Button colorScheme="blue">View Reports</Button>
                    {/* You can add more components here */}
                </VStack>
            </Container>
        </Box>
    );
}

export default Home;