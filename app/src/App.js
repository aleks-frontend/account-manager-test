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
  const [transactionHistory, setTransactionHistory] = React.useState([]);
  const [warningVisible, setWarningVisible] = React.useState(false);
  
  const addTransactionHistoryItem = ({id, currentBalance }) => {
    setTransactionHistory([
      ...transactionHistory,
      { id, currentBalance }
    ])
  };

  return (
    <AppMain>
      <Header />
      <TranactionForm 
        addTransactionHistoryItem={addTransactionHistoryItem} 
        setWarningVisible={setWarningVisible}
        />
      <Container transactionHistory={transactionHistory} />
      {warningVisible && <Warning hideWarning={() => setWarningVisible(false)} />}
    </AppMain>
  );
}

export default App;
