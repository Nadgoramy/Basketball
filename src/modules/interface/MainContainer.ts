import styled from "styled-components";

const MainContainer = styled.div`    
    /*max-width: 1145px;*/
    margin: 80px 0 0 140px;
    background: ${({ theme }) => theme.colors.lightest_grey1};    
    padding: 32px 80px 0 80px;
    height:100%;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        margin: 62px 0 0 0;
        padding: 0;
        width: 100%;
    }
`
export default MainContainer;