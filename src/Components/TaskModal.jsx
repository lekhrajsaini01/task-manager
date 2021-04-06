import React from "react";
import ContentEditable from "react-contenteditable";
import DateAndTimePickers from "./DateTimePicker";
import axios from "axios";
import Button from "./Buttons/Button";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStateValue } from "../StateProvider";

function TaskModal({ message, due_date, task_priority, id }) {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();
  const [name, setName] = React.useState(message);
  const [due, setDue] = React.useState(due_date);
  const [isRendered, setRendered] = React.useState(false);
  const [userList, setUserList] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [priority] = React.useState(task_priority);
  let taskRef = React.createRef();

  const handleSelected = (e) => {
    if (e.target.value !== "") {
      setSelectedUser(e.target.value);
    }
  };

  // Getting a list of users from the api
  React.useEffect(() => {
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
      setUserList([data && data.users.map((user) => user)]);
      return setRendered(true);
    });
  }, []);

  //handle Task Update

  const handleUpdate = () => {
    // let index = tasks && tasks.findIndex((task) => task.id == id);

    async function updateRemote() {
      var bodyFormData = new FormData();

      bodyFormData.append("message", name);
      bodyFormData.append("assigned_to", selectedUser);
      //2020-09-18 12:12:12
      bodyFormData.append(
        "due_date",
        due &&
          `${new Date(due).getFullYear()}-${new Date(
            due
          ).getMonth()}-${new Date(due).getDate()} ${
            new Date(due).getHours() +
            ":" +
            new Date(due).getMinutes() +
            ":" +
            new Date(due).getSeconds()
          }`
      );
      bodyFormData.append("priority", priority);
      bodyFormData.append("taskid", id);

      try {
        const r = await axios({
          method: "post",
          url: "https://devza.com/tests/tasks/update",
          data: bodyFormData,

          headers: {
            "Content-Type": "multipart/form-data",
            AuthToken: "FFasjYZoJtXc8sX7TzdIvk7YhA9n5AJv",
          },
        });
        return r.status;
      } catch (e) {
        if (e.response && e.response.data) {
          console.error(e.response.data);
        }
      }
    }
    updateRemote().then((status) => {
      console.log(status);
      if (status === 200) {
        dispatch({
          type: "DELETE_TASK",
          id: id,
        });

        dispatch({
          type: "ADD_TASK",
          task: {
            id: id,
            message: name,
            assigned_to: selectedUser && selectedUser,
            assigned_name: userList && userList[0][selectedUser - 1].name,
            created_on: new Date().getTime(),
            due_date: `${new Date(due).getFullYear()}-${new Date(
              due
            ).getMonth()}-${new Date(due).getDate()} ${
              new Date(due).getHours() +
              ":" +
              new Date(due).getMinutes() +
              ":" +
              new Date(due).getSeconds()
            }`,
            priority: priority,
          },
        });

        dispatch({ type: "SET_TASK_MODAL", taskModal: null });
        dispatch({ type: "SET_SEARCH", isSearch: false });
      }
    });
  };

  //handle delete

  const handleDelete = () => {
    async function deleteRemote() {
      var bodyFormData = new FormData();
      bodyFormData.append("taskid", id);
      try {
        const r = await axios({
          method: "post",
          url: "https://devza.com/tests/tasks/delete",
          data: bodyFormData,

          headers: {
            "Content-Type": "multipart/form-data",
            AuthToken: "FFasjYZoJtXc8sX7TzdIvk7YhA9n5AJv",
          },
        });
        return r.status;
      } catch (e) {
        if (e.response && e.response.data) {
          console.log(e.response.data);
        }
      }
    }

    deleteRemote().then((status) => {
      if (status === 200) {
        dispatch({ type: "DELETE_TASK", id: id });
        dispatch({ type: "SET_TASK_MODAL", taskModal: null });
        dispatch({ type: "SET_SEARCH", isSearch: false });
      }
    });
  };

  //Handle Modal Close

  const handleModalClose = () => {
    dispatch({
      type: "SET_TASK_MODAL",
      taskModal: null,
    });
  };

  return (
    <div className="task-modal">
      <div className="task__modal__wrapper">
        <div className="task__modal__header">
          <span className="task_modal__title">Task Detail</span>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="task__moda-body">
          <ContentEditable
            className="task__name"
            innerRef={taskRef}
            html={name} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(e) => setName(e.target.value)} // handle innerHTML change
            tagName="h1" // Use a custom HTML tag (uses a div by default)
          />

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

          <div className="task__crud__controls">
            <Button
              color="link"
              variant="contained"
              size="large"
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
