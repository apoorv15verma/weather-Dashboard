import React, { useState} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  return (
    <div className="container mt-5 text-white">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={handleKeyPress}
              className="form-control"
              placeholder="Enter Location"
              type="text"
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={searchLocation}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {data.name ? (
        <div className="row justify-content-center text-white">
          <div className="col-md-6">
            <div className="card blue-color">
              <div className="card-body">
                <h5 className="card-title text-white">{data.name}</h5>
                <p className="card-text text-white">
                  {data.weather ? data.weather[0].main : null}
                </p>
                <h1 className="text-white">
                  {data.main ? data.main.temp.toFixed() : null}°F
                </h1>
              </div>
              <ul className="list-group list-group-flush ">
                <li className="list-group-item blue-color text-white">
                  Feels Like:{" "}
                  {data.main ? data.main.feels_like.toFixed() : null}°F
                </li>
                <li className="list-group-item blue-color text-white">
                  Humidity: {data.main ? data.main.humidity : null}%
                </li>
                <li className="list-group-item blue-color text-white">
                  Wind Speed: {data.wind ? data.wind.speed.toFixed() : null} MPH
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="row justify-content-center text-white">
            <div className="col-md-6">
              <div className="card blue-color">
                <div className="card-body">
                  <h1 className="text-white">Please enter your location</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
