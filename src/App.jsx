/* eslint-disable react/jsx-key */
import ToDoImage from "./Assets/pngwing.com.png";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputvalue, setinputvalue] = useState("");
  const [todoItem, settodoItem] = useState([]);
  const [isCompleted, setisCompleted] = useState(false);

  useEffect(() => {
    determinestatus();
  }, [todoItem]);

  const determinestatus = () => {
    if (!todoItem.length) {
      return setisCompleted(false);
    }

    let isallcompleted = true;

    todoItem.forEach((item) => {
      if (!item.completed) isallcompleted = false;
    });
    setisCompleted(isallcompleted);
  };

  const handlechangeinputvalue = (e) => {
    setinputvalue(e.target.value);
  };
  const handletodoItem = (e) => {
    if (e.key === "Enter") {
      if (inputvalue) {
        const updateItemlist = [...todoItem];

        const itemindex = updateItemlist.findIndex(
          (item) => item.name === inputvalue
        );

        if (itemindex === -1) {
          updateItemlist.push({
            name: inputvalue,
            quantity: 1,
            completed: false,
          });
        } else {
          updateItemlist[itemindex].quantity++;
        }

        settodoItem(updateItemlist);
        setinputvalue("");
      }
    }
  };

  const handledeleteitem = (name) => {
    settodoItem([...todoItem].filter((item) => item.name !== name));
  };

  const handleUpdateCompleteStatus = (status, index) => {
    const updateItemlist = [...todoItem];
    updateItemlist[index].completed = status;
    settodoItem(updateItemlist);
  };

  const rendorTodoList = () => {
    return todoItem.map((item, index) => (
      <li key={item.name}>
        <div className="container">
          <input
            type="checkbox"
            onChange={(e) => {
              handleUpdateCompleteStatus(e.target.checked, index);
            }}
            value={item.completed}
            checked={item.completed}
          />
          <p>
            {item.name}
            {item.quantity > 1 ? <span> X{item.quantity}</span> : null}
          </p>
        </div>
        <div>
          <button
            className="remove-button"
            onClick={() => {
              handledeleteitem(item.name);
            }}
          >
            x
          </button>
        </div>
      </li>
    ));
  };

  return (
    <main className="App">
      <div>
        <div>
          <div className="header">
            <h1>Shopping List</h1>
            {isCompleted && <h4 className="success"> All Tasks Are Done</h4>}
            <img src={ToDoImage} alt="" />
            <input
              type="text"
              placeholder="Add Task"
              className="item-input"
              onChange={handlechangeinputvalue}
              onKeyDown={handletodoItem}
              value={inputvalue}
            />
          </div>
        </div>
        <ul>{rendorTodoList()}</ul>
      </div>
    </main>
  );
}

export default App;
