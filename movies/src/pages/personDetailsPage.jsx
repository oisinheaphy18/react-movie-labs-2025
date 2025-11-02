// src/pages/personDetailsPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// Part 1: Extend the App - we use new API calls for person info
import {
  getPersonDetails,
  getPersonMovieCredits,
} from "../api/tmdb-api";

const PersonDetailsPage = () => {
  const { id } = useParams(); // actor id
  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [errorText, setErrorText] = useState("");

  // Part 1: Extend the App - load basic actor info
  useEffect(() => {
    getPersonDetails(id)
      .then((data) => {
        setPerson(data);
      })
      .catch((err) => {
        setErrorText(err.message);
      });
  }, [id]);

  // Part 1: Extend the App - load movies this actor is in
  useEffect(() => {
    getPersonMovieCredits(id)
      .then((data) => {
        // data.cast is an array of movies they've acted in
        if (data && data.cast) {
          setCredits(data.cast);
        }
      })
      .catch((err) => {
        setErrorText(err.message);
      });
  }, [id]);

  if (errorText !== "") {
    return <h1>{errorText}</h1>;
  }

  if (!person) {
    return <h1>Loading...</h1>;
  }

  // Build profile image URL if we have one
  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : "";

  return (
    <div style={{ padding: "1rem" }}>
      {/* Part 1: Extend the App - actor basic info */}
      <h2>{person.name}</h2>
      {profileUrl !== "" && (
        <img
          src={profileUrl}
          alt={person.name}
          style={{ borderRadius: "8px", marginBottom: "1rem" }}
        />
      )}
      <p>{person.biography ? person.biography : "No biography available."}</p>

      <h3>Known For</h3>
      <ul>
        {/* Part 1: Extend the App - link back to each movie */}
        {credits.map((m) => (
          <li key={m.credit_id}>
            <Link to={`/movies/${m.id}`}>{m.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonDetailsPage;
