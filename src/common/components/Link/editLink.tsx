import { Link, LinkProps } from "react-router-dom";
import styled from "styled-components";
import editSvg from "asserts/icons/create_rounded.svg";

export const EditLink: React.FunctionComponent<LinkProps> = (
  props: LinkProps
) => {
  return (
    <StyledEditLink to={props.to}>
      <div></div>
    </StyledEditLink>
  );
};

export const StyledEditLink = styled(Link)`
  text-decoration: none;
  width: 24px;
  height: 24px;
  &:-webkit-any-link {
    text-decoration: none;
  }
  div {
    width: 24px;
    height: 24px;
    background-image: url("${editSvg}");
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
