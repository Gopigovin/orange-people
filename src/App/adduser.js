import React from "react";
import serialize from 'form-serialize';
import { Button, Form } from 'semantic-ui-react'

class AddUser extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="results" className="search-results">
          <div>
            <Form id='loading' className="">
              <form id="data" onSubmit={this.props.onAddUserSubmit} className="form-group">
                <div className="App">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" placeholder="User" name="name" ></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1"> Email</label>
                    <input type="text" className="form-control" placeholder="Email" name="email"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Hostel No</label>
                    <input type="text" className="form-control" placeholder="Email" name="hostelno"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Room No</label>
                    <input type="text" className="form-control" placeholder="Email" name="roomno"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Sharing (AC/ Non-A/C)</label>
                    <input type="text" className="form-control" placeholder="Email" name="sharingtype"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Date of Joining</label>
                    <input type="date" className="form-control" placeholder="Email" name="doj"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Advance Aount</label>
                    <input type="text" className="form-control" placeholder="Email" name="advanceamount"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Mobile No</label>
                    <input type="text" className="form-control" placeholder="Email" name="smobileno"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Parents Mob No</label>
                    <input type="text" className="form-control" placeholder="Email" name="pmobileno"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Studying or Working</label>
                    <input type="text" className="form-control" placeholder="Email" name="Professiontype"></input>
                  </div>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Address</label>
                    <input type="textarea" className="form-control" placeholder="Email" name="address"></input>
                  </div>
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