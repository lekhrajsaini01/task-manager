export const intialState = {
  sidebar: false,
  taskCreation: false,
  tasks: null,
  isRendered: false,
  taskModal: null,
  isSearch: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SIDEBAR":
      return {
        ...state,
        sidebar: action.sidebar,
      };

    case "SET_SEARCH":
      return {
        ...state,
        isSearch: action.isSearch,
      };

    case "SET_TASK_CREATE":
      return {
        ...state,
        taskCreation: action.taskCreation,
      };

    case "SET_TASK_MODAL":
      return {
        ...state,
        taskModal: action.taskInfo,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };

    case "DELETE_TASK":
      const index = state.tasks.findIndex((task) => task.id === action.id);
      let newTasks = [...state.tasks];

      if (index >= 0) {
        newTasks.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        tasks: newTasks,
      };

    case "SET_TASKS":
      return {
        ...state,
        tasks: action.tasks,
      };

    case "SET_RENDERED":
      return {
        ...state,
        isRendered: action.isRendered,
      };
    //   case "ADD_TO_BASKET":
    //     return {
    //       ...state,
    //       basket: [...state.basket, action.item],
    //     };

    //   case "SET_USER":
    //     return {
    //       ...state,
    //       user: action.user
    //     }

    default:
      return state;
  }
};

export default reducer;
