import React from "react";
import serialize from 'form-serialize';
import { Dropdown } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import cloneDeep from 'lodash/cloneDeep';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class AddRent extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      nameselected: null
    }
    this.state = {
      availableUserList: null,
      userData: null,
      edit: {
        editable: true,
        resizable: true
      },
      columnDefs: [
        {
          headerName: "UniqueID", field: "uniqueID", width: 100,
          sortable: true, filter: true, rowGroup: true,
        },
        {
          headerName: "Name", field: "name", width: 100,
          sortable: true, filter: true
        }, {
          headerName: "Id", field: "_id", width: 100,
          sortable: true, filter: true, hide: true
        }
        , {
          headerName: "Email", field: "email", sortable: true, filter: true, width: 100
        },
        {
          headerName: "Hostel No", field: "hostelno", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "Room No", field: "roomno", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "AC/No-AC", field: "sharingtype", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "Working/Studying", field: "Professiontype", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "Advance", field: "advanceamount", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "Parents No", field: "pmobileno", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "Phone", field: "smobileno", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "Address", field: "address", sortable: true, filter: true
        },
        {
          headerName: "Amount", field: "amount", sortable: true, filter: true
        },
        {
          headerName: "Balance", field: "balance", sortable: true, filter: true
        },
        {
          headerName: "Month", field: "date", sortable: true, filter: true
        }

      ],
      rentRowData: null
    }
  }

  gridOnCellEditingStopped(event) {
    debugger;
    var event;
    var field = event.colDef.field;
    var value = event.value;
    if (field == "balance") {
      event.data.monthData[0].balance = value;
    }
    var updateData = { _id: event.data._id, field: field, value: value, data: event.data, rowIndex: event.rowIndex }
    fetch('http://localhost:3000/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        updateData
      })
    }).then(response => response.json())
      .then(function (data) {
        debugger
        if (data.status == 204) {

        } else {

        }

      }).catch(function (error) {


      })
  }



  componentDidMount() {

    fetch('http://localhost:3000/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })

    }).then(response => response.json())
      .then(function (data) {
        debugger

        if (data.status == 204) {
          this.setState({
            userData: null, loginState: true
          })
        } else {

          var obj = {};
          var arr = [];
          if (data.length > 0) {
            data.forEach(function (value, index, array) {
              obj = {
                key: value["_id"],
                text:"("+ (value["uniqueID"]) +") " + value["name"],
                value: value["_id"]
              };
              arr.push(obj);
            });
            ;
            this.setState({
              userData: data, loginState: false,
              availableUserList: arr

            });


            document.querySelector('#rentviewloading').classList.remove("loading");
            let arrayVal = [];
            var userData = cloneDeep(this.state.userData);
            userData.forEach(function (value, index, array) {
              if (userData[index].hasOwnProperty("monthData")) {
                userData[index].monthData.forEach(function (mvalue, mindex, marray) {

                  debugger;
                  userData[index].date = userData[index].monthData[mindex].date;
                  userData[index].amount = userData[index].monthData[mindex].amount;
                  userData[index].balance = userData[index].monthData[mindex].balance;
                  arrayVal.push(cloneDeep(userData[index]));
                }.bind(this));
              }
            }.bind(this));
            this.setState({
              rentRowData: arrayVal || this.state.userData
            });
          }

        }
      }.bind(this)
      ).catch(function (error) {
        this.setState({
          userData: null,
          loginState: false,
        });
      }.bind(this));



  }

  onAddRentSubmit = function (event) {

    event.preventDefault();
    var form = document.querySelector('#data');
    ;
    var addRentData = serialize(form, { hash: true });
    addRentData = { "username": addRentData.username, "monthData": [{ "amount": addRentData.amount, "balance": addRentData.balance, "date": addRentData.date }] }
    fetch('http://localhost:3000/addrent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        addRentData
      })
    }).then(response => response.json())
      .then(function (data) {

        if (data.status == 204) {

        } else {

        }

      }.bind(this)
      ).catch(function (error) {


      }.bind(this));
  }.bind(this);


  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  onChange = (e, data) => {

    console.log(data.value);
    this.setState({ nameselected: data.value });
  }

  render() {
    return (
      <div>
        <div id="results" className="search-results">
          <div className=" p-5">
            <form id="data" onSubmit={this.onAddRentSubmit} className="form-group ui form">
              <div className="form-group">
                <label for="exampleInputEmail1">Name</label>

                <Form.Dropdown placeholder='Select user' search onChange={this.onChange} fluid selection options={this.state.availableUserList} />
                <input type="hidden" name="username" value={this.state.nameselected}></input>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Amount</label>
                <input type="text" className="form-control" placeholder="Enter amount" name="amount"></input>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Balance</label>
                <input type="text" className="form-control" placeholder="Enter balance" name="balance"></input>
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Month</label>
                <DatePicker dateFormat="MMMM d, yyyy" selected={this.state.startDate}
                  onChange={this.handleChange} className="col-md-12" name="doj" name="date" placeholderText="Enter the date"></DatePicker>
              </div>
              <div className="text-center">
                <input type="submit" value="Add" className="btn btn-outline-primary w-25" />
              </div>
            </form>
          </div>
        </div>

        <div id="results" className="App">
          <div className="App">
            {
              <Form id="rentviewloading" className="loading h-100">
                <div className="ag-theme-balham col-md-12 p-3 loading"
                  style={{
                    height: '500px'
                  }} >
                  <AgGridReact
                    columnDefs={this.state.columnDefs} defaultColDef={
                      this.state.edit
                    } onCellEditingStopped={this.gridOnCellEditingStopped}
                    rowData={this.state.rentRowData}>
                  </AgGridReact>
                </div>
              </Form>
            }
          </div>
        </div>
      </div>
    );
  }
};


export default AddRent