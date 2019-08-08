import React from "react";
import serialize from 'form-serialize';
import { Dropdown } from 'semantic-ui-react';
import { Form, Button } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import cloneDeep from 'lodash/cloneDeep';

class AddRent extends React.Component {
  constructor(props) {
    debugger
    super(props);
    this.state = {
      nameselected: null
    }
    this.state = {
      edit: {
        editable: true,
        resizable: true
      },
      columnDefs: [
        {
          headerName: "Name", field: "name", width: 100,
          sortable: true, filter: true
        }, {
          headerName: "Id", field: "_id", width: 100,
          sortable: true, filter: true, rowGroup: true
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
    var updateData = { _id: event.data._id, field: field, value: value }
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
    debugger
    if (this.props.state) {
      let arr = [];
      var userData = cloneDeep(this.props.state.userData);
      userData.forEach(function (value, index, array) {
        if (userData[index].hasOwnProperty("monthData")) {
          userData[index].monthData.forEach(function (mvalue, mindex, marray) {
            userData[index].date = userData[index].monthData[mindex][0].date;
            userData[index].amount = userData[index].monthData[mindex][0].amount;
            userData[index].balance = userData[index].monthData[mindex][0].balance;
            arr.push(cloneDeep(userData[index]));
          }.bind(this));
        }
      }.bind(this));
      this.setState({
        rentRowData: arr || this.props.state.userData
      });
    }
  }



  onChange = (e, data) => {
    debugger
    console.log(data.value);
    this.setState({ nameselected: data.value });
  }

  render() {
    return (
      <div>
        <div id="results" className="search-results">
          <div>
            <form id="data" onSubmit={this.props.onAddRentSubmit} className="form-group">
              <div className="App">
                <div className="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <Form.Dropdown placeholder='Select Friend' onChange={this.onChange} fluid selection options={this.props.state.friendOptions} />
                  <input type="hidden" name="username" value={this.state.nameselected}></input>
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Amount</label>
                  <input type="text" className="form-control" placeholder="Email" name="amount"></input>
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Balance</label>
                  <input type="text" className="form-control" placeholder="Email" name="balance"></input>
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Month</label>
                  <input type="month" className="form-control" placeholder="Email" name="date"></input>
                </div>
                <input type="submit" value="Add" className="btn btn-outline-primary w-25" />
              </div>
            </form>
          </div>
        </div>

        <div id="results" className="App">
          <div className="App">
            <h3>View </h3>
            {
              <div>
                <div className="ag-theme-balham col-md-12 p-5"
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
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
};


export default AddRent