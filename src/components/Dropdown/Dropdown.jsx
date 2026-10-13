import { useState } from "react";
import "./Dropdown.css";

// LaneMenu
function LaneMenu({ onDelete, onRefresh }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="btn-dropdown" onClick={() => setOpen(!open)}>
        ⋯
      </button>
      {open && (
        <ul className="btn-list">
          <li>
            <button
              onClick={() => {
                onRefresh();
                setOpen(false);
              }}
            >
              Refresh
            </button>
          </li>
          <li>
            <button onClick={onDelete}>Delete</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default LaneMenu;
