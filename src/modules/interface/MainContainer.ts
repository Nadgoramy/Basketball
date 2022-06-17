import styled from "styled-components";

const MainContainer = styled.div`
    position: absolute;
    max-width: 1145px;
    left: 140px;
    top: 80px;
    background: ${({ theme }) => theme.colors.lightest_grey1};    
    padding: 32px 80px 0 80px;
    height:100%;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        left:0;
        top: 62px;
        padding: 0;
        width: 100%;
    }
`
export default MainContainer;