import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';
import cloneDeep from 'lodash/cloneDeep';

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
          headerName: "Id", field: "_id", width: 100,
          sortable: true, filter: true
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
        {
          headerName: "Amount", field: "amount", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "date", field: "date", sortable: true, filter: true, width: 100,
        },
        {
          headerName: "Balance", field: "balance", sortable: true, filter: true, width: 100, 
        },
      ],
      viewRowData: null,
      rentRowData:null
    }
  }
  gridOnCellEditingStopped(event) {
    ;
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
      // var userData= cloneDeep(this.props.state.userData);
      // userData.forEach( function(value,index,array) {
      //   userData[index].monthData.forEach( function(mvalue, mindex,marray){
      //     userData[index].date=userData[index].monthData[mindex].date;
      //     userData[index].amount=userData[index].monthData[mindex].amount;
      //     userData[index].balance=userData[index].monthData[mindex].balance;        
      //     arr.push(cloneDeep(userData[index]));
      //   }.bind(this));     
      // }.bind(this));
      // var json = [{ "_id":"123","email": "123@gmail.com", "name": "1", "hostelno": "1", "roomno": "2399", "sharingtype": "AC", "doj": "2518-08-09", "advanceamount": "40000", "smobileno": "8015074815", "pmobileno": "12324234325", "Professiontype": "working", "address": "1229, 5th street,, Thendral colony, Anna nagar west,", "key": "user", "date": "14/2/2018", "amount": "10", "balance": "20" },
      // { "_id":"123","email": "123@gmail.com", "name": "1", "hostelno": "1", "roomno": "2399", "sharingtype": "AC", "doj": "2019-08-09", "advanceamount": "40000", "smobileno": "8015074815", "pmobileno": "12324234325", "Professiontype": "working", "address": "1229, 5th street,, Thendral colony, Anna nagar west,", "key": "user", "date": "12/2/2018", "amount": "108", "balance": "520" }];
      this.setState({
        viewRowData: this.props.state.userData,        
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
                  rowData={this.state.viewRowData}>
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