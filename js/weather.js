/* ===========================
   WEATHER MAP - LOCATION PICKER
   =========================== */

// Weather code mapping
const WEATHER_CODES = {
  0: { icon: "☀️", desc: "Nắng" },
  1: { icon: "🌤️", desc: "Hầu như nắng" },
  2: { icon: "⛅", desc: "Có mây từng phần" },
  3: { icon: "☁️", desc: "Mây" },
  45: { icon: "🌫️", desc: "Sương mù" },
  48: { icon: "🌫️", desc: "Sương muối" },
  51: { icon: "🌦️", desc: "Mưa nhẹ" },
  53: { icon: "🌦️", desc: "Mưa vừa" },
  55: { icon: "🌧️", desc: "Mưa nặng" },
  61: { icon: "🌧️", desc: "Mưa" },
  63: { icon: "🌧️", desc: "Mưa to" },
  65: { icon: "⛈️", desc: "Mưa rất to" },
  71: { icon: "❄️", desc: "Tuyết" },
  73: { icon: "❄️", desc: "Tuyết vừa" },
  75: { icon: "❄️", desc: "Tuyết to" },
  77: { icon: "❄️", desc: "Tuyết hạt" },
  80: { icon: "🌧️", desc: "Mưa rào" },
  81: { icon: "⛈️", desc: "Mưa rào to" },
  82: { icon: "⛈️", desc: "Mưa rào rất to" },
  85: { icon: "❄️", desc: "Tuyết rào" },
  86: { icon: "❄️", desc: "Tuyết rào to" },
  95: { icon: "⛈️", desc: "Giông bão" },
  96: { icon: "⛈️", desc: "Giông bão mưa đá" },
  99: { icon: "⛈️", desc: "Giông bão mưa đá to" },
};

// Cities data for quick search
const VIETNAM_CITIES = [
  { name: "Hà Nội", lat: 21.0285, lon: 105.8542 },
  { name: "Hồ Chí Minh", lat: 10.8231, lon: 106.6297 },
  { name: "Đà Nẵng", lat: 16.0544, lon: 108.2022 },
  { name: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
  { name: "Nha Trang", lat: 12.2388, lon: 109.1967 },
  { name: "Huế", lat: 16.4637, lon: 107.5909 },
  { name: "Hải Phòng", lat: 20.8449, lon: 106.6881 },
  { name: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
  { name: "Đà Lạt", lat: 11.9404, lon: 108.4453 },
  { name: "Vũng Tàu", lat: 10.3464, lon: 107.0639 },
];

// State
let map = null;
let marker = null;
let currentLocation = null;
let weatherData = null;
let currentUnit = "C";

// Initialize map on page load
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  setupSearch();
});

// Initialize Leaflet map
function initMap() {
  // Create map centered on Vietnam
  map = L.map("map").setView([15, 107], 6);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    maxZoom: 19,
    className: "leaflet-tile",
  }).addTo(map);

  // Custom icon for marker
  const customIcon = L.icon({
    iconUrl:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23007aff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Click on map to select location
  map.on("click", (e) => {
    selectLocation(e.latlng.lat, e.latlng.lng);
  });

  // Load weather for Ho Chi Minh by default
  selectLocation(10.8231, 106.6297);
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    const filtered = VIETNAM_CITIES.filter((city) =>
      city.name.toLowerCase().includes(query),
    );

    if (filtered.length === 0) {
      searchResults.style.display = "none";
      return;
    }

    searchResults.innerHTML = filtered
      .map(
        (city) =>
          `<div class="search-result-item" onclick="selectLocationFromSearch(${city.lat}, ${city.lon}, '${city.name}')">
        <i class="fas fa-location-dot"></i>
        ${city.name}
      </div>`,
      )
      .join("");

    searchResults.style.display = "block";
  });

  // Close search results on escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchResults.style.display = "none";
    }
  });

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });
}

// Select location from search
function selectLocationFromSearch(lat, lon, name) {
  selectLocation(lat, lon, name);
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResults").style.display = "none";
}

// Select location and fetch weather
async function selectLocation(lat, lon, name = null) {
  currentLocation = { lat, lon, name };

  // Update map
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lon], {
    icon: L.icon({
      iconUrl:
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23007aff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
  }).addTo(map);

  map.setView([lat, lon], 10);

  // Reverse geocoding to get address name (using Nominatim)
  if (!name) {
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      );
      const geoData = await geoRes.json();
      name =
        geoData.address.city ||
        geoData.address.town ||
        geoData.address.village ||
        `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    } catch (err) {
      console.error("Geocoding error:", err);
      name = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }
  }

  // Update location info
  document.getElementById("selectedAddress").textContent = name;
  document.getElementById("selectedCoords").textContent =
    `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  document.getElementById("locationInfo").style.display = "block";

  // Fetch weather
  fetchWeather(lat, lon, name);
}

// Fetch weather data
async function fetchWeather(lat, lon, name) {
  const loading = document.getElementById("weatherLoading");
  const content = document.getElementById("weatherContent");
  const emptyState = document.getElementById("emptyState");
  const error = document.getElementById("weatherError");

  loading.style.display = "flex";
  content.style.display = "none";
  emptyState.style.display = "none";
  error.style.display = "none";

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    weatherData = {
      location: { lat, lon, name },
      current: {
        temp: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
      },
      hourly: {
        times: data.hourly.time,
        temps: data.hourly.temperature_2m,
        codes: data.hourly.weather_code,
        precipitation: data.hourly.precipitation_probability,
      },
      daily: {
        times: data.daily.time,
        maxTemps: data.daily.temperature_2m_max,
        minTemps: data.daily.temperature_2m_min,
        codes: data.daily.weather_code,
        precipitation: data.daily.precipitation_sum,
      },
    };

    renderWeather();
    loading.style.display = "none";
    content.style.display = "flex";
  } catch (err) {
    console.error("Weather fetch error:", err);
    loading.style.display = "none";
    content.style.display = "flex";
    error.style.display = "flex";
    document.getElementById("errorMessage").textContent =
      "Không thể tải dữ liệu thời tiết. Vui lòng thử lại.";
  }
}

// Get weather icon and description
function getWeatherIcon(code) {
  return WEATHER_CODES[code] || { icon: "❓", desc: "Không rõ" };
}

// Convert temperature
function convertTemp(celsius) {
  if (currentUnit === "F") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

// Format temperature
function formatTemp(celsius) {
  return `${convertTemp(celsius)}°${currentUnit}`;
}

// Render weather widget
function renderWeather() {
  if (!weatherData) return;

  const current = weatherData.current;
  const currentWeather = getWeatherIcon(current.weatherCode);
  const today = new Date();
  const todayStr = today.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  });

  // Update header
  document.getElementById("weatherLocation").textContent =
    weatherData.location.name;
  document.getElementById("currentTemp").textContent = formatTemp(current.temp);
  document.getElementById("conditionIcon").textContent = currentWeather.icon;
  document.getElementById("conditionText").textContent = currentWeather.desc;
  document.getElementById("highTemp").textContent = convertTemp(
    Math.max(...weatherData.daily.maxTemps.slice(0, 1)),
  );
  document.getElementById("lowTemp").textContent = convertTemp(
    Math.min(...weatherData.daily.minTemps.slice(0, 1)),
  );
  document.getElementById("updateTime").textContent = todayStr;

  // Update details
  document.getElementById("humidity").textContent = `${current.humidity}%`;
  document.getElementById("windSpeed").textContent =
    `${Math.round(current.windSpeed)} km/h`;
  document.getElementById("precipitation").textContent =
    `${current.precipitation.toFixed(1)} mm`;

  // Render hourly
  renderHourly();

  // Render daily
  renderDaily();
}

// Render hourly forecast
function renderHourly() {
  const container = document.getElementById("hourlyContainer");
  container.innerHTML = weatherData.hourly.times
    .slice(0, 12)
    .map((time, idx) => {
      const hour = new Date(time);
      const hourStr = hour.getHours().toString().padStart(2, "0") + ":00";
      const weather = getWeatherIcon(weatherData.hourly.codes[idx]);
      const rainProb = weatherData.hourly.precipitation[idx];

      return `
        <div class="hourly-item">
          <div class="hourly-time">${hourStr}</div>
          <div class="hourly-icon">${weather.icon}</div>
          <div class="hourly-temp">${formatTemp(weatherData.hourly.temps[idx])}</div>
          ${rainProb > 0 ? `<div class="hourly-rain">${rainProb}%</div>` : ""}
        </div>
      `;
    })
    .join("");
}

// Render daily forecast
function renderDaily() {
  const container = document.getElementById("dailyContainer");

  const minTempAll = Math.min(...weatherData.daily.minTemps);
  const maxTempAll = Math.max(...weatherData.daily.maxTemps);
  const tempRangeAll = convertTemp(maxTempAll) - convertTemp(minTempAll);

  container.innerHTML = weatherData.daily.times
    .slice(0, 7)
    .map((time, idx) => {
      const date = new Date(time);
      const dayStr = date.toLocaleDateString("vi-VN", { weekday: "short" });
      const dateStr = date.getDate() + "/" + (date.getMonth() + 1);
      const weather = getWeatherIcon(weatherData.daily.codes[idx]);
      const minTemp = convertTemp(weatherData.daily.minTemps[idx]);
      const maxTemp = convertTemp(weatherData.daily.maxTemps[idx]);
      const tempRange = maxTemp - minTemp;
      const fillPercent =
        ((convertTemp(weatherData.daily.minTemps[idx]) -
          convertTemp(minTempAll)) /
          tempRangeAll) *
        100;

      return `
        <div class="daily-item">
          <div class="daily-day">${dayStr}<small>${dateStr}</small></div>
          <div class="daily-icon">${weather.icon}</div>
          <div class="daily-condition">${weather.desc}</div>
          <div class="temp-bar">
            <div class="temp-bar-fill" style="width: ${Math.max(tempRange * 2, 10)}%; margin-left: ${fillPercent}%"></div>
          </div>
          <div class="daily-low-high">
            <span class="daily-low">${minTemp}°</span>
            <span class="daily-high">${maxTemp}°</span>
          </div>
        </div>
      `;
    })
    .join("");
}

// Set temperature unit
function setUnit(unit, event) {
  currentUnit = unit;

  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");

  if (weatherData) {
    renderWeather();
  }
}

// Refresh weather
function refreshWeather() {
  if (currentLocation) {
    fetchWeather(
      currentLocation.lat,
      currentLocation.lon,
      currentLocation.name,
    );
  }
}
