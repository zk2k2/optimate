import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import {
  faMagnifyingGlass,
  faArrowDownWideShort,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "../assets/styles/objectives.css";
import ToDoItem from "./ToDoItem";
import { Modal } from "react-bootstrap";

const Objectives = () => {
  console.log(localStorage.getItem("doneObjectives"));
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const priority = {
    "Critical Priority": 1,
    "High Priority": 2,
    "Medium Priority": 3,
    "Low Priority": 4,
  };
  const difficulty = {
    Hard: 1,
    Medium: 2,
    Easy: 3,
  };

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSort = (sortTerm) => {
    setSortTerm(sortTerm);
    switch (sortTerm) {
      case "priority":
        setTodos((todos) => {
          return todos.sort((a, b) => {
            return priority[a.priority] - priority[b.priority];
          });
        });
        break;
      case "difficulty":
        setTodos((todos) => {
          return todos.sort((a, b) => {
            return difficulty[a.difficulty] - difficulty[b.difficulty];
          });
        });
        break;
      case "dueDate":
        setTodos((todos) => {
          return todos.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
          });
        });
        break;
    }
  };
  const SearchBar = () => {
    useEffect(() => {
      inputRef.current.focus();
    }, []);

    return (
      <div className="search-bar position-relative">
        <Form.Control
          type="search"
          onChange={handleSearch}
          placeholder="Search for an objective..."
          className="pl-10 pr-8 w-100"
          aria-label="Search"
          value={searchTerm}
          ref={inputRef}
        />
        <div className="search-icon position-absolute top-50 end-0 translate-middle-y">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            className="text-secondary"
          />
        </div>
      </div>
    );
  };
  const SortButton = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          className="bg-white text-primary border-0"
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} size="lg" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            {" "}
            <Button
              variant="white text-black"
              onClick={() => handleSort("priority")}
            >
              Priority
            </Button>
          </Dropdown.Item>
          <Dropdown.Item>
            {" "}
            <Button
              variant="white text-black"
              onClick={() => handleSort("dueDate")}
            >
              Due date
            </Button>
          </Dropdown.Item>
          <Dropdown.Item>
            {" "}
            <Button
              variant="white text-black"
              onClick={() => handleSort("difficulty")}
            >
              Difficulty
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setIndex(index + 1);
    const newTodo = {
      title: form.title.value,
      duration: form.duration.value,
      dueDate: new Intl.DateTimeFormat("en-US", options).format(
        new Date(form.dueDate.value)
      ),
      priority: form.priority.value,
      difficulty: form.difficulty.value,
      description: form.description.value,
      itemId:
        String.fromCharCode(97 + Math.floor(Math.random() * 26)) +
        Math.floor(Math.random() * 100),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodo({});
    setShowModal(false);
  };

  return (
    <div className="objectives">
      <div className="page-container row">
        <div className="animation-container col-xl-4 mx-5 d-none d-xl-block">
          <img
            src="../assets/img/objectives-animation.gif"
            className="img-fluid float w-100"
            alt=""
          />
        </div>

        <div className="to-do-container col-xl-6 border border-black rounded p-4 mx-5 ">
          <div className="settings d-flex ">
            <div>
              <Button
                variant="secondary text-white add-objective mx-2 px-4"
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="mx-2" />
                Add Objective
              </Button>
            </div>
            <div style={{ marginRight: "0.75rem" }}>
              <Button
                variant="quaternary text-white clear-all px-4"
                onClick={() => setTodos([])}
              >
                <FontAwesomeIcon icon={faXmark} className="mx-2" />
                Clear All
              </Button>
            </div>

            <Form>
              <SearchBar />
            </Form>
            <SortButton></SortButton>
          </div>
          <div className="to-do-items">
            {todos
              .filter((todo) =>
                todo.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .sort((a, b) => {
                switch (sortTerm) {
                  case "priority":
                    return a.priority - b.priority;
                  case "dueDate":
                    return new Date(a.dueDate) - new Date(b.dueDate);
                  case "difficulty":
                    return a.difficulty - b.difficulty;
                  default:
                    return 0;
                }
              })
              .map((todo) => (
                <ToDoItem {...todo} key={todo.itemId} />
              ))}
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Add a new objective
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="my-2">
              <Form.Label>Objective title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter objective title, keep it short and clear!"
                name="title"
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Objective description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter a description..."
                maxLength={90}
                name="description"
              />
              <span className="text-tertiary">
                Please don't exceed 90 characters.
              </span>
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Due date:</Form.Label>
              <Form.Control
                type="datetime-local"
                min={new Date().toISOString().slice(0, 16)}
                name="dueDate"
              />
            </Form.Group>

            <Form.Group className="my-2">
              <Form.Label>Level of difficulty:</Form.Label>

              <Form.Control as="select" name="difficulty">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Estimated time of completion:</Form.Label>

              <Form.Control as="select" className="mb-2" name="duration">
                <option>&lt;15 minutes</option>
                <option>15 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>1 hour</option>
                <option>1.5 hours</option>
                <option>2 hours</option>
                <option>2.5 hours</option>
                <option>3 hours</option>
              </Form.Control>
              <span className="text-tertiary">
                Tip: If your objective's duration exceeds two hours, we
                recommend subdivising it in smaller objectives!
              </span>
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>Level of priority:</Form.Label>

              <Form.Control as="select" className="mb-2" name="priority">
                <option>Low Priority</option>
                <option>Medium Priority</option>
                <option>High Priority</option>
                <option>Critical Priority</option>
              </Form.Control>
            </Form.Group>
            <div className="buttons d-flex justify-content-around m-3">
              <div className="flex col-md-6 me-2">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="quaternary  w-100"
                >
                  Cancel
                </Button>
              </div>
              <div className="flex col-md-6 ms-2">
                <Button variant="primary w-100" type="submit">
                  Add objective
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default Objectives;
