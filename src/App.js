import "./App.css";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import TaskCreation from "./Components/TaskCreation";
import TaskModal from "./Components/TaskModal";
import React from "react";
import { useStateValue } from "./StateProvider";
import Snakbar from "./Components/Snakbar";

function App() {
  //Data to open Selected Task Modal
  const [{ taskModal }] = useStateValue();
  const [isSnackbar, setSnackbar] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const handleClose = () => {
    setSnackbar(false);
  };

  const handleAutoClose = () => {
    setTimeout(() => {
      setSnackbar(false);
    }, 5000);
  };
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
      {isError && (
        <Snakbar
          snackbar={isSnackbar}
          onClick={handleClose}
          message={isError && isError}
          handleAutoClose={handleAutoClose}
          direction="bottom-left"
        />
      )}
      <TaskCreation setError={setError} setSnackbar={setSnackbar} />
      {taskModal != null && (
        <TaskModal
          message={taskModal.name}
          task_priority={taskModal.priority}
          due_date={taskModal.due_date}
          id={taskModal.id}
        />
      )}
    </div>
  );
}

export default App;
