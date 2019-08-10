import React from "react";
import serialize from 'form-serialize';
import { Button, Form } from 'semantic-ui-react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const stayOptions = [
  { key: 'ac', text: 'AC', value: 'AC' },
  { key: 'non-ac', text: 'NON-AC', value: 'NON-AC' },
]
const profOptions = [
  { key: 'study', text: 'Studying', value: 'Studying' },
  { key: 'non-study', text: 'Working', value: 'Working' },
]

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharingType: null
    }
  }

  onSharingChange = (e, data) => {
    this.setState({ sharingType: data.value });
  }

  onProfessiontypeChange = (e, data) => {
    console.log(data.value);
    this.setState({ professionType: data.value });
  }

  handleChange=(date) =>{
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <div>
        <div id="results" className="search-results p-5">
          <div>
            <Form id='loading' className="">
              <form id="data" onSubmit={this.props.onAddUserSubmit} className="form-group">

                <div className="form-group">
                  <label for="exampleInputEmail1"> Name</label>
                  <input type="text" className="form-control" placeholder="Enter name" name="name"></input>
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1"> Email</label>
                  <input type="text" className="form-control" placeholder="Enter nmail" name="email"></input>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Hostel No</label>
                    <input type="text" className="form-control" placeholder="Enter hostel number" name="hostelno"></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Room No</label>
                    <input type="text" className="form-control" placeholder="Enter room number" name="roomno"></input>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Sharing (AC/ Non-A/C)</label>
                    <Form.Select fluid onChange={this.onSharingChange} options={stayOptions} placeholder="Sharing (AC/ Non-A/C)" />
                    <input type="hidden" value={this.state.sharingType} className="form-control" placeholder="Email" name="sharingtype"></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Studying / Working</label>
                    <Form.Select fluid onChange={this.onProfessiontypeChange} options={profOptions} placeholder="Studying / Working" />
                    <input type="hidden" className="form-control" placeholder="Email" name="professiontype" value={this.state.professionType}></input>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Advance Aount</label>
                    <input type="text" className="form-control" placeholder="Email" name="advanceamount"></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Date of Joining</label>
                    <DatePicker   selected={this.state.startDate}
    onChange={this.handleChange} className="col-md-12" name="doj" placeholderText="Enter the Joining Date"></DatePicker>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Mobile No</label>
                    <input type="text" className="form-control" placeholder="Email" name="smobileno"></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Parents Mob No</label>
                    <input type="text" className="form-control" placeholder="Email" name="pmobileno"></input>
                  </div>
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <textarea placeholder="Enter permanent address" rows="3" name="address"></textarea>
                </div>
                <div className="text-center">
                <input type="submit" value="Add" className="btn btn-outline-primary w-25" />
                </div>
              </form>
            </Form>
          </div>
        </div>

      </div>
    );
  }
};


export default AddUser