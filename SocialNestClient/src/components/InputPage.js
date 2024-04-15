import React, { useState } from "react";
import "./InputPage.css";
import logo from "../img/logo.png";

function Input(props) {
  const [person1FirstName, setPerson1FirstName] = useState("");
  const [person1LastName, setPerson1LastName] = useState("");
  const [person2FirstName, setPerson2FirstName] = useState("");
  const [person2LastName, setPerson2LastName] = useState("");

  const submitEvent = (event) => {
    event.preventDefault(); // Prevent the default form submit behavior

    const data = {
      person1FirstName,
      person1LastName,
      person2FirstName,
      person2LastName,
    };

    fetch("/addRelationship", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        alert("Relationship added successfully!");
        props.onSubmitClick();
        // Reset the form or redirect the user
      })
      .catch((error) => {
        console.error("Failed to add relationship:", error);
        alert("An error occurred while adding the relationship.");
      });
  };

  return (
    <div>
      <div className="App">
        <img src={logo} className="input-logo" alt="logo" />
      </div>

      <form className="input-container" onSubmit={submitEvent}>
        <div>
          <label htmlFor="person1FirstName">Your First Name</label>
          <input
            type="text"
            id="person1FirstName"
            name="person1FirstName"
            value={person1FirstName}
            onChange={(e) => setPerson1FirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="person1LastName">Your Last Name</label>
          <input
            type="text"
            id="person1LastName"
            name="person1LastName"
            value={person1LastName}
            onChange={(e) => setPerson1LastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="person2FirstName">Friend's First Name</label>
          <input
            type="text"
            id="person2FirstName"
            name="person2FirstName"
            value={person2FirstName}
            onChange={(e) => setPerson2FirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="person2LastName">Friend's Last Name</label>
          <input
            type="text"
            id="person2LastName"
            name="person2LastName"
            value={person2LastName}
            onChange={(e) => setPerson2LastName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="input-button">
          Add Relationship
        </button>
        <button className="skip-button" onClick={props.onSubmitClick}>
          Skip
        </button>
      </form>
    </div>
  );
}

export default Input;
