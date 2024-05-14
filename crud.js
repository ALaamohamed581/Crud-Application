let name = document.getElementById("nameE");
let price = document.getElementById("price");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let Quantity = document.getElementById("Quantity");
let TOTAL = document.getElementById("TOTAL");
let Add = document.getElementById("Add");
let cash = document.getElementById("cash");
let TB = document.getElementById("TB");
let search = document.getElementById("search");
let mood = "create";
let temp;
var tabl = document.getElementsByTagName("tr");
var tablerows = [];
//global varibles
var productsarr = [];
//showing total
function gettotal() {
  if (price.value != "") {
    TOTAL.innerHTML = +price.value + +ads.value - +discount.value;
    TOTAL.setAttribute("class", "bg-success");
    TOTAL.style.fontSize = "20px";
  } else {
    TOTAL.innerHTML = "";
    TOTAL.setAttribute("class", "bg-danger");
  }
}
cash.addEventListener("keyup", gettotal);

//creating an ite
function create(e) {
  e.preventDefault();
  let product = {
    name: name.value.toLowerCase(),
    price: price.value,
    ads: ads.value,
    discount: discount.value,
    total: TOTAL.innerHTML,
    Quantity: Quantity.value,
  };
  if (mood === "create") {
    productsarr.push(product);
    clearData();
    show_item();
  } else {
    productsarr[temp] = product;
    show_item();
    mood = "create";
    Add.innerHTML = "ADD";
    clearData();
  }
}

//showing an item

function show_item() {
  let teable = "";
  if (productsarr.length > 0) {
    for (i = 0; i < productsarr.length; i++) {
      teable += `


<tr>
<td>${i}</td>

    <td>${productsarr[i].name}</td>
    <td>${productsarr[i].price}</td>
    <td>${productsarr[i].ads}</td>
    <td>${productsarr[i].discount}</td>
    <td>${productsarr[i].total}</td>
    <td>${productsarr[i].Quantity}</td>
 
    <td><button class="btn btn-primary edit" onclick="editPro(${i})">EDIT</button></td>
    <td><button class="btn btn-danger remove" onclick="deletePro(${i})">REMOVE</button></td>



</tr>



`;
      TB.innerHTML = teable;
    }
  } else {
    TB.innerHTML = "";
  }
}

//deleting an elemtt
function deletePro(x) {
  productsarr.splice(x, 1);
  show_item();
}

//editPro
Add.addEventListener("click", create);
function editPro(x) {
  name.value = productsarr[x].name;
  price.value = productsarr[x].price;
  ads.value = productsarr[x].ads;
  discount.value = productsarr[x].discount;
  TOTAL.innerHTM = productsarr[x].total;
  Quantity.value = productsarr[x].Quantity;
  gettotal();
  mood = "update";
  Add.innerHTML = "update";
  temp = x;
  document.body.scrollTop = 0;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search function
function searching() {
  let x = "";
  for (i = 0; i < productsarr.length; i++) {
    if (productsarr[i].name.includes(search.value)) {
      x += `
            <tr>
            <td>${i}</td>
                <td>${productsarr[i].name}</td>
                <td>${productsarr[i].price}</td>
                <td>${productsarr[i].ads}</td>
                <td>${productsarr[i].discount}</td>
                <td>${productsarr[i].total}</td>
                <td>${productsarr[i].Quantity}</td>
                <td><button class="btn btn-primary edit" onclick="editPro(${i})">EDIT</button></td>
                <td><button class="btn btn-danger remove" onclick="deletePro(${i})">REMOVE</button></td>
            
               
            </tr>
            `;
    }
  }

  TB.innerHTML = x;
}
function clearData() {
  name.value = "";
  price.value = "";
  ads.value = "";
  discount.value = "";
  TOTAL.innerHTML = "";
  TOTAL.setAttribute("class", "bg-danger");
  Quantity.value = "";
}

search.addEventListener("keyup", searching);
let excel = document.getElementById("downloadExcel");

excel.addEventListener("click", (_) => {
  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("#tbb"));
});
//
let tapleoutput = "";
const exlfle = document.getElementById("excel");
exlfle.addEventListener("change", (event) => {
  var reader = new FileReader();
  reader.readAsArrayBuffer(event.target.files[0]);
  reader.onload = function (event) {
    var data = new Uint8Array(reader.result);
    var work_book = XLSX.read(data, { type: "array" });
    var sheet_name = work_book.SheetNames;
    var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {
      header: 1,
    });
sheet_data.shift()

    if (sheet_data.length > 0) {
      var table_output = ``;

      for (var row = 0; row < sheet_data.length; row++) {
        table_output += "<tr>";

        for (var cell = 0; cell < sheet_data[row].length; cell++) {
          if (row == 0) {
            table_output += "<th>" + sheet_data[row][cell] + "</th>";
          } else {
            table_output += "<td>" + sheet_data[row][cell] + "</td>";
          }
        }

        table_output += "</tr>";
      }

      table_output += `  
            </tr>`;

      TB.innerHTML = table_output;

      tablerows = Array.from(tabl);
      console.log(tablerows);
      tablerows.shift()
      for (i = 0; i <=tablerows.length; i++) {
       
        tablerows[i].children[7].innerHTML = `<button class="btn btn-primary edit" onclick="editPro(${i})">EDIT</button>`;
        tablerows[i].children[8].innerHTML = `<button class="btn btn-danger remove" onclick="deletePro(${i})">REMOVE</button>`;

        var product = {
          name: tablerows[i].cells[1].innerHTML.toLowerCase(),
          price: tablerows[i].cells[2].innerHTML,
          ads: tablerows[i].cells[3].innerHTML,
          discount: tablerows[i].cells[4].innerHTML,
          total: tablerows[i].cells[5].innerHTML,
          Quantity: tablerows[i].cells[6].innerHTML,
        };

        productsarr.push(product);
      }
    }
  };
});
