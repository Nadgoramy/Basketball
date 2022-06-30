import styled from "styled-components";
import deleteSvg from "asserts/icons/delete_rounded.svg";
import { ButtonHTMLAttributes, DetailedHTMLProps, DOMAttributes, HtmlHTMLAttributes, MouseEventHandler } from "react";
import deletSvg from "asserts/icons/delete_rounded.svg";

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

  &>div{
    width: 24px;
    height: 24px;
    background-image: url("${( props ) => deletSvg}");
    background-repeat: no-repeat;
    background-size: contain;
    border: none;  
  }
`;

interface IProps{
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
export const DeleteButton: React.FunctionComponent<IProps> = (
  props:IProps
) => {
  return (
    <StyledDeleteButton {...props}>      
      <div></div>
    </StyledDeleteButton>
  );
};
