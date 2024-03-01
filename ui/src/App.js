import React from 'react';
import { ChakraProvider, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ReportPage from './components/util/ReportPage';
import ChatBot from './components/util/ChatBot';
import MainPage from './components/MainPage';
import ContractPage from './components/ContractPage';


const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
});

const customTheme = extendTheme(
  theme,);


function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/contract' element={<ContractPage />} />
          <Route path='/chat' element={<ChatBot />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
