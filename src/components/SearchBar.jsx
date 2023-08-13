import React, { useState } from "react";
import "./SearchBar.css";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [skinUrl, setSkinUrl] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async (value) => {
    if (value) {
      try {
        const response = await fetch(`https://minotar.net/body/${value}/200.png`);
        if (response.ok) {
          setSkinUrl(response.url);
          setUsername(value);
          setErrorMessage("");
        } else {
          setSkinUrl("");
          setUsername("");
          setErrorMessage("Invalid Username");
        }
      } catch (error) {
        setSkinUrl("");
        setUsername("");
        setErrorMessage("Invalid Username");
      }
    }
  };

  const handleChange = (value) => {
    setInput(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(input);
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          placeholder="Minecraft Username"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button type="submit">
          <img
            src="https://cdn.discordapp.com/attachments/1112861535858073712/1140264877886292078/search.png"
            alt="Search"
          />
        </button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {skinUrl && (
        <div className="skin-card">
          <img src={skinUrl} alt="Minecraft Skin" />
          <p className="username">{username}</p>
        </div>
      )}
    </div>
  );
};

