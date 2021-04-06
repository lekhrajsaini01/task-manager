import React from "react";
import { useStateValue } from "../StateProvider";
import Fab from "./Buttons/Fab";
import TaskContainer from "./TaskContainer";

function Dashboard() {
  //intial state of task creation modal
  const [{ taskCreation }, dispatch] = useStateValue();

  const handleTaskCreation = () => {
    // a handle which enablse Task Creation Modal by send a dispatch Request
    // to context api to set taskCreation to true
    if (!taskCreation) {
      dispatch({
        type: "SET_TASK_CREATE",
        taskCreation: true,
      });
    }
  };
  return (
    <div className="dashboard__main">
      <TaskContainer title="All Tasks" />
      <Fab onClick={handleTaskCreation} />
    </div>
  );
}

export default Dashboard;
