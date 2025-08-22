export function Button({ onClick, children, disabled }) {
  return (
    <button
      type="button"
      className="btn btn-primary my-2"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
