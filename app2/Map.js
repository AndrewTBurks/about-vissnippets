// function drawSnippet (data, next) {
// write your code here:
let { elem, width, height } = SAGE2.SnippetVisElement({ type: "div" });

this.locals = this.locals || {};

if (!this.locals.map) {
  let sf = [37.773972, -122.431297];

  this.locals.map = L.map(elem).setView(sf, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(this.locals.map);

  this.locals.pins = [];
}

elem.style.width = width + "px";
elem.style.height = height + "px";
this.locals.map.invalidateSize();

for (let pin of this.locals.pins) {
  this.locals.map.removeLayer(pin);
}

this.locals.pins = [];

if (data.vehicle) {
  this.locals.pins = data.vehicle.map((d) =>
    L.marker([d.lat, d.lon]).addTo(this.locals.map)
  );

  let bounds = L.latLngBounds(data.vehicle.map((d) => [d.lat, d.lon]));

  this.locals.map.fitBounds(bounds);
}

// optional initial output value for linking operations
next([]);
//}
