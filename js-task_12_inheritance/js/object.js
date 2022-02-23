let transportTypes = ["Auto", "Moto"];
let petrolTypes = ["Petrol", "Diesel", "Electricity"];
let consumptionTypes = ["City", "Outside", "Mixed"];
let dataArray = [];
let transportType = null;
let petrolType = null;
let tank = null;
let consumptionType = null;

const Transport = function (transportType, engine, tank, area, carSeats = 4) {
 this.transportType = transportType;
 this.engine = engine;
 this.carSeats = carSeats;
 this.passenger = 0;
 this.area = area;

 this.tank = tank;
 this.consumption = 0;

 this.start = false;
 this.stop = true;

 this.setStartEngine = function (start) {
  this.start = start;
  this.stop = !start;
 }

 this.setStopEngine = function (stop) {
  this.start = !stop;
  this.stop = stop;
 }

 this.addPassenger = function (number = 0) {
  if (carSeats && number) {
   let maxPassenger = carSeats - 1 - this.passenger;
   for (let i = 0; i <= number; i++) {
    if (maxPassenger - i > 0) {
     this.passenger++;
    }
   }
  }
 }

 this.removePassenger = function (number = 0) {
  if (this.passenger && number) {
   for (let i = 0; i <= number; i++) {
    if (this.passenger - i >= 0) {
     this.passenger--;
    }
   }
  }
 }

 this.fuelConsumption = function (cycle) {
  this.result = 0;
  if (this.consumption[cycle] > 0) {
   this.result = Math.round((this.tank / this.consumption[cycle]) * 100);
  }
 }

 this.getEngineConsumption = function () {
  switch (this.engine) {
   case 'diesel':
    this.consumption = {city: 6.1, outside: 4.2, mixed: 4.9};
    break;
   case 'petrol':
    this.consumption = {city: 9.5, outside: 5.7, mixed: 8.0};
    break;
   case 'electricity':
   default:
    this.consumption = {city: 0, outside: 0, mixed: 0};
    break;
  }
 }

 this.get = function () {
  this.getEngineConsumption();
  this.fuelConsumption(this.area);
 }

 this.message = function () {

  return `Transport is: ${this.transportType}
  Engine is ${this.engine}
  City consumption: ${this.consumption.city}
  Outside consumption: ${this.consumption.outside}
  Mixed consumption: ${this.consumption.mixed};
  Mileage on the tank is ${this.result}`;
 }
}

const Moto = function () {
 Transport.apply(this, arguments);
 this.getEngineConsumption = function () {
  switch (this.engine) {
   case 'petrol':
    this.consumption = {city: 5, outside: 7, mixed: 8};
    break;
   case 'diesel':
   case 'electricity':
   default:
    this.consumption = {city: 0, outside: 0, mixed: 0};
    break;
  }
 }
}

const Factory = function () {
 this.create = function (transportType, petrolType, tank, consumptionType) {
  let obj;
  if (transportType === 'Auto') {
   obj = new Transport(transportType, petrolType, tank, consumptionType);
  } else if (transportType === 'Moto') {
   obj = new Moto(transportType, petrolType, tank, consumptionType);
  }
  obj.get();

  return obj;
 }
}

let TransportUI = function () {
 Transport.apply(this);

 this.init = function () {
  let div = createField('div', new Map([
   ['class', 'container']
  ]));

  let form = createField('form', new Map([
   ['id', 'form']]));

  let transportType = createField('select', new Map([
   ['name', 'transportType'],
   ['id', 'transportType']
  ]));

  let transportTypeOptions = selectData(transportTypes);
  transportTypeOptions.map(option => {
   transportType.append(option);
  })

  let petrolType = createField('select', new Map([
   ['name', 'petrolType']
  ]));

  let petrolTypeOptions = selectData(petrolTypes);
  petrolTypeOptions.map(option => {
   petrolType.append(option);
  })

  let tank = createField('input', new Map([
   ['name', 'tank'],
   ['id', 'tank'],
   ['type', 'text'],
   ['placeholder', 'Enter tank volume']
  ]));
  tank.required = true;

  let consumptionType = createField('select', new Map([
   ['name', 'petrolType']
  ]));

  let consumptionTypeOptions = selectData(consumptionTypes);
  consumptionTypeOptions.map(option => {
   consumptionType.append(option);
  })

  let formButton = createField('input', new Map([
   ['type', 'submit'],
   ['class', 'button']
  ]));
  formButton.value = 'Calculate petrol';

  form.append(transportType, petrolType, tank, consumptionType, formButton);
  document.body.appendChild(div).appendChild(form);

  form.addEventListener('submit', (event) => {
   showConsumption(event, form);
  })

  document.getElementById("transportType").addEventListener('click', (event) => {
   checkTank(event);
  })
 }
}

function createField(formElem, elemAttrs) {
 let exceptTags = ['div', 'option'];
 let field = document.createElement(formElem);

 if (!exceptTags.includes(formElem)) {
  field.setAttribute('class', formElem);
 }

 if (elemAttrs.size > 0) {
  elemAttrs.forEach((item, key) => {
   field.setAttribute(key, item);
  })
 }

 return field;
}

function selectData(data) {
 return data.map(item => {
  let option = createField('option', new Map([
   ['value', item],
  ]));
  option.innerText = item;

  return option;
 })
}

function checkTank(event) {
 let tankInput = document.getElementById("tank");
 if (event.target.value === "Moto") {
  tankInput.disabled = true;
  tankInput.value = 11;
 } else {
  tankInput.disabled = false;
  tankInput.value = '';
 }
}

function showConsumption(event, data) {
 event.preventDefault();

 let formFields = [...data.children];
 formFields.map((elem, index) => {
  if (elem.type !== 'submit') {
   dataArray[index] = elem.value;
  }
 });
 [transportType, petrolType, tank, consumptionType] = dataArray;

 let obj = new Factory();
 let newObj = obj.create(transportType, petrolType.toLowerCase(), tank, consumptionType.toLowerCase())
 let message = newObj.message();

 if (document.getElementById('message')) {
  document.getElementById('message').innerText = message;
 } else {
  let showMessage = createField('div', new Map([
   ['id', 'message']
  ]));
  showMessage.innerText = message;

  document.getElementById('form').appendChild(showMessage);
 }

}

new TransportUI().init();
