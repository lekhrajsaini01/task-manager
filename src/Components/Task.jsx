import React from "react";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useStateValue } from "../StateProvider";

function Task({ id, message, priority, due_date }) {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();

  // handler for enable Task Selection Modal by sending
  // a dispatch request to the Context API

  const handleTaskModal = () => {
    dispatch({
      type: "SET_TASK_MODAL",
      taskInfo: { name: message, priority, due_date, id: id },
    });
  };
  return (
    <>
      <AnimateSharedLayout>
        <motion.div className="task__card" id={id} onClick={handleTaskModal}>
          <div className="task__card__wrapper">
            <div className="task__top">
              <span className="task__title">{message}</span>
            </div>
            <div className="task__bottom">
              <div className="timestamp">
                <QueryBuilderIcon />
                <span>
                  {new Date(due_date).getDate() +
                    "-" +
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][new Date(due_date).getMonth()] +
                    "-" +
                    new Date(due_date).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimateSharedLayout>
    </>
  );
}

export default Task;
