import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, AccordionIcon, Tag, List, ListItem } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Layout from './util/Layout';
import AIAssistantIcon from './util/AIAssistantIcon';

const ContractPage = () => {
  const { address } = useParams();

  const handleOpenAIChat = () => {
    console.log("AI Chat Opened"); // Placeholder action
  };
  
  // Expanded mock data with more functions
  const functions = [
    {
      name: "approve(address,uint256)",
      hash: "0x095ea7b3",
      details: "Allows a spender to withdraw from your account multiple times, up to the _value amount. If this function is called again, it overwrites the current allowance with _value.",
      securityLevel: "Medium",
      vulnerabilities: [
        { id: "VULN-001", description: "Potential for double-spending attack.", severity: "High" },
        { id: "VULN-002", description: "Can be exploited to change allowance without owner's consent under certain conditions.", severity: "Medium" }
      ],
    },
    {
      name: "transfer(address,uint256)",
      hash: "0xa9059cbb",
      details: "Transfers _value amount of tokens to address _to, and MUST fire the Transfer event. The function SHOULD throw if the message caller’s account balance does not have enough tokens to spend.",
      securityLevel: "Low",
      vulnerabilities: [
        { id: "VULN-003", description: "Gas optimization could be improved for lower transaction costs.", severity: "Low" }
      ],
    },
    {
      name: "transferFrom(address,address,uint256)",
      hash: "0x23b872dd",
      details: "Transfers _value amount of tokens from address _from to address _to, and MUST fire the Transfer event.",
      securityLevel: "High",
      vulnerabilities: [
        { id: "VULN-004", description: "Susceptible to reentrancy attacks if not properly handled.", severity: "High" },
        { id: "VULN-005", description: "May allow unauthorized transfers in certain conditions.", severity: "Critical" }
      ],
    },
    {
      name: "mint(address,uint256)",
      hash: "0x40c10f19",
      details: "Creates _amount tokens and assigns them to _account, increasing the total supply.",
      securityLevel: "Medium",
      vulnerabilities: [
        { id: "VULN-006", description: "Can be exploited to arbitrarily increase the supply of tokens.", severity: "Medium" },
        { id: "VULN-007", description: "Lack of access control may lead to unauthorized minting.", severity: "High" }
      ],
    },
    {
      name: "burn(uint256)",
      hash: "0x42966c68",
      details: "Destroys _amount tokens from the caller’s account, reducing the total supply.",
      securityLevel: "Low",
      vulnerabilities: [
        { id: "VULN-008", description: "Improper burn mechanism may lead to token loss.", severity: "Medium" }
      ],
    },
    // Add more functions as needed for demonstration
  ];

  const getColorScheme = (level) => {
    switch (level) {
      case "High": return "red";
      case "Critical": return "purple"; // Adding a color for critical severity
      case "Medium": return "orange";
      case "Low": return "green";
      default: return "gray";
    }
  };

  return (
    <Layout>
        <AIAssistantIcon onOpen={handleOpenAIChat} />
      <Box p={5}>
        <Box mb={4}>Contracts {address}</Box>
        <Accordion allowToggle>
          {functions.map((func, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {func.name} <Box as="span" color="gray.500">({func.hash})</Box>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Tag colorScheme={getColorScheme(func.securityLevel)}>{func.securityLevel}</Tag>
                <Box mt={2}>{func.details}</Box>
                <Box mt={4}>
                  <b>Vulnerabilities:</b>
                  <List spacing={2} mt={2}>
                    {func.vulnerabilities.map(vuln => (
                      <ListItem key={vuln.id}>
                        <Tag mr={2} colorScheme={getColorScheme(vuln.severity)}>{vuln.severity}</Tag>
                        {vuln.description} (<Box as="span" fontWeight="bold">{vuln.id}</Box>)
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Layout>
  );
};

export default ContractPage;