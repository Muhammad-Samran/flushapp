import styled, { createGlobalStyle } from "styled-components";

export const FileUploadStyle = createGlobalStyle`
.file-upload-2{
    background: #FFFFFF;
    border: 2px dashed #CCCCCC;
    box-sizing: border-box;
    border-radius: 20px;
}
`

export const ProgressBar = styled.div`
    width: 100%;
    height: 5px;
    border-radius: 10px;
    background: #e8eef4;
    margin-top: 10px;
    position: relative;
    margin-bottom: 25px;

    div {
      width: ${({ percentage }) => `${percentage}%`};
      transition: width 1s;
      height: 100%;
      background: ${({ percentage }) => {
        if(percentage === 100){
          return 'green'
        }
        else{
          return '#f17d7d'
        }
      }};
    }
  `;