// import React, { useState, useEffect } from "react";

// function App() {
//   const [quote, setQuote] = useState("Loading...");

//   const fetchQuote = async () => {
//     try {
//       const response = await fetch("https://zenquotes.io/api/random");
//       const data = await response.json(); // Await the JSON response
//       setQuote(`${data[0].q} - ${data[0].a}`); // Access the quote and author
//     } catch (error) {
//       setQuote("Failed to fetch a quote. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchQuote();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Random Quote Generator</h1>
//       <div className="quote-box">
//         <p>"{quote}"</p>
//       </div>
//       <button onClick={fetchQuote}>Get New Quote</button>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput(""); // Clear the input
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true; // "All"
  });

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
      </div>

      <div style={styles.filters}>
        {["All", "Completed", "Pending"].map((filterName) => (
          <button
            key={filterName}
            onClick={() => setFilter(filterName)}
            style={{
              ...styles.filterButton,
              backgroundColor: filter === filterName ? "#007bff" : "#f0f0f0",
              color: filter === filterName ? "#fff" : "#000",
            }}
          >
            {filterName}
          </button>
        ))}
      </div>

      <ul style={styles.taskList}>
        {filteredTasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <span
              onClick={() => toggleTask(task.id)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  inputContainer: { display: "flex", justifyContent: "center", marginBottom: "20px" },
  input: { padding: "10px", width: "300px", marginRight: "10px" },
  addButton: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none" },
  filters: { marginBottom: "20px" },
  filterButton: { padding: "10px", margin: "0 5px", border: "1px solid #ddd", cursor: "pointer" },
  taskList: { listStyle: "none", padding: "0" },
  taskItem: { display: "flex", justifyContent: "space-between", margin: "10px 0" },
  deleteButton: { backgroundColor: "red", color: "white", border: "none", cursor: "pointer" },
};

export default TodoApp;
