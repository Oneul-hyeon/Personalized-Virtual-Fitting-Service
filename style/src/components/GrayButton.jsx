import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
  border: none;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 40px;
  transition: all 0.3s;
  width: 12vw;
  font-size: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  text-align: center;
  white-space: nowrap;
  color: ${(props) => props.color || "#000"};
  background: ${(props) => props.background || "#d3d3d3"};

  ${(props) =>
    props.primary &&
    css`
      color: #000;
      background: #d3d3d3;
      &:hover {
        color: #000;
        background: #a9a9a9;
      }
    `}

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }
`;

function GrayButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default GrayButton;
