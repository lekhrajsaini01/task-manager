import { IconButton } from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Button from "./Buttons/Button";
import { useStateValue } from "../StateProvider";
import ContentEditable from "react-contenteditable";
import axios from "axios";
import DateAndTimePickers from "./DateTimePicker";

function TaskCreation({ setError, setSnackbar }) {
  const [{ taskCreation }, dispatch] = useStateValue();
  const [name, setName] = React.useState("Task Name");
  const [isRendered, setRendered] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [due, setDue] = React.useState(null);
  const [priority, setPriority] = React.useState(1);

  let taskRef = React.createRef();

  const handleTaskClose = () => {
    dispatch({
      type: "SET_TASK_CREATE",
      taskCreation: false,
    });
  };

  const handleSelected = (e) => {
    if (e.target.value !== "") {
      setSelectedUser(e.target.value);
    }
  };

  const checkEmptyFields = () => {
    if (name === "Task Name") {
      return true;
    } else if (!selectedUser) {
      return true;
    } else {
      return false;
    }
  };

  // Getting a list of users from the api
  React.useEffect(
    () => {
      async function getUserList() {
        try {
          const r = await axios.get(`https://devza.com/tests/tasks/listusers`, {
            headers: {
              "Content-Type": "application/json",
              AuthToken: "FFasjYZoJtXc8sX7TzdIvk7YhA9n5AJv",
            },
          });
          if (r.status === 200) {
            return r.data;
          }
        } catch (e) {
          if (e.response && e.response.data) {
            console.log(e.response.data);
          }
        }
      }

      // Call getUserList
      getUserList().then((data) => {
        setUserList([...userList, data && data.users]);
        return setRendered(true);
      });
    },
    // eslint-disable-next-line
    []
  );

  const handleTaskAdd = async () => {
    if (checkEmptyFields()) {
      setSnackbar(true);
      return setError("please fill the fields");
    }

    var bodyFormData = new FormData();

    bodyFormData.append("message", name);
    bodyFormData.append("assigned_to", 1);
    //2020-09-18 12:12:12
    bodyFormData.append(
      "due_date",
      due &&
        `${new Date(due).getFullYear()}-${new Date(due).getMonth()}-${new Date(
          due
        ).getDate()} ${
          new Date(due).getHours() +
          ":" +
          new Date(due).getMinutes() +
          ":" +
          new Date(due).getSeconds()
        }`
    );
    bodyFormData.append("priority", priority);

    try {
      const r = await axios({
        method: "post",
        url: "https://devza.com/tests/tasks/create",
        data: bodyFormData,

        headers: {
          "Content-Type": "multipart/form-data",
          AuthToken: "FFasjYZoJtXc8sX7TzdIvk7YhA9n5AJv",
        },
      });

      if (r.status === 200) {
        dispatch({
          type: "ADD_TASK",
          task: {
            id: r.data.taskid,
            message: name,
            assigned_to: 1,
            assigned_name: userList[0].name,
            created_on: new Date().getTime(),
            due_date: due,
            priority: priority,
          },
        });
        dispatch({
          type: "SET_TASK_CREATE",
          taskCreation: false,
        });
        setName("Task Name");
        setDue(new Date().getTime());
        setSelectedUser(null);
        setPriority(1);
      }
    } catch (e) {
      if (e.response && e.response.data) {
        console.error(e.response.data);
      }
    }
  };
  return (
    <div className={`task-creation ${taskCreation && "task-creation__enable"}`}>
      <div className="task__creation__haeder">
        <div className="task__creation__haeder_left">
          <span>New Task</span>
        </div>
        <div className="task__creation__header__right">
          <IconButton size="medium" onClick={handleTaskClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div className="task__creation__body">
        <ContentEditable
          className="task__name"
          innerRef={taskRef}
          html={name} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={(e) => setName(e.target.value)} // handle innerHTML change
          tagName="h1" // Use a custom HTML tag (uses a div by default)
        />
      </div>
      <div className="task__creation__footer">
        <div className="task__footer__creation__controls">
          <DateAndTimePickers setDue={setDue} />
          <div className="form__control">
            <select className="user__list" onChange={handleSelected}>
              <option value={""}>Select User</option>
              {isRendered &&
                userList[0] &&
                userList[0].map((user, index) => {
                  return (
                    <option value={user.id} key={index}>
                      {user.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <Button
          disableElevation
          color="link"
          variant="contained"
          onClick={handleTaskAdd}
          size="large"
        >
          Assign
        </Button>
      </div>
    </div>
  );
}

export default TaskCreation;
