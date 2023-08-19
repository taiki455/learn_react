import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [items, setItems] = useState([]);
  const [counter, setCounter] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newItem = {
        id: counter,
        value: inputValue,
        priority: priorityValue,
      };
      setItems([...items, newItem]);
      setInputValue("");
      setPriorityValue("");
      setCounter(counter + 1);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedItems = items.filter(
      (item) => !selectedItems.includes(item.id)
    );
    setItems(updatedItems);
    setSelectedItems([]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple">
      <div className="bg-white rounded-lg shadow-md p-6 w-80">
        <h1 className="text-3xl font-cute text-center text-pink mb-4">
          優先順位付きToDoリスト
        </h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="text-lg text-teal font-cute">
            今日のToDoをここに入力:
            <input
              type="text"
              name="name"
              className="border-2 border-teal rounded-md px-2 py-1 mt-1 w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
          <label className="text-lg text-teal font-cute mt-2">
            優先順位（数字で入力）:
            <input
              type="number"
              name="priority"
              className="border-2 border-teal rounded-md px-2 py-1 mt-1 w-full"
              value={priorityValue}
              onChange={(e) => setPriorityValue(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="bg-teal text-white px-4 py-2 rounded-lg mt-2 block w-full"
          >
            Add
          </button>
        </form>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id.toString()}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center py-2"
                      >
                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => handleCheckboxChange(item.id)}
                          />
                          <span
                            className={`text-pink font-cute ${
                              selectedItems.includes(item.id) && "line-through"
                            }`}
                          >
                            優先度: {item.priority} - {item.value}
                          </span>
                        </label>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        {selectedItems.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-pink text-white px-4 py-2 rounded-lg mt-4 block w-full"
          >
            削除
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
