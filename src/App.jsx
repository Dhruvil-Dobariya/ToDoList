/* eslint-disable react/jsx-key */
import groceryimg from "./Assets/i3.png";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputvalue, setinputvalue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted, setisCompleted] = useState(false);

  useEffect(() => {
    determinestatus();
  }, [groceryItems]);

  const determinestatus = () => {
    if (!groceryItems.length) {
      return setisCompleted(false);
    }

    let isallcompleted = true;

    groceryItems.forEach((item) => {
      if (!item.completed) isallcompleted = false;
    });
    setisCompleted(isallcompleted);
  };

  const handlechangeinputvalue = (e) => {
    setinputvalue(e.target.value);
  };
  const handleGroceryItems = (e) => {
    if (e.key === "Enter") {
      if (inputvalue) {
        const updateItemlist = [...groceryItems];

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

        setGroceryItems(updateItemlist);
        setinputvalue("");
      }
    }
  };

  const handledeleteitem = (name) => {
    setGroceryItems([...groceryItems].filter((item) => item.name !== name));
  };

  const handleUpdateCompleteStatus = (status, index) => {
    const updateItemlist = [...groceryItems];
    updateItemlist[index].completed = status;
    setGroceryItems(updateItemlist);
  };

  const rendorgroceryList = () => {
    return groceryItems.map((item, index) => (
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
          {isCompleted && <h4 className="success">You Are Done</h4>}
          <div className="header">
            <h1>Shopping List</h1>
            <img src={groceryimg} alt="" />
            <input
              type="text"
              placeholder="Add An Item"
              className="item-input"
              onChange={handlechangeinputvalue}
              onKeyDown={handleGroceryItems}
              value={inputvalue}
            />
          </div>
        </div>
        <ul>{rendorgroceryList()}</ul>
      </div>
    </main>
  );
}

export default App;
