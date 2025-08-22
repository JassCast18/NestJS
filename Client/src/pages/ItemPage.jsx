import { useEffect } from "react";
import { useTasks } from "../context/itemsContext";
import { TaskCard } from "../components/items/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      {tasks.length === 0 && (
        <div className="d-flex justify-content-center align-items-center p-5">
          <div className="text-center">
            <ImFileEmpty className="display-3 text-secondary mb-3" />
            <h1 className="fw-bold fs-4">
              No items yet, please add a new item
            </h1>
          </div>
        </div>
      )}

      <div className="row g-3">
        {tasks.map((task) => (
          <div className="col-md-6 col-lg-4" key={task.id}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </>
  );
}
