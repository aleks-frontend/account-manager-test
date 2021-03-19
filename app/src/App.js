import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import TranactionForm from './components/TranactionForm';
import Container from './components/transactions-history/Container';
import Warning from './components/Warning';
import TransactionHistoryContextProvider from './contexts/TransactionHistoryContext';
import WarningContextProvider from './contexts/WarningContext';

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
      <WarningContextProvider>
        <TransactionHistoryContextProvider>
          <TranactionForm />
          <Container />
        </TransactionHistoryContextProvider>
        <Warning />
      </WarningContextProvider>
    </AppMain >
  );
}

export default App;
