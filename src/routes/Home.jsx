import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

function Home() {
  const { logs, userLogs } = useOutletContext();
  const [filteredInitialLogs, setFilteredInitialLogs] = useState([]);
  const [filteredUserLogs, setFilteredUserLogs] = useState([]);

  useEffect(() => {
    // Combine, sort, and set the logs by date
    const sortedInitialLogs = [...logs].sort((a, b) => new Date(a.date) - new Date(b.date));
    const sortedUserLogs = [...userLogs].sort((a, b) => new Date(a.date) - new Date(b.date));

    setFilteredInitialLogs(sortedInitialLogs);
    setFilteredUserLogs(sortedUserLogs);
  }, [logs, userLogs]);

  const handleSearch = (query) => {
    const filteredInitial = filteredInitialLogs.filter(log =>
      log.title.toLowerCase().includes(query.toLowerCase()) ||
      log.content.toLowerCase().includes(query.toLowerCase())
    );

    const filteredUser = filteredUserLogs.filter(log =>
      log.title.toLowerCase().includes(query.toLowerCase()) ||
      log.content.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredInitialLogs(filteredInitial);
    setFilteredUserLogs(filteredUser);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {/* Initial Logs Section */}
      <div className="mt-5">
        <h2>Initial Logs</h2>
        <hr />
        <div className="row">
          {filteredInitialLogs.length > 0 ? (
            filteredInitialLogs.map(log => (
              <div className="col-12 col-md-6 col-lg-4 mb-3" key={log.id}>
                <Link className="text-decoration-none text-body" to={`/log/${log.id}`}>
                  <div className="card contact-card">
                    <div className="card-body">
                      <h5 className="card-title">{log.title}</h5>
                      <p className="card-text">{log.content.substring(0, 100)}...</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No initial logs found.</p>
          )}
        </div>
      </div>

      {/* User Logs Section */}
      <div className="mt-5">
        <h2>User Logs</h2>
        <hr />
        <div className="row">
          {filteredUserLogs.length > 0 ? (
            filteredUserLogs.map(log => (
              <div className="col-12 col-md-6 col-lg-4 mb-3" key={log.id}>
                <Link className="text-decoration-none text-body" to={`/log/${log.id}`}>
                  <div className="card contact-card">
                    <div className="card-body">
                      <h5 className="card-title">{log.title}</h5>
                      <p className="card-text">{log.content.substring(0, 100)}...</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No user logs found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
