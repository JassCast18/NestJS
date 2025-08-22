import { useTasks } from "../../context/itemsContext";
import { Button, ButtonLink, Card } from "../ui";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.name}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task.id)}>Delete</Button>
          <ButtonLink to={`/tasks/${task.id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p className="text-slate-300">
        {task.price}
      </p>
    </Card>
  );
}