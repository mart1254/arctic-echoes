import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function NewLog() {
  const { userLogs, saveLogs } = useOutletContext();
  const [log, setLog] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLog(prevLog => ({
      ...prevLog,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      ...log,
      id: Date.now(), // Generate a unique ID using the current timestamp
      date: new Date().toLocaleString()
    };
    saveLogs([...userLogs, newLog]);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Add New Log</h2>
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
        <button type="submit" className="btn btn-primary">Save Log</button>
      </form>
    </div>
  );
}

export default NewLog;
