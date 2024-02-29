import { useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";
interface UseTasksOptions {
  status: TaskStatus;
}

export const useTasks = ({ status }: UseTasksOptions) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);
  const [isDragOver, setIsDragOver] = useState(false);
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    onTaskDrop(status);
  };
  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Titulo de la tarea",
      inputPlaceholder: "Ingrese el titulo de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe ingresar el titulo de la tarea";
        }
      },
    });
    if (!isConfirmed) return;
    addTask(value, status);
  };

  return {
    isDragOver,
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleAddTask,
  };
};
