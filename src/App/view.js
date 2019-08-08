import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';




class View extends React.Component {

  constructor(props) {

    super(props);
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

        {
          headerName: "ID", field: "_id", sortable: true, filter: true, hide: false,
        }],
      rowData: null
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
      this.setState({
        rowData: this.props.state.userData
      });
    }
  }

  render() {
    if (this.props.state) {

    }
    return (
      <div id="results" className="App">
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
                  rowData={this.state.rowData}>
                </AgGridReact>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
};


export default View