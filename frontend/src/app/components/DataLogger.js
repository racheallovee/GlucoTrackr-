import React, { useState } from "react";
import { logHealthData } from "../services/api";

const DataLogger = () => {
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [medication, setMedication] = useState("");
  const [meals, setMeals] = useState("");
  const [exercise, setExercise] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await logHealthData({
      glucoseLevel,
      medication,
      meals,
      exercise,
      sleep,
    });
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Glucose Level"
        value={glucoseLevel}
        onChange={(e) => setGlucoseLevel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Medication"
        value={medication}
        onChange={(e) => setMedication(e.target.value)}
      />
      <input
        type="text"
        placeholder="Meals"
        value={meals}
        onChange={(e) => setMeals(e.target.value)}
      />
      <input
        type="text"
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      <button type="submit">Log Data</button>
    </form>
  );
};

export default DataLogger;
