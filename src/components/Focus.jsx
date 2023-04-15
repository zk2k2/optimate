import "../assets/styles/focus.css";
import "../assets/styles/main.css";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
const Focus = () => {
  const catchphrases = [
    "Starve the distractions, feed the focus!",
    "It’s only after you’ve stepped outside your comfort zone that you begin to change.",
    "What you stay focused on will grow.",
    "The successful warrior is the average man, with laser-like focus.",
  ];
  // hooks
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondsRemaining, setSeconds] = useState(hours * 3600 + minutes * 60);
  const [phrase, setPhrase] = useState("Please select your session's duration");
  const [showModal, setShowModal] = useState(false);

  // DOM elements & variables
  const timeInput = document.querySelector(".time-input");
  const beginFocus = document.querySelector(".begin-focus");

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      showModal();
      setShowModal(true);
    }
  });

  // functions
  const handleClose = () => {
    setShowModal(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setPhrase("Please select your session's duration");
  };
  const handleShow = () => setShowModal(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    const timeSpent = parseInt(localStorage.getItem("timeSpent")) || 0; // get the previous time spent or set it to 0

    const intervalId = setInterval(() => {
      setPhrase(catchphrases[Math.floor(Math.random() * catchphrases.length)]);
    }, 5000);

    setSeconds(hours * 3600 + minutes * 60);
    localStorage.setItem(
      "timeSpent",
      (timeSpent + hours * 3600 + minutes * 60).toString()
    ); // save the updated time spent
    console.log(secondsRemaining);
    console.log(localStorage.getItem("timeSpent"));

    setTimeout(() => {
      setShowModal(true);
      timeInput.classList.remove("d-none");
      beginFocus.classList.remove("d-none");
      clearInterval(intervalId);
      setPhrase("Please select your session's duration");
    }, hours * 3600000 + minutes * 60000 + 1000);
    timeInput.classList.add("d-none");
    beginFocus.classList.add("d-none");
    setPhrase(catchphrases[Math.floor(Math.random() * catchphrases.length)]);
  };

  function formatInput(input) {
    let value = input.target.value;
    value = value.toString().padStart(2, "0");
    input.target.value = value;
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSeconds(secondsRemaining - 1);
    }, 1000);
    if (secondsRemaining === 0) {
      clearTimeout(timeoutId);
    }
    return () => clearTimeout(timeoutId);
  }, [secondsRemaining]);
  const formattedTime = new Date(secondsRemaining * 1000)
    .toISOString()
    .substr(11, 8);

  return (
    <div className="focus">
      <div className="timer d-flex flex-column justify-content-center">
        <div className="clock m-5  d-flex  justify-content-center">
          <h1 className="text-secondary">{formattedTime}</h1>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group d-flex flex-column">
            <div className="d-flex justify-content-center">
              <h2 className="select-timer-text text-primary mb-5">{phrase}</h2>
            </div>
            <div className="time-input d-flex justify-content-center">
              <input
                type="number"
                className="hours-input"
                min="0"
                step="1"
                placeholder="01"
                value={hours}
                onInput={(e) => formatInput(e)}
                onChange={(event) => setHours(event.target.value)}
              />
              <h3 className="p-3">hours</h3>
              <input
                type="number"
                className="minutes-input"
                min="0"
                max="59"
                step="1"
                placeholder="00"
                value={minutes}
                onInput={(e) => formatInput(e)}
                onChange={(event) => setMinutes(event.target.value)}
              />
              <h3 className="p-3">minutes</h3>
            </div>
          </div>
          <div className="submit-btn  d-flex justify-content-center my-3">
            <button type="submit" className="btn btn-white my-4 begin-focus">
              <h4 className="text-primary">Begin focus session</h4>
            </button>
          </div>
        </form>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have completed your focus session, now time for a break! We
          recommend your break length be 1/5 of your focus session.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="text-white"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Focus;
