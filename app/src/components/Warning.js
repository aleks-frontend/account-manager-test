import React, { useContext } from 'react';
import styled from 'styled-components';

import { colors } from '../services/global-style';
import { WarningContext } from '../contexts/WarningContext';

const WarningMain = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
    background: #fff;
    font-size: 14px;
    font-weight: bold;
    color: ${colors.red};
    border: 2px solid ${colors.red};
    text-align: center;
    box-sizing: border-box;
`;

const WarningButton = styled.button`
    padding: 2px 5px;
    background: #fff;
    border: 1px solid black;
    border-radius: 5px;
    margin-left: 10px;

    &:hover {
        cursor: pointer;
    }
`;

const Warning = () => {
    const { warningVisible, setWarningVisible } = useContext(WarningContext);
    
    return warningVisible ? (
        <WarningMain>
            <div data-type="warning-message">
                You need to wait for 5 seconds before sending a duplicate transaction.
            </div>
            <WarningButton onClick={() => setWarningVisible(false)}>GOT IT</WarningButton>
        </WarningMain>
    ) : null;
};

export default Warning;
