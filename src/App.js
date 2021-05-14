import "./App.css";
import { useState } from "react";
// import { no } from "./components/no";

const api = {
  key: "634df7e043265b4a12a9d97ad94070d5",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  let date = String(new window.Date());

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          // console.log(result);
        });
    }
  };
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <>
            <div
              className={
                typeof weather.main != "undefined"
                  ? weather.main.temp > 20
                    ? "weather-card one"
                    : "weather-card cold one"
                  : "weather-card cold one"
              }
            >
              <div className="top">
                <div className="wrapper"></div>
                <div className="heading ml-2">
                  <h3>
                    {weather.name},{weather.sys.country}
                  </h3>
                </div>
                <div className="location-box ml-2">
                  {(date = date.slice(3, 15))}
                </div>
                <div className="weather-box ml-2">
                  <div className="temp">{Math.round(weather.main.temp)}°C</div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="weather-card err">
              <div className="top">
                <div className="wrapper"></div>
                <div className="heading ml-2">Search for a City</div>
                <div className="location-box ml-2">Enter your</div>
                <div className="location-box ml-2">
                  city name in the search bar above
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
