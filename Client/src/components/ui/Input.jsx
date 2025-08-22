import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="form-control bg-dark text-white my-2"
    style={{ borderRadius: '0.375rem' }} // equivalente a rounded-md
  />
));
