import "../assets/styles/chat.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { ajax } from "jquery";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      message:
        "Hello there! this is Optibot, I can provide you with your Optimate stats, your location's weather, and more! What would you like to know?",
    },
  ]);
  const [userLocation, setUserLocation] = useState("");

  const handleUserInput = (e) => {
    e.preventDefault();
    const userMessage = { type: "user", message: userLocation };
    const botMessage = {
      type: "bot",
      message: `Sure! This is the weather for ${userLocation}!
      `,
    };
    const form = e.target;
    var userInput = form.elements.input.value;
    form.elements.input.value = "";
    setUserLocation(userInput);
    userMessage.message = userInput;

    // user enters anything relating to weather
    if (
      userInput.toLowerCase().includes("weather") ||
      userInput.toLowerCase().includes("temperature")
    ) {
      handleQuestion(e, "weather");
    }

    // user enters anything relating to stats
    else if (
      userInput.toLowerCase().includes("stats") ||
      userInput.toLowerCase().includes("statistics")
    ) {
      handleQuestion(e, "stats");
    }

    // user enters anything relating to motivation
    else if (
      userInput.toLowerCase().includes("motivation") ||
      userInput.toLowerCase().includes("inspiration")
    ) {
      handleQuestion(e, "motivation");
    }

    // user input is the location? launch api call
    else if (
      messages
        .slice(-1)[0]
        .message.includes(
          "Sure! I just need to know your location first. Please enter it below (example: Boston, Tunis, London...)."
        ) ||
      messages
        .slice(-1)[0]
        .message.includes(
          "Sorry, I couldn't find the weather for the location you entered. Please make sure you entered a valid location."
        )
    ) {
      setUserLocation(userInput);
      userMessage.message = userInput;
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      ajax({
        method: "GET",
        url:
          "https://api.api-ninjas.com/v1/weather?city=" +
          userInput.toLowerCase(),
        headers: { "X-Api-Key": "OIvMczRXldrDosRZKdYReA==qMlnPyKVVLC7jegh" },
        contentType: "application/json",
        success: function (result) {
          botMessage.message = `Sure! This is the weather for ${userInput}!
          Current temperature is ${result.temp}°C, with a high of ${
            result.min_temp
          }°C and a low of ${result.max_temp}°C.
          Humidity is at ${result.humidity}%. Sunrise is at ${new Date(
            result.sunrise * 1000
          ).toLocaleString("en-US", {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
          })} and sunset is at ${new Date(result.sunset * 1000).toLocaleString(
            "en-US",
            {
              hour: "numeric",
              hour12: true,
              minute: "numeric",
            }
          )}.
         `;
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        },
        error: function ajaxError(jqXHR) {
          botMessage.message = `Sorry, I couldn't find the weather for the location you entered. Please make sure you entered a valid location.`;
          setUserLocation("");
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        },
      });
    }
    //any other input
    else {
      setMessages([...messages, userMessage]);
      botMessage.message = `Sorry, I didn't quite catch that. Please try again.`;
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const handleQuestion = (e, buttonId) => {
    e.preventDefault();

    const botMessage = { type: "bot", message: "Placeholder" };
    const userMessage = { type: "user", message: "Placeholder" };
    switch (buttonId) {
      case "quote":
        userMessage.message = "Motivate me!";
        var category = "learning";
        ajax({
          method: "GET",
          url: "https://api.api-ninjas.com/v1/quotes?category=" + category,
          headers: { "X-Api-Key": "OIvMczRXldrDosRZKdYReA==qMlnPyKVVLC7jegh" },
          contentType: "application/json",
          success: function (result) {
            console.log(result);
            botMessage.message = `Sure! Here's a quote to motivate you: Did you know that ${result[0].author} once said: "${result[0].quote}"
            This should inspire you to work harder and achieve your goals!`;
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          },
          error: function ajaxError(jqXHR) {
            console.error("Error: ", jqXHR.responseText);
            botMessage.message = `Sorry, I couldn't find a quote for you. Please try again later.`;
          },
        });
        break;
      case "weather":
        userMessage.message = "What's the weather for today?";
        if (userLocation === "") {
          botMessage.message =
            "Sure! I just need to know your location first. Please enter it below (example: Boston, Tunis, London...).";
          setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          }, 1000);
        } else {
          let weatherFound = false;

          messages.forEach((message) => {
            if (
              message.message.includes("This is the weather for") &&
              message.message.includes(userLocation) &&
              message.type === "bot" &&
              !weatherFound
            ) {
              botMessage.message = message.message;
              setTimeout(() => {
                setMessages((prevMessages) => [...prevMessages, botMessage]);
                console.log(botMessage.message);
              }, 1000);
              weatherFound = true;
            }
          });
        }

        break;

      case "stats":
        const doneObjectives = parseInt(localStorage.getItem("doneObjectives"));
        const timeSpent = parseInt(localStorage.getItem("timeSpent"));
        const hours = Math.floor(timeSpent / 3600);
        const minutes = Math.floor((timeSpent % 3600) / 60);
        const seconds = timeSpent % 60;
        userMessage.message = "What are my stats so far?";
        botMessage.message = `Certainly! So far, you have completed ${doneObjectives} of your objectives, and you have spent ${hours} hours, ${minutes} minutes and ${seconds} seconds focused. Keep going!`;
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    }
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  };
  const BotAnswer = ({ message }) => {
    return (
      <div className="answer">
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
    <div className="optibot d-flex justify-content-center pb-5  ">
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
              onClick={(e) => {
                handleQuestion(e, "stats");
              }}
            >
              What are my stats so far?
            </Button>
            <Button
              className="mx-3 my-1  py-2 px-3"
              style={{ borderRadius: "10rem" }}
              onClick={(e) => {
                handleQuestion(e, "weather");
              }}
            >
              What's the weather for today?
            </Button>

            <Button
              className="mx-3 my-1  py-2 px-3"
              style={{ borderRadius: "10rem" }}
              onClick={(e) => {
                handleQuestion(e, "quote");
              }}
            >
              Motivate me!
            </Button>
          </div>
          <Form onSubmit={handleUserInput}>
            <Form.Group className="m-3 d-flex">
              <Form.Control
                name="input"
                type="message"
                placeholder="Enter a message..."
                style={{ borderRadius: "10rem" }}
              />
              <span className="input-group-append">
                <Button className="mx-2" type="submit">
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
