import styled from "styled-components";
import deleteSvg from "asserts/icons/delete_rounded.svg";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  MouseEventHandler,
} from "react";
import deletSvg from "asserts/icons/delete.svg";

type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const DeleteButton1: React.FunctionComponent<ReactButtonProps> = (
  props: ReactButtonProps
) => {
  return (
    <button onClick={props.onClick}>
      <img src={deleteSvg} />
    </button>
  );
};

export const StyledDeleteButton = styled.button`
  decoration: none;
  width: 24px;
  height: 24px;
  cursor: pointer;

  border: none;
  box-shadow: none;
  outline: 0;
  padding: 0;
  background: transparent;

  & > div {
    width: 24px;
    height: 24px;
    background-image: url("${deletSvg}");
    background-repeat: no-repeat;
    background-size: contain;
    border: none;
  }
`;

interface IDeleteButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export const DeleteButton: React.FunctionComponent<IDeleteButtonProps> = (
  props: IDeleteButtonProps
) => {
  return (
    <StyledDeleteButton onClick={props.onClick}>
      <div></div>
    </StyledDeleteButton>
  );
};
