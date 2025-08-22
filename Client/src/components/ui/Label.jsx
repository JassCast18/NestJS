export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="form-label small text-secondary my-1 d-block">
      {children}
    </label>
  );
}
