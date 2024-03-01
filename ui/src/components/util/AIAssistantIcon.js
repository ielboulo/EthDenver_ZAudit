// src/components/AIAssistantIcon.js
import React from 'react';
import { IconButton, useColorModeValue, Box } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

const AIAssistantIcon = ({ onOpen }) => {
  const bgColor = useColorModeValue('blue.500', 'blue.300');
  const hoverBgColor = useColorModeValue('blue.700', 'blue.500');
  const color = useColorModeValue('white', 'gray.800');

  return (
    <Box position="fixed" bottom="4" right="4" zIndex="tooltip">
      <IconButton
        aria-label="Open AI Assistant"
        icon={<ChatIcon />}
        bgColor={bgColor}
        _hover={{bgColor: hoverBgColor}}
        color={color}
        borderRadius="full"
        boxShadow="md"
        onClick={onOpen}
        size="lg"
        isRound
      />
    </Box>
  );
};

export default AIAssistantIcon;