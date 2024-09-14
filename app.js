const express = require("express");
const sql = require("sql");
const app = express();
var format = require("pg-format");
const { currentCity, weather } = require("./module /data_module");
const pool = require("./configure/database");
const Router = require("./Router");

app.use(express.json());
app.use("/", Router);

app.listen(8080, function () {
  console.log("server successfully started");
});

app.post("/inserts", (req, res) => {
  let accumulator = [];
  var data = {};
  weather().forEach((element) => {
    data.city_name = element.city.country;
    data.name = element.city.name;
    data.lat = element.city.coord.lat;
    data.long = element.city.coord.lon;
    data.temp = element.main.temp;
    data.pressure = element.main.pressure;
    let dat = new Date(element.time);
    data.datetime = dat.toISOString();
    accumulator.push(data);
  });
  var count = 0;
  currentCity().forEach((element) => {
    if (element.stations) {
      INSERT[count].stations = element.stations;
    }
    count += 1;
  });
  let inserts = sql.define({
    name: "city",
    columns: [
      "city_name",
      "name",
      "lat",
      "long",
      "temp",
      "pressure",
      "datetime",
      "stations",
    ],
  });

  // const qrry = format(
  //   "INSERT INTO public.city(city_name,name,lat,long,temp,pressure,datetime,stations) VALUES %L",
  //   accumulator
  // );
  const qurrey = inserts.INSERT(accumulator).returning(city.ID).toQuery();

  // let insertquarry = [
  //   [data.cityname, data.name, data.lat, data.long, accumulator[count].station],
  // ];

  pool.query(qrry, [], (err, result) => {
    if (err) {
      console.log(err.message);
    }
  });
  pool.end;
  res.send("data inserted");
});
