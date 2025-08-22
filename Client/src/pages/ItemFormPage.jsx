import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useTasks } from "../context/itemsContext";
import { useForm } from "react-hook-form";

dayjs.extend(utc);

export function ItemFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  
  const params = useParams();
  console.log("Params recibidos:", params);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data
        });
      } else {
        createTask({
          ...data
        });
      }
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("name", task.name);
        setValue("description", task.description);
        setValue("price", task.price);
        
      }
    };
    loadTask();
  }, [params.id, getTask, setValue]);

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: "32rem" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="Name"
            className="form-control"
            placeholder="Name"
            {...register("name", { required: true })}
            autoFocus
          />
          {errors.name && (
            <div className="text-danger small">Please enter a name.</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="3"
            placeholder="Description"
            {...register("description")}
          ></textarea>
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-control"
            {...register("price", { valueAsNumber: true })}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save
        </button>
      </form>
    </div>
  );
}