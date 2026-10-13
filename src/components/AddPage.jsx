import { useState, useEffect } from "react";
import LaneMenu from "./Dropdown/Dropdown";
import { FaSpinner } from "react-icons/fa6";
import "./Dropdown/Dropdown.css";
import { IoClose } from "react-icons/io5";

function AddPage({ id, value, onDelete }) {
  const [lane, setLane] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const redditResponse = async () => {
    if (!loading) setLoading(true);
    try {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${value}&tags=story`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLane(data.hits);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage(`${error}`);
    }
  };

  useEffect(() => {
    if (value !== "") redditResponse();
  }, [value]);

  if (loading) {
    return (
      <div className="lane">
        <FaSpinner className="animate-spin" size={18} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="lane">
        <LaneMenu onDelete={onDelete} onRefresh={redditResponse} />
        <p className="stories">{errorMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="lane">
        <LaneMenu onDelete={onDelete} onRefresh={redditResponse} />
        {/* <Dropdown onClick={} /> */}
        {/* <button className="btn-dropdown" onClick={onDelete}>
          <IoClose size={20} className="close-icon" />
        </button> */}
        <h1>Stories on "{value}"</h1>
        {lane.slice(0, 10).map((story) => {
          return (
            <div key={story.objectID}>
              <div className="stories">
                <p className="comments">{story.num_comments}</p>
                <p className="story">{story.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AddPage;
