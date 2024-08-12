function SearchBar({ onSearch }) {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder="Search logs"
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
