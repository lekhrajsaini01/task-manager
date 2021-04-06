import React, { useEffect } from "react";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import EmptyNotes from "./EmptyNotes";
import { useStateValue } from "../StateProvider";
import Loading from "./Loading";
import FilteredResults from "./FilteredResults";

function TaskContainer({ title }) {
  const [{ tasks, isRendered, isSearch }, dispatch] = useStateValue();

  // react-beautiful-dnd 3rd Party npm library which enable us to drag & drop items
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    // first convert an Array from a group of JSON objects to
    const items = Array.from(tasks);
    // splicing our sourc element by using source.index on items
    // Array
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // storing all tasks to Context API
    dispatch({
      type: "SET_TASKS",
      tasks: items,
    });
  }

  useEffect(
    () => {
      const fetchTodo = async () => {
        try {
          const r = await axios.get("https://devza.com/tests/tasks/list", {
            headers: {
              application: "application/json",
              AuthToken: "FFasjYZoJtXc8sX7TzdIvk7YhA9n5AJv",
            },
          });
          return r.data;
        } catch (e) {
          if (e.response && e.response.data) {
            console.error(e.response.data);
          }
        }
      };

      fetchTodo().then((data) => {
        dispatch({
          type: "SET_RENDERED",
          isRendered: true,
        });
        dispatch({
          type: "SET_TASKS",
          tasks: data && data.tasks,
        });
      });
    },
    // eslint-disable-next-line
    []
  );

  // handle Search

  return (
    <>
      {!isSearch && (
        <React.Fragment>
          {isRendered ? (
            <>
              {tasks && tasks.length > 0 ? (
                <div className="task__container">
                  <div className="task__container__header">
                    <span>{title}</span>
                  </div>

                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                      {(provided) => (
                        <div
                          className="characters tasks__list__container"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {tasks.length > 0 &&
                            tasks.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id + ""}
                                  draggableId={item.id + ""}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <Task
                                        id={item.id}
                                        message={item.message}
                                        priority={item.priority}
                                        due_date={item.due_date}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              ) : (
                <EmptyNotes />
              )}
            </>
          ) : (
            <Loading />
          )}
        </React.Fragment>
      )}
      {isSearch && <FilteredResults />}
    </>
  );
}

export default TaskContainer;
