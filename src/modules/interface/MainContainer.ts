import styled from "styled-components";

const MainContainer = styled.div`
    position: absolute;
    max-width: 1300px;
    left: 140px;
    top: 80px;
    background: #F6F6F6;    
    padding: 32px 80px;
    height:100%;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        left:0;
        top: 62px;
        padding: 0;
        width: 100%;
    }
`
export default MainContainer;