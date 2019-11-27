const db = require('electron-db');
const mssql = require('mssql');
const Store = require('electron-store');
const store = new Store();


var config = {
  server: '192.168.1.199',
  database: 'directDocs',
  user: 'sa',
  password: 'qpwoei39!@',
  port: 1433,
  stream: true
}


function validateUser() {
  var un = document.loginform.username.value;
  var pw = document.loginform.password.value;

  console.log("user:" + un + " pass:" + pw);
  const conn = new mssql.ConnectionPool(config);
  mssql.connect(config, function (err) {
    var request = new mssql.Request();
    request.stream = true;
    request.query('SELECT * from users');
    request.on('row', row => {
      if(row.email.toString()==un.toString()){
        
        if(row.password.toString()==pw.toString()){
          console.log("username and password match!");
          

          document.getElementById('link').click();
          store.set('fullname',row.name.toString());
     \
         


        }

      }
  
    })
  });


  return false;
}



function populateCustomers(){
  var table = document.getElementById("customerTable");

  var length = table.querySelectorAll("tr").length;
		console.log("removing "+length+ "rows");
			var length = table.rows.length;
			for(var x = 0; x <length; x++) {
				table.deleteRow(0);
      }

      var row = table.insertRow(-1);

    row.insertCell(0).outerHTML = "<th> Customer Name </th><th> Main Contact </th> <th> Phone </th> <th> Email </th> <th> # of Invoices </th> <th> YTD Income </th>"; 

      


  const conn = new mssql.ConnectionPool(config);
  mssql.connect(config, function (err) {
    var request = new mssql.Request();
    request.stream = true;
    request.query('SELECT * from customer');
    request.on('row', rowData => {

      var row = table.insertRow(-1);
      var cell = row.insertCell(-1);
      cell.innerHTML = rowData.name.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.contact.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.phone.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.email.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.invoicecount.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.income.toString();
    })
  });
}


function populateSuppliers(){
  var table = document.getElementById("supplierTable");

  var length = table.querySelectorAll("tr").length;
		console.log("removing "+length+ "rows");
			var length = table.rows.length;
			for(var x = 0; x <length; x++) {
				table.deleteRow(0);
      }

      var row = table.insertRow(-1);

    row.insertCell(0).outerHTML = "<th> Customer Name </th><th> Main Contact </th> <th> Phone </th> <th> Email </th> <th> # of Invoices </th> <th> YTD Income </th>"; 

      


  const conn = new mssql.ConnectionPool(config);
  mssql.connect(config, function (err) {
    var request = new mssql.Request();
    request.stream = true;
    request.query('SELECT * from supplier');
    request.on('row', rowData => {

      var row = table.insertRow(-1);
      var cell = row.insertCell(-1);
      cell.innerHTML = rowData.name.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.contact.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.phone.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.email.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.invoicecount.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.income.toString();
    })
  });
}

function populateOrders(){
  var table = document.getElementById("orderTable");

  var length = table.querySelectorAll("tr").length;
		console.log("removing "+length+ "rows");
			var length = table.rows.length;
			for(var x = 0; x <length; x++) {
				table.deleteRow(0);
      }

      var row = table.insertRow(-1);

    row.insertCell(0).outerHTML = "<th> Order ID </th><th> Type </th> <th> Due Date </th> <th> Expenses </th><th> Description </th>"; 

      


  const conn = new mssql.ConnectionPool(config);
  mssql.connect(config, function (err) {
    var request = new mssql.Request();
    request.stream = true;
    request.query('SELECT * from orders');
    request.on('row', rowData => {

      var row = table.insertRow(-1);
      var cell = row.insertCell(-1);
      cell.innerHTML = rowData.orderID.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.type.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.duedate.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.expenses.toString();
      cell = row.insertCell(-1);
      cell.innerHTML = rowData.description.toString();
    })
  });



}


function getName(){

  var name = document.getElementById("name");
  name.innerHTML = "Welcome "+store.get("fullname")+"!";

}

