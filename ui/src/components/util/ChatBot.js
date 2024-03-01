// ChatBot.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Container,
  Text,
  Flex,
  IconButton,
  useColorMode,
  keyframes,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';



const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateAiResponse = (userInput) => {
    userInput = userInput.toLowerCase();
    if (userInput.includes("status") || userInput.includes("summary")) {
      // Example data
      const overallHealthScore = 92;
      const criticalIssues = 1;
      const smartContractAddress = "0x123...abc";
      const network = "Ethereum";
      const reportLink = "https://ipfs.io/ipfs/YOUR_IPFS_HASH_HERE"; // Replace with your actual IPFS link
  
      return (
        <>
          <Text mb={2}>Audit Summary for contract {smartContractAddress} ({network}):</Text>
          <Text mb={1}>- Overall Health Score: {overallHealthScore}%</Text>
          <Text mb={1}>- Critical Issues Found: {criticalIssues}</Text>
          <Text mb={2}>- Blockchain Network: {network}</Text>
          <Text>
            For a detailed report, see the 
            <Link 
              href={reportLink} 
              isExternal 
              color="blue.300" 
              textDecoration="underline"
              ml={1}
            >
              Full Audit Report
            </Link> 
             on IPFS.
          </Text>
        </>
      );
    } 
    // ... other conditions ...
  };
  
  
  
  
  

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setIsAiThinking(true);

    setTimeout(() => {
      const aiResponse = generateAiResponse(input);
      setMessages(messages => [...messages, { text: aiResponse, sender: 'ai' }]);
      setIsAiThinking(false);
    }, 2000);
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typingAnimation = keyframes`
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  `;

  const userMessageColor = colorMode === 'light' ? 'whatsapp.500' : 'whatsapp.300';
  const aiMessageColor = colorMode === 'light' ? 'gray.500' : 'gray.600';
  const typingIndicatorColor = colorMode === 'light' ? 'gray.200' : 'white';

  return (
    <Container maxW="container.md" p={4} height="100vh" overflow="hidden">
      <Flex mb={6} justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">ZTrust</Text>
        <IconButton
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </Flex>
      <VStack spacing={4} align="stretch" height="calc(100vh - 140px)" overflowY="auto">
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            bg={message.sender === 'user' ? userMessageColor : aiMessageColor}
            color="white"
            p={3}
            borderRadius="lg"
            maxWidth="70%"
            wordBreak="break-word"
          >
            {message.text}
          </Box>
        ))}
        {isAiThinking && (
          <Box bg={aiMessageColor} py={2} px={6} borderRadius="lg" maxWidth="70%" alignSelf="flex-start">
            <Text fontSize="xl" color={typingIndicatorColor} animation={`${typingAnimation} 1.5s infinite`}>...</Text>
          </Box>
        )}
        <div ref={endOfMessagesRef} />
      </VStack>
      <InputGroup size="md" mt={4}>
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Ask any blockchain security or audit related questions..."
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          focusBorderColor={colorMode === 'light' ? 'gray.300' : 'gray.700'}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={sendMessage} colorScheme="whatsapp">
            <ArrowForwardIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Container>
  );
};

export default ChatBot;