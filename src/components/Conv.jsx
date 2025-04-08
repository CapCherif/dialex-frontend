import React, { useEffect } from "react";
import LuminaLogo from "../assets/lumina.png";
import UserLogo from "../assets/user.png";
import { useAppContext } from '../context/Context';

const Conv = () => {

    // from the context api
    const { messages, typing, loadingThread } = useAppContext();
   

  return (
    <div id="conv">

      {
        loadingThread ? (
          <div className="loader-fixed">
            <div className="conv-loading"></div>
          </div>
        ):null
      }
      
      {messages.map((msg) =>
        msg.sender === "user" ? (
          <div key={msg.id} className={`msg ${msg.sender}`}>
            <div className="msg_user">
              {msg.message}
            </div>
            <img src={UserLogo} alt="" />
          </div>
        ) : (
          <div key={msg.id} className={`msg ${msg.sender}`}>
            <img src={LuminaLogo} alt="" />
            <div className="msg_lumina">
              {msg.message}
            </div>
          </div>
        )
      )}

      {typing ? (
        <div className="typing-animation">
          <span></span><span></span><span></span>
        </div>
      ) : null}
    </div>
  );
};

export default Conv;
