function SearchPage({
  handleSearchSubmit,
  handleInputChange,
  querySearch,
  addSearchPage,
}) {
  return (
    <>
      <button className="add-button" onClick={() => addSearchPage()}>
        +
      </button>
      <div className="search-container">
        <div className="user-input">
          <h3>Lets see whats on Hacker News Today?</h3>
          <input
            type="text"
            placeholder="Search Reddit"
            value={querySearch}
            onChange={(event) => handleInputChange(event)}
          />
          <button
            className="search-button"
            onClick={() => handleSearchSubmit()}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
