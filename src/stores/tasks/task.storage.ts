import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import { Task, TaskStatus } from "../../interfaces";

export interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
}

export interface TaskActions {
  getTasksByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
  addTask: (title: string, status: TaskStatus) => void;
}

const taskStore: StateCreator<TaskState & TaskActions, [["zustand/devtools", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "1": {
      id: "1",
      title: "Task 1",
      status: "open",
    },
    "2": {
      id: "2",
      title: "Task 2",
      status: "in-progress",
    },
    "3": {
      id: "3",
      title: "Task 3",
      status: "done",
    },
    "4": {
      id: "4",
      title: "Task 4",
      status: "open",
    },
    "5": {
      id: "5",
      title: "Task 5",
      status: "open",
    },
    "6": {
      id: "6",
      title: "Task 6",
      status: "open",
    },
  },
  getTasksByStatus: (status: string): Task[] => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },
  setDraggingTaskId: (taskId: string): void => {
    set({ draggingTaskId: taskId }, false, "setDraggingTaskId");
  },
  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined }, false, "removeDraggingTaskId");
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    set((state) => ({ tasks: { ...state.tasks, [taskId]: { ...task, status } } }), false, "changeTaskStatus");
  },
  onTaskDrop: (status: TaskStatus) => {
    const draggingTaskId = get().draggingTaskId;
    if (!draggingTaskId) return;
    get().changeTaskStatus(draggingTaskId, status);
    get().removeDraggingTaskId();
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask = {
      id: uuid(),
      title,
      status,
    };
    set(
      (state) => ({
        tasks: {
          ...state.tasks,
          [newTask.id]: newTask,
        },
      }),
      false,
      "addTask"
    );
  },
});

export const useTaskStore = create<TaskState & TaskActions>()(devtools(taskStore));
