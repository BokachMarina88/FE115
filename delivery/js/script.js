function delivery() {
 let fieldName = null;
 let fieldPhone = null;
 let fieldEmail = null;
 let fiedDeliveryMethod = null;
 let fieldDateCurrent = null;
 let fiedDistA = null;
 let fiedDistB = null;
 let fiedDateDeparture = null;
 let fiedDateDelivery = null;
 let arrayData = [];
 let distances = [
  {a: "Минск", b: "Брест", d: 340},
  {a: "Минск", b: "Витебск", d: 300},
  {a: "Минск", b: "Гомель", d: 350},
  {a: "Минск", b: "Могилев", d: 400}
 ];
 let methods = [
  {method: "Такси", price: 5},
  {method: "самолет", price: 10},
  {method: "пеший курьер", price: 15},
  {method: "частный водитель", price: 25}
 ];
 let deliveryMethods = ["самолет", "такси", "частный водитель", "пеший курьер"];
 let destinations = ["Минск", "Гомель", "Витебск", "Могилев", "Гродно", "Брест"];

 function showForm() {

  let div = createField('div', new Map([
   ['class', 'container']
  ]));

  let form = createField('form', new Map([
   ['id', 'delivery_form'],
   ['class', 'delivery_form']
  ]));

  let fio = createField('input', new Map([
   ['name', 'fio'],
   ['type', 'text'],
   ['placeholder', 'Enter your name']
  ]), true);

  let phone = createField('input', new Map([
   ['name', 'phone'],
   ['type', 'tel'],
   ['placeholder', 'Enter your phone']
  ]), true);

  let email = createField('input', new Map([
   ['name', 'email'],
   ['type', 'email'],
   ['placeholder', 'email@email.com']
  ]), true);

  let deliveryMethod = createField('select', new Map([
   ['name', 'deliveryMethod']
  ]));

  let deliveryMethodOptions = selectData(deliveryMethods);
  deliveryMethodOptions.map(option => {
   deliveryMethod.append(option);
  })

  let currentDate = new Date();
  let date = createField('input', new Map([
   ['name', 'currentDate'],
   ['type', 'datetime'],
   ['class', 'date']
  ]));
  date.disabled = true;
  date.value = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

  let departure = createField('select', new Map([
   ['name', 'departure']
  ]), true);

  let departureOptions = selectData(destinations);
  departureOptions.map(option => {
   departure.append(option);
  });

  let destination = createField('select', new Map([
   ['name', 'destination']
  ]), true);

  let destinationOptions = selectData(destinations);
  destinationOptions.map(option => {
   destination.append(option);
  });

  let departureDate = createField('input', new Map([
   ['name', 'departureDate'],
   ['type', 'date'],
   ['class', 'date']
  ]), true);

  let destinationDate = createField('input', new Map([
   ['name', 'destinationDate'],
   ['type', 'date'],
   ['class', 'date']
  ]), true);

  let calculate = createField('input', new Map([
   ['type', 'submit'],
   ['class', 'button']
  ]));
  calculate.value = 'Calculate';

  form.append(fio, phone, email, deliveryMethod, date, departure, destination, departureDate, destinationDate, calculate);
  document.body.appendChild(div).appendChild(form);

  form.addEventListener("submit", (event) => {
   formSendData(event, form, departure, destination, departureDate, destinationDate);
  })
 }

 function createField(formElem, elemAttrs, elemRequired = false) {
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

  if (elemRequired) {
   field.required = elemRequired;
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

 function formSendData(event, formData, departure, destination, departureDate, destinationDate) {
  event.preventDefault();
  if (departure.value !== destination.value && departureDate.value < destinationDate.value) {
   let data = [...formData.children];
   data.map((elem, index) => {
    if (elem.type !== 'submit') {
     arrayData[index] = elem.value;
    }
   });
   [fieldName, fieldPhone, fieldEmail, fiedDeliveryMethod, fieldDateCurrent,
    fiedDistA, fiedDistB, fiedDateDeparture, fiedDateDelivery] = arrayData;

   let sum = calculation();
   showCalculation(sum);
  } else {
   alert("Check information about cities and dates!");
  }
 }

 function calculation() {
  let distA = fiedDistA;
  let distB = fiedDistB;
  let method = fiedDeliveryMethod;
  let finalPrice = 0;

  let dist = distances.find(elem => {
   if ((elem.a === distA || elem.b === distA) && (elem.a === distB || elem.b === distB)) {
    return elem;
   }
  });

  let coof = methods.find(elem => elem.method === method ? elem : null);

  if (dist && coof) {
   finalPrice = dist.d * coof.price;
  }

  return finalPrice;
 }

 function showCalculation(sum) {
  let message = '';
  if (sum) {
   message = `Your order was created ${fieldDateCurrent}.
   The delivery method is ${fiedDeliveryMethod}.
   From ${fiedDistA} (${fiedDateDeparture}) to ${fiedDistB} (${fiedDateDelivery}).
   Final price is ${sum} BYN.
   Client information: 
   client name: ${fieldName}
   phone number: ${fieldPhone}
   email: ${fieldEmail}.`;
  } else {
   message = 'You can not possibility to order delivery';
  }
  if (document.getElementById('price')) {
   document.getElementById('price').innerText = message;
  } else {
   let showPrice = createField('div', new Map([
    ['class', 'price'],
    ['id', 'price']
   ]));
   showPrice.innerText = message;

   document.getElementById('delivery_form').appendChild(showPrice);
  }
 }

 showForm();
}

window.addEventListener('DOMContentLoaded', delivery);