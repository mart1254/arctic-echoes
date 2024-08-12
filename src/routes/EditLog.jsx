import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

function EditLog() {
  const { id } = useParams();
  const { userLogs, saveLogs } = useOutletContext();
  const [log, setLog] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const existingLog = userLogs.find(log => log.id === Number(id));
    if (existingLog) {
      setLog(existingLog);
    } else {
      navigate("/"); // If no log is found, navigate back to home
    }
  }, [id, userLogs, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog(prevLog => ({
      ...prevLog,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedLogs = userLogs.map(l =>
      l.id === Number(id) ? { ...log, date: new Date().toLocaleString() } : l
    );
    saveLogs(updatedLogs);
    navigate(`/log/${id}`);
  };

  return (
    <div className="container">
      <h2>Edit Log</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={log.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            name="content"
            value={log.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default EditLog;
