import styled from "styled-components";
import { EmptyListScreenPtopType } from "./EmptyListScreen";
import noteamPng from "asserts/images/noTeam.png"
import noplayerPng from "asserts/images/noPlayer.png"

export const NoTeamStyled  = styled.div<EmptyListScreenPtopType>`
display: flex;
flex: 1 0 auto;
flex-direction: column;
align-items: center;
margin: 100px auto 0 auto;

div{
    width: 482px;
    height: 320px;
    margin: 48px 37px;
    background-image: url(${( props ) => props.mode == "team" ? noteamPng : noplayerPng});
    background-repeat: no-repeat;
    background-size: contain;
    background-position-x: center;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 339px;
        height: 225px;
    }
}
h2{
    font-weight: 800;
    font-size: 36px;
    line-height: 49px;
    text-align: center;
    color: ${({ theme }) => theme.colors.lightest_red};
}
span{
    font-weight: 400;
    font-size: 24px;
    line-height: 33px;
    color: ${({ theme }) => theme.colors.grey};
}
`
