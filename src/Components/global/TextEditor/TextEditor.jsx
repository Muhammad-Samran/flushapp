import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "./TextEditor.css";
import { Container } from "react-bootstrap";

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <Container>
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E1E1E1",
          borderRadius: "20px",
          padding: "20px",
          marginTop:'20px',
          marginBottom:'20px'
        }}
      >
        <h5 style={{ marginBottom: "10px", color: "#3F464E" }}>
          Write your review
        </h5>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          placeholder="Write Description"
        />

        <div className="text-submit-buttons">
          <button className="editor-cancel-btn" onClick={()=>{props.setShow([false])}}>
            <span>Cancel</span>
          </button>
          <button className="editor-post-btn">
            <span>Post</span>
          </button>
        </div>
      </div>
    </Container>
  );
};
export default TextEditor;
