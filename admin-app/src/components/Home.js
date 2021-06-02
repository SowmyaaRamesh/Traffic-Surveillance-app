import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Updates } from "./Updates";
import { CarDetails } from "./CarDetails";
import axios from "axios";

export const Home = () => {
  const [passProps, setPassProps] = useState(0);
  const [lp, setLP] = useState("");
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(name, model);
    axios
      .post("http://localhost:5000/track", {
        LP: lp,
        Name: name,
        Model: model,
        Color: color,
      })
      .then(() => console.log("Detailes posted"))
      .catch((err) => {
        console.log(err);
      });

    setLP("");
    setName("");
    setModel("");
    setColor("");
  };

  return (
    <div className="root-container">
      <div className="image-container">
        <Header />
        <div>
          <div className="lookup">
            <form onSubmit={handleSubmit} className="lookup-form">
              <div className="form-inputs">
                {/* <label htmlFor="licenseNumber">License Plate Number</label> */}
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  onChange={(e) => {
                    setLP(e.target.value);
                  }}
                  value={lp}
                  placeholder="License Plate Number"
                />
                {/* <label htmlFor="ownerName">Owner Name</label> */}
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  placeholder="Owner Name"
                />
                {/* <label htmlFor="carModel">Car Model</label> */}
                <input
                  type="text"
                  id="carModel"
                  name="carModel"
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                  value={model}
                  placeholder="Car Model"
                />
                {/* <label htmlFor="color">Color</label> */}
                <input
                  type="text"
                  id="color"
                  name="color"
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                  value={color}
                  placeholder="Color"
                />
              </div>

              <button className="track-btn" type="submit">
                Track
              </button>
            </form>
          </div>
        </div>

        <div className="container flex">
          <div className="details">
            {/* {passProps ? (
              <CarDetails lp={lp} name={name} model={model} color={color} />
            ) : null} */}
            <CarDetails />
          </div>

          <div className="right-side">
            <Updates />
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </div>
  );
};
