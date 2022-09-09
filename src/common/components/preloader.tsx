import React from "react";
import img from "asserts/images/loading.svg";
import styled from "styled-components";

const StyledOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  div {
    display: flex;
    justify-content: center;
    height: 100%;
  }
  img {
    width: 200px;
  }
`;

type PropsType = {};

export const Preloader: React.FC = () => {
  return (
    <StyledOverlay>
      <div>
        <img src={img} />
      </div>
    </StyledOverlay>
  );
};
