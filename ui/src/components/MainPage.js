import React, { useState } from 'react';
import { InputGroup, Input, InputRightElement, IconButton, Flex, Text, VStack, Spinner } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Layout from './util/Layout';


const MainPage = () => {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!address.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      navigate(`/contract?address=${encodeURIComponent(address)}`);
      setIsLoading(false); // Reset loading state after mock load time
    }, 1000);
  };

  return (
    <Layout>
      <Flex direction="column" align="center" justify="flex-start" height="calc(100vh - 64px)" pt="5%" pb="10">
        <VStack spacing={4} width="full" maxWidth="md">
          <Text fontSize="2xl" fontWeight={"semibold"} color="gray.500" textAlign="center" mb={5}>
            ZTrust Security Explorer
          </Text>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <InputGroup>
              <Input
                autoFocus
                placeholder="Search by Address / Txn Hash / Block / Token"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                pr="4.5rem"
                isReadOnly={isLoading}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  aria-label="Search contract"
                  icon={isLoading ? <Spinner size="sm" /> : <SearchIcon />}
                  variant="ghost"
                  isRound
                  isDisabled={isLoading}
                />
              </InputRightElement>
            </InputGroup>
          </form>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default MainPage;