import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components";
import {DefaultTheme } from "DefaultTheme"

type ReactButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type BtnMode = "default" | "add" | "cancel"
type PropsType = {    
    mode?: BtnMode; 
    theme: DefaultTheme   
  } & ReactButtonProps;

const getBackgroundColorByMode = (theme: DefaultTheme, mode?:string, state?:string)=>{
    if(!state){    
        if(mode === "cancel") return theme.colors.lightest_grey1;
    return theme.colors.red;
    }
    if(state === "hover"){
        if(mode === "cancel") return theme.colors.lightest_grey;
        return theme.colors.light_red;
    }
    if(state === "active"){
        if(mode === "cancel") return theme.colors.light_grey;
        return theme.colors.dark_red;
    }
    if(state === "disabled"){        
        return theme.colors.lightest_grey1;
    }
    return theme.colors.red
}

const getBorderByMode = (theme: DefaultTheme, mode?:string, state?:string )=>{
    if(mode === "add") return "none";
    if(mode === "cancel") {
        if(!state || state=="hover") return "1px solid "+theme.colors.light_grey
        return "1px solid " + theme.colors.grey
    }
    return "none";
}

const getColorByMode = (theme: DefaultTheme, mode?:string, state?:string )=>{    
    if(mode === "cancel") {
        if(!state || state=="hover") return theme.colors.light_grey
        if(state ==="disabled") return theme.colors.lightest_grey
        return theme.colors.grey
    }
    else if(state ==="disabled") return theme.colors.lightest_grey
    return theme.colors.white;
}
const getWidth=(props: PropsType)=>{
    if(props.mode == "add") return "104px"
    if(props.mode == "cancel") return "171px"
    return "365px"
}

export const StyledButton = styled.button<PropsType>`
    min-width: 104px;
    width: ${(props: PropsType) => getWidth(props)};
    height: 40px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        width:100%;
      }
    
    border:${(props) => getBorderByMode( props.theme,props.mode)};
    background-color: ${(props: PropsType) => getBackgroundColorByMode( props.theme, props.mode)};
    border-radius: 4px;
    
    align-items: center;
    text-align: center;
    display: flex;    
    justify-content: center;
    
    color: ${(props: PropsType) => getColorByMode( props.theme, props.mode )};

    &:hover{
        background: #FF5761;
        color: #FFFFFF;
        border:${(props: PropsType) => getBorderByMode(props.theme, props.mode)};
        background-color: ${(props: PropsType) => getBackgroundColorByMode(props.theme, props.mode, "hover")};
    }

    &:active {
        background: #C60E2E;
        color: ${(props: PropsType) => getColorByMode(props.theme, props.mode )};
        border:${(props: PropsType) => getBorderByMode(props.theme, props.mode)};
        background-color: ${(props: PropsType) => getBackgroundColorByMode(props.theme, props.mode, "active")};
    }

    &:disabled{
        background: #F6F6F6;
        color: ${(props: PropsType) => getColorByMode(props.theme, props.mode)};
        border:${(props: PropsType) => getBorderByMode(props.theme, props.mode)};
        background-color: ${(props: PropsType) => getBackgroundColorByMode(props.theme, props.mode, "disabled")};
    }

    #plus{
        font-size: 18px
    }
`

