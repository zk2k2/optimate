import "../assets/styles/chat.css";
import { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Component } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      message:
        "Hello there! this is Optibot, I can provide you with your Optimate stats, provide weather info based on your location, and provide a fun fact about tomorrow!",
    },
  ]);

  const handleQuestion = (e) => {
    e.preventDefault();
    const message = { type: "bot", message: "This is a fun fact!" };
    setMessages([...messages, message]);
  };

  const BotAnswer = ({ message }) => {
    const [showAnimation, setShowAnimation] = useState(true);
    useEffect(() => {
      document.querySelector(".answer").addEventListener("animationend", () => {
        setShowAnimation(false);
      });
    }, []);
    return (
      <div className={`answer ${showAnimation ? "answer-animation" : ""}`}>
        <div className=" d-flex my-3">
          <div className="optibot-avatar">
            <img
              className="p-2"
              src="../assets/img/optibot-icon.png"
              alt=""
              style={{ width: "3rem" }}
            />
          </div>

          <div
            className="bg-quaternary px-3  pt-2 d-flex justify-content-center"
            style={{
              borderRadius: "1rem",
              width: "fit-content",
              maxWidth: "70%",
            }}
          >
            <p>{message}</p>
          </div>
        </div>
      </div>
    );
  };

  const UserAnswer = ({ message }) => {
    return (
      <div className="answer d-flex my-3 justify-content-end">
        <div
          className="bg-secondary px-3  pt-2 d-flex justify-content-center"
          style={{
            borderRadius: "1rem",
            width: "fit-content",
          }}
        >
          <p className=" text-white">{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="optibot d-flex justify-content-center mx-5 ">
      <div className="chatbox w-75  bg-white mx-5 d-flex flex-column justify-content-between shadow">
        <div className="answers mx-5">
          {messages.map((message, index) => {
            if (message.type === "bot") {
              return <BotAnswer message={message.message} key={index} />;
            } else {
              return <UserAnswer message={message.message} key={index} />;
            }
          })}
        </div>

        <div className="input-bar">
          <div className="questions d-flex justify-content-center my-3">
            <Button
              className="mx-3 my-1  py-2 px-3"
              style={{ borderRadius: "10rem" }}
            >
              What are my stats so far?
            </Button>
            <Button
              className="mx-3 my-1  py-2 px-3"
              style={{ borderRadius: "10rem" }}
            >
              What's the weather for tomorrow?
            </Button>

            <Button
              className="mx-3 my-1  py-2 px-3"
              style={{ borderRadius: "10rem" }}
              onClick={handleQuestion}
              key="fun-fact"
            >
              What's an interesting fact about tomorrow?
            </Button>
          </div>
          <Form>
            <Form.Group className="m-3 d-flex">
              <Form.Control
                type="message"
                placeholder="Enter a message..."
                style={{ borderRadius: "10rem" }}
              />
              <span className="input-group-append">
                <Button className="mx-2">
                  <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                </Button>
              </span>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
