export function Card({ children }) {
  return (
    <div 
      className="card bg-dark text-white p-4 my-3 shadow rounded"
      style={{ maxWidth: '28rem' }}
    >
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
