import React from "react";
import Task from "./Task";
import { useStateValue } from "../StateProvider";
import SearchIcon from "@material-ui/icons/Search";

function FilteredResults() {
  const [{ tasks }, dispatch] = useStateValue();
  // stored tasks in context API
  const [data, setData] = React.useState(tasks && tasks);
  // intial state of task data which are intalized with task from context
  // Context API tasks
  const handleSearch = (e) => {
    //  A utility function which search for a particular
    // by matching task name with all of the task inside the context
    // API
    let results =
      tasks &&
      tasks.filter((task) => {
        return task.message
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });

    if (e.target.value.length > 0) {
      setData(results);
    } else {
      dispatch({ type: "SET_SEARCH", isSearch: false });
    }
  };
  return (
    <div>
      <>
        <div className="task__container">
          <div className="task__container__header">
            <div className="searchBarMobile">
              <SearchIcon />
              <input type="text" name="key" id="key" onChange={handleSearch} />
            </div>
            {/* <span>{title}</span> */}
          </div>
          <div className="characters tasks__list__container">
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div>
                    <Task
                      id={item.id}
                      message={item.message}
                      priority={item.priority}
                      due_date={item.due_date}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </>
    </div>
  );
}

export default FilteredResults;
