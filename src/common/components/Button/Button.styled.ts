import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import styled from "styled-components";

type ReactButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type BtnMode = "default" | "add" | "cancel"
type PropsType = {    
    mode?: BtnMode;    
  } & ReactButtonProps;

const getBackgroundColorByMode = (mode?:string, state?:string)=>{
    if(!state){    
        if(mode === "cancel") return "#F6F6F6";
    return "#E4163A";
    }
    if(state === "hover"){
        if(mode === "cancel") return "#D1D1D1";
        return "#FF5761";
    }
    if(state === "active"){
        if(mode === "cancel") return "#9C9C9C";
        return "#C60E2E";
    }
    if(state === "disabled"){        
        return "#F6F6F6";
    }
    return "#E4163A"
}

const getBorderByMode = (mode?:string, state?:string)=>{
    if(mode === "add") return "none";
    if(mode === "cancel") {
        if(!state || state=="hover") return "1px solid #9C9C9C"
        return "1px solid #707070"
    }
    return "none";
}

const getColorByMode = (mode?:string, state?:string)=>{    
    if(mode === "cancel") {
        if(!state || state=="hover") return "#9C9C9C"
        if(state ==="disabled") return "#D1D1D1"
        return "#707070"
    }
    return "#FFFFFF";
}
const getWidth=(props: PropsType)=>{
    if(props.mode == "add") return "104px"
    if(props.mode == "cancel") return "171px"
    return "365px"
}

export const StyledButton = styled.button<PropsType>`
    
    width: ${(props: PropsType) => getWidth(props)};
    height: 40px;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        width:100%;
      }
    
    border:${(props: PropsType) => getBorderByMode(props.mode)};
    background-color: ${(props: PropsType) => getBackgroundColorByMode(props.mode)};
    border-radius: 4px;
    
    align-items: center;
    text-align: center;
    display: flex;    
    justify-content: center;
    
    color: #FFFFFF;

    &:hover{
        background: #FF5761;
        color: #FFFFFF;
        border:${(props: PropsType) => getBorderByMode(props.mode)};
        background-color: ${(props: PropsType) => getBackgroundColorByMode(props.mode, "hover")};
    }

    &:active {
        background: #C60E2E;
        color: #FFFFFF;
        border:${(props: PropsType) => getBorderByMode(props.mode)};
        background-color: ${(props: PropsType) => getBackgroundColorByMode(props.mode, "active")};
    }

    &:disabled{
        background: #F6F6F6;
        color: #D1D1D1;
        border:${(props: PropsType) => getBorderByMode(props.mode)};
        background-color: ${(props: PropsType) => getBackgroundColorByMode(props.mode, "disabled")};
    }
`

