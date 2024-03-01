// ChatBot.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  useColorMode,
  useColorModeValue,
  Container,
  Text,
  Flex,
  Spacer,
  IconButton,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    // Here you should integrate the AI response logic
    // Simulating AI response for demonstration
    setTimeout(() => {
      setMessages(messages => [...messages, { text: "AI's response.", sender: 'ai' }]);
    }, 1000);
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex>
        <Text fontSize="2xl" fontWeight="bold">Blockchain AI Assistant</Text>
        <Spacer />
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Flex>
      <Box
        bg={bgColor}
        color={color}
        p={4}
        my={4}
        borderRadius="md"
        boxShadow="base"
        height="60vh"
        overflowY="auto"
      >
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <Box
              key={index}
              alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              bg={message.sender === 'user' ? 'blue.500' : 'green.500'}
              color="white"
              p={3}
              borderRadius="lg"
            >
              {message.text}
            </Box>
          ))}
        </VStack>
      </Box>
      <Flex>
        <Input
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button colorScheme="blue" ml={2} onClick={sendMessage}>Send</Button>
      </Flex>
    </Container>
  );
};

export default ChatBot;