import React from "react";
import styled from "styled-components";
import svg from "asserts/icons/addPhoto.svg";

const StyledFileUploader = styled.div<PropsType>`    
/*margin: 0 auto;*/
margin: 48px auto;

    input{
        display: none;
    }
    div{
        display: flex;
        align-items: center;
        justify-content: center;
        
        border: none;
        opacity: 0.5;
        border-radius: 10px;
        width: 336px;
        height: 261px;
        background-color: ${({ theme }) => theme.colors.light_grey};

        background-image: url('${( props ) => props.url}'); 
        background-repeat: no-repeat;
        background-size: contain;       
        
        @media (max-width: ${({ theme }) => theme.mobile}) {
            width: 185px;
            height: 144px;
        }
    }
    div.img{
        margin: auto;
        width: 75px;
        height: 75px;        
        background-image: url(${svg});
        background-repeat: no-repeat;
        background-size: contain;

    }
    #drag-file-element {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        background-color: ${({ theme }) => theme.colors.white};
        opacity: 0.5;
      }
`;


interface PropsType {
  handleFiles: any;
  url?: string | undefined;
}

const DragDropFile = (props: PropsType) => {
  const [dragActive, setDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      props.handleFiles(e.dataTransfer.files[0]);
    }
  };
  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      props.handleFiles(e.target.files);
    }
  };
  const onClick = () => {
    inputRef.current?.click();
  };
  return (
    <StyledFileUploader id="form-file-upload" onDragEnter={handleDrag} handleFiles={props.handleFiles} url={props.url}>
      <input
        type="file"
        ref={inputRef}
        id="input-file-upload"
        multiple={false}
        onChange={handleChange}
        accept="image/*"
      />
      <div onClick={(e) => onClick()}><div className="img"></div></div>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </StyledFileUploader>
  );
};



export default DragDropFile;
