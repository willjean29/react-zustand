import { StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { create } from "zustand";

export interface TaskState {
  tasks: Record<string, Task>;
}

export interface TaskActions {
  getTasksByStatus: (status: TaskStatus) => Task[];
}

const taskStore: StateCreator<TaskState & TaskActions> = (set, get) => ({
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
  },
  getTasksByStatus(status: string): Task[] {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },
});

export const useTaskStore = create<TaskState & TaskActions>()(taskStore);
