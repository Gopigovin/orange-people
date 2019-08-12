import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};
const pie = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};
const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

const data1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};



class DashBoard extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      columnDefs: [{
        headerName: "QuestionId", field: "_id",
        sortable: true, filter: true
      }, {
        headerName: "Question", field: "question", sortable: true, filter: true
      }, {
        headerName: "Answer", field: "answer", sortable: true, filter: true
      },
      {
        headerName: "Marks", field: "answer", sortable: true, filter: true
      }],
      rowData: null
    }
  }

  componentDidMount() {
    debugger
    if (this.props.state) {

      this.setState({
        rowData: this.props.state.question
      })
    }
  }
  render() {
    if (this.props.state) {
      data = {
        labels: [
          'Total',
          'Correct',
          'Wrong'
        ],
        datasets: [{
          data: data1,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      };
      pie = {
        labels: [
          'Total',
          'Correct',
          'Wromg'
        ],
        datasets: [{
          data:data1,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
      };
    }
    return (
      <div id="results" className="App">
        <div className="App">     
        </div>    
          <div className="col-md-12">
            <div class="row col-md-12">
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Paid</h5>
                    <p class="card-text">100</p>

                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Total Users</h5>
                    <p class="card-text">400</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Unpaid</h5>
                    <p class="card-text">200</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">100</h5>
                    <p class="card-text">New Users</p>
                  </div>
                </div>
              </div>

            
            </div>
            <div className="col-md-12 row p-5">
              <div className="col-md-6">
                <Doughnut data={data} />
              </div>
              <div className="col-md-6">
                <Bar
                  data={data1}
                  width={100}
                  height={50}
                  options={{
                    maintainAspectRatio: false
                  }}
                />
              </div>

            </div>


            <div className="col-md-12 row p-5">
              <div className="col-md-6">
                <Line data={line} />
              </div>
              <div className="col-md-6">
                <Pie data={pie} />
              </div>





            </div>
            {/* <div className="ag-theme-balham col-md-12 p-5"
              style={{
                height: '500px'
              }} >
              <AgGridReact
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}>
              </AgGridReact>
            </div> */}
          </div>
        
      </div>
    );
  }
};


export default DashBoard