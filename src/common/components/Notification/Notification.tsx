import styled from "styled-components";

const StyledNotification = styled.div`
  position: absolute;
  top: 36px;
  right: p6px;
  z-index: 9999;
  margin: 8px 16px;
  background: #ff5761;
  border-radius: 4px;
  color: #fff;
`;

type PropType = {
  msg: string;
};

const Notification: React.FC<PropType> = (props: PropType) => {
  return (
    <StyledNotification>
      <span>{props.msg}</span>
    </StyledNotification>
  );
};
export default Notification;
