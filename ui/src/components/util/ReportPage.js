import React from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Accordion,
  Text,
  Button,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import Header from './Header';
import SmartContractAccordion from './SmartContractAccordion';
import ChatBot from './ChatBot';
import StatisticsGrid from './StatisticsGrid'; // Import the StatisticsGrid component
import { exampleContracts } from './exampleContracts';

const ReportPage = () => {
  // Example statistics - customize based on your actual audit data
  const stats = [
    { label: 'Total Contracts', number: exampleContracts.length, helpText: 'Number of contracts audited' },
    { label: 'Vulnerabilities Found', number: '5', helpText: 'Total vulnerabilities identified' },
    { label: 'Overall Score', number: '85%', helpText: 'Audit score' },
    { label: 'Critical Issues', number: '2', helpText: 'Number of critical vulnerabilities' },
    // Add more statistics as needed
  ];

  return (
    <ChakraProvider>
      <Box>
        <Header />
        {/* Title and View PDF Report Button */}
        <Flex justify="space-between" align="center" px={5} pt={5}>
          <Heading as="h2" size="lg" color={useColorModeValue('gray.800', 'white')}>
            On-Chain Audit Report
          </Heading>
          <Button colorScheme="blue" size="sm">
            View PDF Report
          </Button>
        </Flex>
        <Text px={5} color={useColorModeValue('gray.600', 'gray.200')} mb={5}>
          This report provides a comprehensive analysis using Zero-Knowledge (ZK) proofs to ensure privacy and security.
        </Text>
        <Flex direction={{ base: "column", md: "row" }} py={5}>
          <Box flex="1" px={5}>
            <StatisticsGrid stats={stats} />
            <Accordion allowMultiple mt={5}>
              {exampleContracts.map((contract, index) => (
                <SmartContractAccordion key={index} contract={contract} />
              ))}
            </Accordion>
          </Box>
          <Box width={{ base: "100%", md: "30%" }} px={5}>
            <ChatBot />
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default ReportPage;