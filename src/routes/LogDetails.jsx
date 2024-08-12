import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useOutletContext } from "react-router-dom";

function LogDetails() {
  const { id } = useParams();
  const { logs, userLogs, saveLogs } = useOutletContext();
  const [log, setLog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the log either in initialLogs or userLogs
    const foundLog = logs.find(log => log.id === Number(id)) || userLogs.find(log => log.id === Number(id));
    if (foundLog) {
      setLog(foundLog);
    } else {
      navigate("/"); // If no log is found, navigate back to home
    }
  }, [id, logs, userLogs, navigate]);

  const handleDelete = () => {
    const isUserLog = userLogs.some(log => log.id === Number(id));
    if (isUserLog) {
      const updatedLogs = userLogs.filter(log => log.id !== Number(id));
      saveLogs(updatedLogs); // Update user logs in localStorage
    }
    navigate("/"); // Go back to the homepage after deletion
  };

  if (!log) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2>{log.title}</h2>
      <p><strong>Date:</strong> {log.date}</p>
      <p>{log.content}</p>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>Back</button>
        {userLogs.some(userLog => userLog.id === log.id) && (
          <>
            <Link to={`/edit/${log.id}`} className="btn btn-primary">Edit</Link>
            <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default LogDetails;
