import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from '../services/global-style';

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

const Warning = ({ hideWarning }) => {
    return (
        <WarningMain onClick={(e) => e.stopPropagation()}>
            <div data-type="warning-message">
                You need to wait for 5 seconds before sending a duplicate transaction.
                </div>
            <WarningButton onClick={hideWarning}>GOT IT</WarningButton>
        </WarningMain>
    );
};

Warning.propTypes = {
    hideWarning: PropTypes.func.isRequired
};

export default Warning;
