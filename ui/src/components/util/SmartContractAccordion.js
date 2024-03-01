import React from 'react';
import { AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import AnnotatedCode from './AnnotatedCode'; // Adjust the import path as needed

const SmartContractAccordion = ({ contract }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {contract.name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <AnnotatedCode code={contract.code} annotations={contract.vulnerabilities} />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default SmartContractAccordion;