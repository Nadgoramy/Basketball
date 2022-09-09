import React from "react";
import styled from "styled-components";
import svg from "asserts/icons/addPhoto.svg";
import { themeColors } from "ThemeColors";
import { useAPIError } from "common/hooks/useApiError";

const StyledFileUploader = styled.div<PropsType>`
  position: relative;
  margin: 48px auto;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    margin: 32px auto 40px auto;
  }
  input {
    display: none;
  }
  .img-container {
    background-image: url("${(props) => props.url}");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    opacity: 0.5;
    border-radius: 10px;
    max-width: 336px;
    height: 261px;
    background-color: ${themeColors.light_grey};

    @media (max-width: ${({ theme }) => theme.mobile}) {
      width: 185px;
      height: 144px;
    }
  }
  &:last-child {
  }
  div.img {
    margin: auto;
    width: 75px;
    height: 75px;
    background-image: url(${svg});
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
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
    background-color: ${themeColors.white};
    opacity: 0.5;
  }
`;

interface PropsType {
  handleFiles: any;
  url?: string;
}

export const DragDropFile = (props: PropsType) => {
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

  const { addError, removeError } = useAPIError();
  const handleFile = function (files: FileList | null) {
    if (!files) return;
    const file = files[0];
    if (isImage(file.name)) {
      props.handleFiles(file);
      removeError();
    } else {
      addError("Not allowed File type: " + getExtension(file.name));
    }
  };
  function getExtension(file_name: string) {
    return file_name.split(".").reverse()[0];
  }
  function isImage(fileName: string) {
    const ext = [".jpg", ".jpeg", ".gif", ".png"];
    return ext.some((el) => fileName.endsWith(el));
  }

  const onClick = () => {
    inputRef.current?.click();
  };
  return (
    <StyledFileUploader
      id="form-file-upload"
      onDragEnter={handleDrag}
      handleFiles={props.handleFiles}
      url={props.url}
    >
      <input
        type="file"
        ref={inputRef}
        id="input-file-upload"
        multiple={false}
        onChange={(e) => {
          e.preventDefault();
          handleFile(e?.target?.files);
        }}
        accept="image/*"
      />
      <div className="img-container" onClick={(e) => onClick()}>
        <div className="img"></div>
      </div>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            handleFile(e?.dataTransfer?.files);
          }}
        ></div>
      )}
    </StyledFileUploader>
  );
};
