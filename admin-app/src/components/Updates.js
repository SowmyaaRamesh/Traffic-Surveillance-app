import React, { useEffect, useState } from "react";
import axios from "axios";

export const Updates = () => {
  useEffect(() => {
    getUpdates();
  }, []);

  const [updates, setUpdates] = useState([]);

  const getUpdates = async () => {
    const res = await axios.get("http://localhost:5000/updates");
    // console.log(res.data);
    setUpdates([...updates, res.data]);
  };

  return (
    <div className="updates-container">
      <h4>Flagged Vehicle Updates</h4>
      <div className="update">
        {updates.map((update) => (
          <p>
            Vehicle number {update.plateNum} spotted at {update.time}
          </p>
        ))}
      </div>
    </div>
  );
};
