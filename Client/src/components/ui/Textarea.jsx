import { forwardRef } from "react";

export const Textarea = forwardRef(({ rows = 2, ...props }, ref) => (
  <textarea
    {...props}
    ref={ref}
    className="form-control bg-dark text-white my-2"
    style={{ borderRadius: '0.375rem' }} // equivalente a rounded-md
    rows={rows}
  />
));
