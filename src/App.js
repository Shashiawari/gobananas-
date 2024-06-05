import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("delhi");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function handleChange(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=b3ea819475b11c150c7ea476495d359b&units=metric`
      );
      const result = await response.json();
      if (response.ok) {
        setData(result);
        setError(null); // Clear any previous errors
      } else {
        setError(result.message);
        setData(null); // Clear previous data
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
      setData(null); // Clear previous data
    }
  }

  return (
    <div className="App p-5">
      <h1 className="nav-brand">WEATHER IT</h1>
      <div className="text-center out">
        <form onSubmit={handleChange}>
          <label htmlFor="name">City</label>
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            id="name"
            placeholder="Enter A City Name"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
      {data && (
        <div className="main ">
          <div className="row d-flex justify-content-center align-items-center   " >
            <div className="col-12 col-md-6  col-lg-6">
              <div className="cent row">
                <h2>{data.name}</h2>
                <div className="col-6">
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    className="img-fluid"
                  />
                </div>
                <div className="col-6">
                  <h3>{data.main.temp.toFixed(2)} &#8451;</h3>
                  <h4>{data.weather[0].description}</h4>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="h mx-5">
                <h3>
                  <img
                    src="https://icons.veryicon.com/png/Object/Service%20Categories/Humidity.png"
                    className="mx-2"
                    height={"50px"}
                    alt="Humidity Icon"
                  />
                  {data.main.humidity}%
                </h3>
              </div>
              <div className="h mx-5">
                <h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="46"
                    fill="blue"
                    className="bi bi-wind"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                  </svg>
                  {data.wind.speed}m/s
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
