import { useEffect, useState } from "react";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";

const bounceAnimation = keyframes`${fadeIn}`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(.25);
    opacity: 0;
  }
`;

const ErrorPopUpStyled = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  top: 0;
  height: 40px;
  z-index: 1000;

  background: ${({ theme }) => theme.colors.light_red};
  border-radius: 4px;
  margin: 36px;

  visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
  animation: ${(props) => (props.hidden ? fadeOut : "")} 2s linear;
  transition: visibility 2s linear;

  span {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin: auto 16px;
  }
`;
interface PropType {
  errorMessage: string;
}
const ErrorPopUp = (props: PropType) => {
  const [fading, setFading] = useState(false);
  const fade = () => {
    setFading(true);
  };
  useEffect(() => {
    setFading(false);
  }, [props.errorMessage]);
  const fadeTimer = setTimeout(() => setFading(true), 10000);
  return (
    <ErrorPopUpStyled onMouseEnter={fade} hidden={fading}>
      <span>{props.errorMessage}</span>
    </ErrorPopUpStyled>
  );
};

export default ErrorPopUp;
