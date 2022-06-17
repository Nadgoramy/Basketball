import styled from "styled-components";
import deleteSvg from "asserts/icons/delete_rounded.svg";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ReactButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const DeleteButton: React.FunctionComponent<ReactButtonProps> = (
  props: ReactButtonProps
) => {
  return (
    <button onClick={props.onClick}>      
      <img src={deleteSvg} />
    </button>
  );
};

export const StyledDeleteButton = styled(DeleteButton)`
  decoration: none;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  box-shadow: none;
  outline: 0;
  
  img {
    width: 24px;
    height: 24px;
  }
`;
