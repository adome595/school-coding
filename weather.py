import sys
import requests
def fmt_temp(value):
    try:
        num = float(value)
    except (TypeError, ValueError):
        return "?"
    if num != num or num in (float("inf"), float("-inf")):  # NaN / infinity
        return "?"
    return f"{num:.1f}"
city = input("Enter your city: ").strip() or "Kathmandu"
geo_url = "https://geocoding-api.open-meteo.com/v1/search"

params = {
    "name": city,
    "count": 1,
    "language": "en",
    "format": "json"}
r = requests.get(geo_url, params=params, timeout=5)
data = dict(r.json())
if "results" not in data or not data.get("results"):
    print("City not found.")
    sys.exit()

print("Raw geocoding JSON:", data)

top = data["results"][0]
lat = top["latitude"]
lon = top["longitude"]
print("Coords:", lat, lon)

wx_url = "https://api.open-meteo.com/v1/forecast"
wx_params = {
    "latitude": lat,
    "longitude": lon,
    "current_weather": True,
    "timezone": "auto"
}
t = requests.get(wx_url, wx_params, timeout=5)
wx = t.json()
cw = wx.get("current_weather", {})
temp_now = cw.get("temperature")
summary_line = f"{city}: {fmt_temp(temp_now)}°C"
print(summary_line)