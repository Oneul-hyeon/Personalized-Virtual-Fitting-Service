import React from 'react';
import styled, { css } from "styled-components";

const StyledButton = styled.button`
    border: none;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    white-space: nowrap;
    color: ${(props) => props.color || '#000'};
    background: ${(props) => props.background || '#f2f2f2'};

  ${(props) =>
    props.primary &&
    css`
    color: bright gray;
    background: gray;
  `}
`;

function GrayButton({ children, ...props }) {
    return <StyledButton {...props}>{children}</StyledButton>;
  }

export default GrayButton;