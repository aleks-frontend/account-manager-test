import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import TranactionForm from './components/TranactionForm';
import Container from './components/transactions-history/Container';
import Warning from './components/Warning';

const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const App = () => {
  return (
    <AppMain>
      <Header />
      <TranactionForm />
      <Container />
      <Warning />
    </AppMain >
  );
}

export default App;
