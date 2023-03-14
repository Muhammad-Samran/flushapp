import React from "react";
import ChatSidePanelCard from "../../Components/global/ChatSidePanelCard/ChatSidePanelCard";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import ChatBox from "../../Components/global/ChatBox/ChatBox";
function ChatPage() {
  return (
    <>
      <Container className="py-5">

          <div className="main-of-chat-page">          
          <div className="side-of-chat">
          <ChatSidePanelCard />
          </div>
          <div className="main-box-of-chat">
          <ChatBox/>
          </div></div>

      </Container> 
    </>
  );
}

export default ChatPage;
