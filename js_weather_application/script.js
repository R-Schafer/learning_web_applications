import { parse } from "https://cdn.jsdelivr.net/npm/date-fns@v2.28.0/+esm";
import { zonedTimeToUtc } from "https://cdn.jsdelivr.net/npm/date-fns-tz@1.3.3/+esm";
import { FetchWrapper } from "./fetch-wrapper.js";

const form = document.querySelector("#weather-location");
const input = document.querySelector("#input-location");
const main = document.querySelector("main");

// redirect through netlify with /weather rather than API key
const weatherAPI = new FetchWrapper("/weather");

// building the HTML as a string
const App = (data) => {
  return `
    <!-- first section -->
    ${CurrentWeatherSection(data)}
    
    <!-- second section -->
    ${AverageWeatherSection(data)}

    <!-- third section -->
    ${HourlyWeatherSection(data)}
    
    <!-- fourth section -->
    ${DailyWeatherSection(data)}
  `;
};

// spinner
const Spinner = () => {
  return `
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  `;
};

// error screen
const ErrorMessage = (message) => {
  return `
    <div class="error-container">
      <div class="error">${message}</div>
    </div>
  `;
};

// parsing the date for Safari
const parseDate = (date) => {
  return parse(date, "yyyy-MM-dd HH:mm", new Date());
};

// for the first section
const CurrentWeatherSection = (data) => {
  const currentHour = findCurrentHour(data);
  return `
    <div id="first-section-of-page">
      <div class="container">
        <div class="current-banner">
          <div class="current-location">${data.location.name}, ${
    data.location.region
  }</div>
          <div class="current-time">${parseDate(data.location.localtime)
            .toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            })
            .replace(" ", "")}</div>
        </div>
        <div class="current-content">
          <div class="current-img-and-temp-container">
            <div class="current-img">
              <img
                src="${data.current.condition.icon}"
                width="75"
                height="75"
              />
              <div class="current-sun">
                <span>${data.current.condition.text}</span>
              </div>
            </div>
            <div class="current-temp-container">
              <div class="current-temp">
                <span id="current-temp">${Math.round(
                  data.current.temp_f
                )}°</span>
              </div>
            </div>
          </div>

          <div class="current-conditions-container">
            <div class="current-conditions">
              <div class="conditions-section1">
                <div class="current-feelslike">
                  <span class="feelslike">Feels Like: ${Math.round(
                    data.current.feelslike_f
                  )}°</span>
                </div>
                <div class="current-wind">
                  <span class="condition">Wind: ${Math.round(
                    data.current.wind_mph
                  )} MpH</span>
                </div>
              </div>
              <div class="conditions-section2">
                <div class="current-humidity">
                  <span class="condition">Humid: ${
                    data.current.humidity
                  }%</span>
                </div>
                <div class="current-precip">
                  <span class="condition">Precip: ${
                    currentHour.chance_of_rain
                  }%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  `;
};

// for the first section
const findCurrentHour = (data) => {
  const localTime = parseDate(data.location.localtime);

  for (let i = 0; i < data.forecast.forecastday[0].hour.length; i++) {
    const hour = data.forecast.forecastday[0].hour[i];
    const hourTime = parseDate(hour.time);
    if (localTime.getHours() === hourTime.getHours()) {
      return hour;
    }
  }
};

// for the second section
const AverageWeatherSection = (data) => {
  return `
    <div id="second-section-of-page">
      <div class="container">
        <div class="average-content">
          ${AverageWeatherSlot("Morning", data.forecast.forecastday[0].hour[8])}
          ${AverageWeatherSlot(
            "Afternoon",
            data.forecast.forecastday[0].hour[13]
          )}
          ${AverageWeatherSlot(
            "Evening",
            data.forecast.forecastday[0].hour[19]
          )}
          ${AverageWeatherSlot(
            "Overnight",
            data.forecast.forecastday[1].hour[3]
          )}
        </div>
      </div>
    </div>
  `;
};

// for the second section
const AverageWeatherSlot = (timeOfDay, hour) => {
  return `
    <div class="average-section-container">
        <div class="time-of-day">
          <span>${timeOfDay}</span>
        </div>
        <div class="average-temp">
          <span>${Math.round(hour.temp_f)}°</span>
        </div>
        <div class="average-img">
          <img
            src="${hour.condition.icon}"
            width="60"
            height="60"
          />
        </div>
        <div class="average-precip">
        <svg viewBox="0 -2 5 10">
        <path
          d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"
        ></path>
      </svg>
          <span>${hour.chance_of_rain}%</span>
        </div>
      </div>
  `;
};

// for the third section
const HourlyWeatherSection = (data) => {
  const hours = findForecastHours(data);
  return `
    <div id="third-section-of-page">
      <div class="container">
        <div class="hourly-banner">
          <span>12 Hour Forecast</span>
        </div>
        <div class="hourly-content-container">
          ${hours.map((hour) => HourlyWeatherSlot(hour)).join("")}
        </div>
      </div>
    </div>
  `;
};

// for the third section
const HourlyWeatherSlot = (hour) => {
  return `
    <div class="hourly-content">
      <div class="hourly-section">
        <span class="hour">${parseDate(hour.time)
          .toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
          })
          .replace(" ", "")}</span>
      </div>
      <div class="hourly-temp-section">
        <span class="hour-temp">${Math.round(hour.temp_f)}°</span>
      </div>
      <div class="hourly-img">
        <img
          src="${hour.condition.icon}"
          width="50"
          height="50"
        />
      </div>
      <div class="hourly-precip">
        <span class="condition">
          <svg viewBox="0 -2 5 10">
            <path
              d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"
            ></path>
          </svg>
          ${hour.chance_of_rain}%
        </span>
      </div>
      <div class="hourly-wind">
        <span class="wind">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M32 192h320c52.94 0 96-43.06 96-96s-43.06-96-96-96h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c17.66 0 32 14.34 32 32s-14.34 32-32 32H32C14.31 128 0 142.3 0 160S14.31 192 32 192zM160 320H32c-17.69 0-32 14.31-32 32s14.31 32 32 32h128c17.66 0 32 14.34 32 32s-14.34 32-32 32H128c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S212.9 320 160 320zM416 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h384c17.66 0 32 14.34 32 32s-14.34 32-32 32h-32c-17.69 0-32 14.31-32 32s14.31 32 32 32h32c52.94 0 96-43.06 96-96S468.9 224 416 224z"
            />
          </svg>
          ${Math.round(hour.wind_mph)} MpH
        </span>
      </div>
    </div>
  `;
};

// for the third section
const findForecastHours = (data) => {
  const hourList = [];

  const currentTime = parseDate(data.location.localtime);
  currentTime.setMinutes(0);

  const endTime = parseDate(data.location.localtime);
  endTime.setHours(endTime.getHours() + 12);

  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < data.forecast.forecastday[j].hour.length; i++) {
      if (
        parseDate(data.forecast.forecastday[j].hour[i].time) >= currentTime &&
        parseDate(data.forecast.forecastday[j].hour[i].time) < endTime
      ) {
        hourList.push(data.forecast.forecastday[j].hour[i]);
      }
    }
  }
  return hourList;
};

// for the fourth section
const DailyWeatherSection = (data) => {
  return `
    <div id="fourth-section-of-page">
      <div class="container">
        <div class="daily-banner">
          <span>3 Day Forecast</span>
        </div>
        <div class="daily-content">
          ${DailyWeatherSlot(data, data.forecast.forecastday[0])}
          ${DailyWeatherSlot(data, data.forecast.forecastday[1])}
          ${DailyWeatherSlot(data, data.forecast.forecastday[2])}
        </div>
      </div>
    </div>
  `;
};

// for the fourth section
const DailyWeatherSlot = (data, forecastday) => {
  const date = zonedTimeToUtc(forecastday.date, data.location.tz_id);

  return `
    <div class="daily-section-container">
      <div class="date">
        <span>
          ${date.toLocaleDateString([], { weekday: "short" })} ${date.getDate()}
        </span>
      </div>
      <div class="high-temp">
        <span>${Math.round(forecastday.day.maxtemp_f)}°</span>
      </div>
      <div class="low-temp">
        <span>${Math.round(forecastday.day.mintemp_f)}°</span>
      </div>
      <div class="day-img">
        <img
          src="${forecastday.day.condition.icon}"
          width="50"
          height="50"
        />
      </div>
      <div class="day-precip">
        <svg viewBox="0 -2 5 10">
          <path
            d="M4.7329.0217c-.1848-.059-.3855.0064-.4803.148L.2731 5.1191c-.0814.0922-.1501.1961-.196.3108-.2469.6009.1185 1.2697.8156 1.4943.6914.226 1.447-.0712 1.7-.6585L4.9662.4987l.0111-.0282c.073-.1807-.036-.379-.2444-.4488z"
          ></path>
        </svg>
        ${forecastday.day.daily_chance_of_rain}%
      </div>
    </div>
  `;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  main.innerHTML = Spinner();

  // disable input so user can't type another location while loading
  input.disabled = true;

  weatherAPI
    .get(`/forecast.json?q=${input.value}&days=5`)
    .then((data) => {
      main.innerHTML = App(data);
    })
    .catch(() => {
      main.innerHTML = ErrorMessage(
        "Something went wrong, please enter a valid location."
      );
    })
    .finally(() => {
      // re-enabling the input section
      input.disabled = false;
    });
});

main.innerHTML = Spinner();

// default page load
weatherAPI
  .get(`/forecast.json?q=78723&days=5`)
  .then((data) => {
    main.innerHTML = App(data);
  })
  .catch(() => {
    main.innerHTML = ErrorMessage("Sorry, we are currently offline.");
  });
