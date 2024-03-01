import React, { useState } from 'react';
import { Box, VStack, useColorMode, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, IconButton, Tooltip, Button } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiFlag } from 'react-icons/fi';

const AnnotatedCode = ({ code, annotations }) => {
  const { colorMode } = useColorMode();
  const style = colorMode === 'light' ? vs : vscDarkPlus;
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);

  const handleLineClick = (annotation) => {
    setSelectedAnnotation(annotation);
  };

  return (
    <VStack align="start">
      <Box position="relative" w={"100%"}>
        <SyntaxHighlighter
          language="solidity"
          style={style}
          showLineNumbers
          wrapLines={true}
          lineProps={lineNumber => {
            const isVulnerable = annotations.some(a => a.line === lineNumber);
            return {
              style: isVulnerable ? { display: 'block', backgroundColor: 'rgba(255, 0, 0, 0.3)' } : {},
            };
          }}
        >
          {code}
        </SyntaxHighlighter>
        {annotations.map((annotation, index) => (
          <Popover key={index} isOpen={selectedAnnotation?.line === annotation.line} onClose={() => setSelectedAnnotation(null)}>
            <PopoverTrigger>
              <Box as="span" cursor="pointer" position="absolute" left="0" top={`${(annotation.line - 1) * 1.5}em`} transform="translateY(-50%)" zIndex="1" onClick={() => handleLineClick(annotation)}>
                <Tooltip label="Click to see vulnerability" hasArrow>
                  <IconButton icon={<FiFlag />} size="sm" variant="ghost" colorScheme="red" />
                </Tooltip>
              </Box>
            </PopoverTrigger>
            <PopoverContent zIndex="2">
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Vulnerability Detail</PopoverHeader>
              <PopoverBody>
                {annotation.description}
                <Box mt={4}>
                  <Button colorScheme="blue" size="sm" onClick={() => {/* AI Explanation Logic Here */}}>
                    ✨ Explain with AI
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ))}
      </Box>
    </VStack>
  );
};

export default AnnotatedCode;