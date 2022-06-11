import styled from "styled-components";

export const StyledImageContainer = styled.div`
  position: absolute;
  width: 606px;
  height: 1024px;
  left: 0px;
  top: 0px;
  background: #ffffff;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: none;
  }
`;


