import { useEffect, useState } from "react";
import AddPage from "./AddPage";
import SearchPage from "./SearchPage";
import AddLane from "./AddLane";

function HomePage() {
  const [subReddits, setSubReddits] = useState([]);
  const [searchPages, setSearchPage] = useState(1);
  const [querySearch, setQuerySearch] = useState("");
  const [lanes, setLanes] = useState(loadLanes);

  const handleInputChange = (event) => {
    setQuerySearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    const newLaneObject = {
      id: crypto.randomUUID(),
      name: querySearch,
    };

    setSubReddits([...subReddits, newLaneObject]);
  };

  const addSearchPage = () => {
    setSearchPage(searchPages + 1);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(lanes));
  }, [lanes]);

  function loadLanes() {
    try {
      const raw = localStorage.getItem("list");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return (
    <>
      <div className="lane-container">
        {[...Array(searchPages)].map((index) => {
          return (
            <div>
              <SearchPage
                handleInputChange={handleInputChange}
                handleSearchSubmit={handleSearchSubmit}
                querySearch={querySearch}
                addSearchPage={addSearchPage}
              />
            </div>
          );
        })}
        {subReddits.map((term) => {
          return (
            <AddPage
              key={term.id}
              value={term.name}
              onDelete={() => {
                setSubReddits(
                  subReddits.filter((query) => query.id !== term.id)
                );
              }}
            />
          );
        })}
      </div>
    </>
  );
}
export default HomePage;
