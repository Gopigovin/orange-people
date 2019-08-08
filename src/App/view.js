import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import cloneDeep from 'lodash/cloneDeep';
import { Button, Form } from 'semantic-ui-react'

class View extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      edit: {
        editable: true,
        resizable: true,
        userData: null
      },
      columnDefs: [
        {
          headerName: "Id", field: "_id", width: 100,
          sortable: true, filter: true
        },
        {
          headerName: "Name", field: "name", sortable: true, filter: true, width: 100
        },
        {
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
          headerName: "Joining Date", field: "doj", sortable: true, filter: true, width: 100,
        },
        // {
        //   headerName: "Amount", field: "amount", sortable: true, filter: true, width: 100,
        // },
        // {
        //   headerName: "date", field: "date", sortable: true, filter: true, width: 100,
        // },
        // {
        //   headerName: "Balance", field: "balance", sortable: true, filter: true, width: 100, 
        // },
      ],
      viewRowData: null,
      rentRowData: null
    }
  }
  gridOnCellEditingStopped(event) {
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

        if (data.status == 204) {

        } else {

        }

      }).catch(function (error) {
      })
  }

  componentDidMount() {
    debugger;
    let arr = [];
    if (this.props.state) {
      fetch('http://localhost:3000/admin', {
        method: 'GET',
      }).then(response => response.json())
        .then(function (data) {
          debugger;
          if (data.status == 204) {
            this.setState({
              viewRowData: null, loginState: true
            })
          } else {
            document.querySelector('#viewloading').classList.remove("loading");
            var arr = [];
            var obj = {};
            data.forEach(function (value, index, array) {
              obj = {
                key: value["_id"],
                text: value["name"],
                value: value["_id"]
              };
              arr.push(obj);
            });
            debugger;
            this.setState({
              viewRowData: data, loginState: false,
              friendOptions: arr
            });
          }
        }.bind(this)
        ).catch(function (error) {
          this.setState({
            viewRowData: null,
            loginState: false,
          })
        }.bind(this));
    }
  }

  render() {
    if (this.props.state) {

    }
    return (
      <div id="results" className="App">
        <Form id="viewloading" className="loading">
          <div className="App">

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
                    rowData={this.state.viewRowData}>
                  </AgGridReact>
                </div>
              </div>
            }
          </div>
        </Form>
      </div>
    );
  }
};


export default View