import React, { useState, useEffect } from "react";
import axios from "axios";

export const CarDetails = () => {
  const [details, setDetails] = useState([]);
  var parameters;

  const [toggle, setToggle] = useState(0);

  // setInterval(() => {
  //   setToggle(toggle ? 0 : 1);
  // }, 3000);

  useEffect(() => {
    getParams(); //get input form parameters for filtering
    getDetails();
  }, []);

  const getParams = async () => {
    const res = await axios.get("http://localhost:5000/track");
    parameters = Object.values(res.data);

    // Model name + color
    if (parameters[3] != "" && parameters[2] != "") {
      parameters[2] = parameters[2] + " " + parameters[3];
      parameters.pop();
    }
  };

  const getDetails = async () => {
    const res = await axios.get("http://localhost:5000/flagInfo");
    // console.log(res.data);
    const objs = res.data;
    // console.log("DB:", objs);

    parameters = parameters.filter((item) => item != "");
    // console.log(parameters);

    let t = [];

    objs.map((obj) => {
      let flag = 1;
      for (var i = 0; i < parameters.length; i++) {
        if (
          parameters[i] == obj.license_plate_no ||
          parameters[i] == obj.car_name ||
          parameters[i] == obj.owner_name
        ) {
          flag = 0;
        } else {
          flag = 1;
        }
      }
      if (flag == 0) {
        // console.log(obj);
        t.push(obj);
      }
    });
    setDetails(t);
    let lp = [];
    lp = t.map((item) => item.license_plate_no);
    // console.log(lp);
    axios
      .post("http://localhost:5000/flagInfo", {
        LP: lp,
      })
      .then(() => console.log("Detailes posted"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <table className="table">
      <tr>
        <th>Car Name</th>
        <th>License Plate</th>
        <th>Owner</th>
        <th>Phone</th>
        <th>Owner Bank Account</th>
      </tr>
      {details.map((detail) => (
        <tr>
          <td>{detail.car_name}</td>
          <td>{detail.license_plate_no}</td>
          <td>{detail.owner_name}</td>
          <td>{detail.owner_phone_no}</td>
          <td>{detail.owner_bank_acc_no}</td>
        </tr>
      ))}
    </table>
  );
};
