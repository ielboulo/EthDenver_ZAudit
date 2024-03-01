// StatisticsGrid.js
import React from 'react';
import { Box, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, useColorModeValue } from '@chakra-ui/react';


const getStatColor = (stat) => {
    let color = 'gray.400'; // Default color
  
    // Color code for Overall Score
    if (stat.label === 'Overall Score') {
      const score = parseInt(stat.number, 10);
      color = score >= 75 ? 'green.400' : score >= 50 ? 'yellow.400' : 'red.400';
    }
  
    // Color code for Vulnerabilities Found
    if (stat.label === 'Vulnerabilities Found') {
      const vulnerabilities = parseInt(stat.number, 10);
      color = vulnerabilities > 5 ? 'red.400' : vulnerabilities > 2 ? 'yellow.400' : 'green.400';
    }
  
    // Color code for Critical Issues
    if (stat.label === 'Critical Issues') {
      const issues = parseInt(stat.number, 10);
      color = issues > 1 ? 'red.400' : 'green.400';
    }
  
    return color;
  };
  
  const StatisticsGrid = ({ stats }) => {
    const bgColor = useColorModeValue('white', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const defaultTextColor = useColorModeValue('gray.700', 'gray.200');
  
    return (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {stats.map((stat, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={bgColor} borderColor={borderColor}>
            <Stat>
              <StatLabel>{stat.label}</StatLabel>
              <StatNumber color={getStatColor(stat) || defaultTextColor}>{stat.number}</StatNumber>
              <StatHelpText>{stat.helpText}</StatHelpText>
            </Stat>
          </Box>
        ))}
      </SimpleGrid>
    );
  };
  

export default StatisticsGrid;