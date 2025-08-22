import { z } from "zod";

export const taskSchema = z.object({
  name: z.string({
    required_error: "name is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
});