import { useAPIError } from "common/hooks/useApiError";
import { useAppDispatch } from "core/redux/store";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { themeColors } from "ThemeColors";

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
const fadeIn = keyframes`
  from {
    transform: scale(1);
    opacity: 0;    
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

interface IProps {
  fading: boolean;
}

const ErrorPopUpStyled = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  top: 0;
  height: 40px;
  z-index: 1000;

  background: ${themeColors.light_red};
  border-radius: 4px;
  margin: 36px;

  visibility: ${(props: IProps) => (props.fading ? "hidden" : "visible")};
  animation: ${(props: IProps) => (props.fading ? fadeOut : fadeIn)} 2s linear;
  transition: visibility 2s linear;

  span {
    color: ${themeColors.white};
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin: auto 16px;
  }
`;
interface PropType {
  errorMessage: string;
}
export const ErrorPopUp = (props: PropType) => {
  const [fading, setFading] = useState(false);
  const { error, removeError } = useAPIError();

  const dispatch = useAppDispatch();
  const fade = () => {
    setFading(true);
    setTimeout(() => removeError(), 2100);
  };
  useEffect(() => {
    setFading(false);
  }, [error]);

  const fadeTimer = setTimeout(() => setFading(true), 10000);
  return (
    <ErrorPopUpStyled onMouseEnter={fade} fading={fading}>
      <span>{error?.message}</span>
    </ErrorPopUpStyled>
  );
};
