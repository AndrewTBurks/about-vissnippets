// function dataSnippet (data, next) {
// write your code here:
// 	let newData = data;
let newData = {};

newData.area = _.uniq(data.map((o) => o["community_area"]));
newData.zipcodes = _.uniq(data.map((o) => o["zip_code"]));
newData.property_types = _.uniq(data.map((o) => o["primary_property_type"]));
newData.years = _.uniq(data.map((o) => o["year_built"]));

newData.elec_usage_min = d3.min(data.map((o) => +o["electricity_use_kbtu"]));
newData.elec_usage_max = d3.max(data.map((o) => +o["electricity_use_kbtu"]));
newData.gas_usage_min = d3.min(data.map((o) => +o["natural_gas_use_kbtu"]));
newData.gas_usage_max = d3.max(data.map((o) => +o["natural_gas_use_kbtu"]));

next(newData);
//}
