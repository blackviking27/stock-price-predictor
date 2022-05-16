import React from 'react';
import { ChakraProvider, Container, Heading, Center } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Form from './component/Form';

function App() {
  return (
    <ChakraProvider>
      <Center maxW="100%" h="100vh">
        <Container margin="auto">
          <Center bg="whatsapp.400" p="5" borderRadius="5" marginBottom="5">
            <Heading size="lg">Stock Price Predictor</Heading>
          </Center>
          <Form />
        </Container>
      </Center>
    </ChakraProvider>
  );
}

export default App;
