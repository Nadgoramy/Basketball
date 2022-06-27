import { Link, LinkProps } from "react-router-dom";
import styled, { css } from "styled-components";
import editSvg from "asserts/icons/create_rounded.svg";
import deletSvg from "asserts/icons/delete_rounded.svg";

interface EditLinkinterface extends LinkProps {}
export const EditLink: React.FunctionComponent<EditLinkinterface> = (
  props: EditLinkinterface
) => {
  return (
    <StyledEditLink to={props.to}>
      <div></div>
    </StyledEditLink>
  );
};

export const DeleteLink: React.FunctionComponent<EditLinkinterface> = (
  props: EditLinkinterface
) => {
  return (
    <StyledDeleteLink to="#0">
      <div ></div>
    </StyledDeleteLink>
  );
};

export const DeleteButton: React.FunctionComponent<EditLinkinterface> = (
  props: EditLinkinterface
) => {
  return (    
      <div ></div>
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
    background-image: url("${( props: EditLinkinterface ) => editSvg}");
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

export const StyledDeleteLink = styled(Link)`
  text-decoration: none;
  width: 24px;
  height: 24px;

  &:-webkit-any-link {
    text-decoration: none;
  }
  img {
    width: 24px;
    height: 24px;
  }
  div {
    width: 24px;
    height: 24px;
    background-image: url("${( props: EditLinkinterface ) => deletSvg}");
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
