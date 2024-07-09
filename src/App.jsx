import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  background: #eecda3;
  background: -webkit-linear-gradient(
    to right,
    #ef629f,
    #eecda3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ef629f,
    #eecda3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  h1 {
    color: #232323;
    letter-spacing: 0.06rem;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ClearButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: red;
  border: none;
  border-radius: 4rem;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: #232323;
  text-transform: capitalize;
  margin-top: 20px;
  font-weight: 500;
`;

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  filter: blur(10px);
`;

const API_KEY = "a6293e6b812017b8d9f070ca57709147";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [backgroundVideo, setBackgroundVideo] = useState("");

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("weatherHistory"));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  const fetchWeather = async (city) => {
    try {
      setError("");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      updateHistory(response.data);
      updateBackgroundVideo(response.data.weather[0].main);
    } catch (error) {
      setError("City not found. Please enter a valid city name.");
    }
  };

  const updateHistory = (newWeather) => {
    const updatedHistory = [...history, newWeather];
    setHistory(updatedHistory);
    localStorage.setItem("weatherHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("weatherHistory");
  };

  const updateBackgroundVideo = (weatherCondition) => {
    console.log("Weather condition:", weatherCondition);
    switch (weatherCondition.toLowerCase()) {
      case "rain":
        setBackgroundVideo("/videos/rain.mp4");
        break;
      case "clouds":
        setBackgroundVideo("/videos/cloud.mp4");
        break;
      case "clear":
        setBackgroundVideo("/videos/sunny.mp4");
        break;
      case "mist":
        setBackgroundVideo("/videos/cloud.mp4");
        break;
      case "haze":
        setBackgroundVideo("/videos/cloud.mp4");
        break;
      case "drizzle":
        setBackgroundVideo("/videos/rain.mp4");
        break;
      default:
        setBackgroundVideo("");
        break;
    }
  };

  useEffect(() => {
    if (backgroundVideo) {
      document.getElementById("background-video").load();
    }
  }, [backgroundVideo]);

  return (
    <Container>
      {backgroundVideo && (
        <BackgroundVideo id="background-video" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </BackgroundVideo>
      )}
      <h1>Weather Forecast</h1>
      <SearchBar onSearch={fetchWeather} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {weather && <WeatherCard weather={weather} />}
      <h2>Search History</h2>
      <CardsContainer>
        {history.map((item, index) => (
          <WeatherCard key={index} weather={item} />
        ))}
      </CardsContainer>
      {history.length > 0 && (
        <ClearButton onClick={clearHistory}>Clear History</ClearButton>
      )}
    </Container>
  );
};

export default App;
