import React, { useEffect, useState } from "react";
import axios from "axios";
import RefreshIcon from "@material-ui/icons/Refresh";

export const Updates = () => {
  useEffect(() => {
    getUpdates();
  }, []);

  const [updates, setUpdates] = useState([]);

  const getUpdates = async () => {
    const res = await axios.get("http://localhost:5000/updates");
    console.log(res.data);
    setUpdates(res.data);
  };

  const handleClick = () => {
    getUpdates();
  };

  return (
    <>
      <RefreshIcon className="button" onClick={handleClick} />
      <div className="updates-container">
        <h2>Flagged Vehicle Updates</h2>

        {updates.map((update) => (
          <div className="update">
            <p>
              Vehicle number {update.plateNum} spotted at {update.time}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
