import React from "react";
import serialize from 'form-serialize';
import { Button, Form } from 'semantic-ui-react';
import DatePicker from "react-datepicker";
import 'react-notifications/lib/notifications.css';
import "react-datepicker/dist/react-datepicker.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';

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


  onAddUserSubmit = function (event) {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {

      debugger;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (form.checkValidity() === true) {
        event.preventDefault();
        var form = document.querySelector('#data');
        document.querySelector('#loading').classList.add("loading");
        var addData = serialize(form, { hash: true });
        addData["key"] = "user";
        addData["status"] = "active";
        addData["uniqueID"] = "ORG" + Math.random().toString().substr(2, 4);
        fetch('http://localhost:3000/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            addData
          })
        }).then(response => response.json())
          .then(function (data) {

            if (data.status == 204) {

            } else {

              document.querySelector('#loading').classList.remove("loading");
              form.classList.remove('was-validated');
              NotificationManager.success(' User added successfully', 'Success');
              form.reset();

            }

          }.bind(this)
          ).catch(function (error) {


          }.bind(this));
      }
      form.classList.add('was-validated');
    }.bind(this));

  }.bind(this);


  // componentDidMount() {    
  //     // Fetch all the forms we want to apply custom Bootstrap validation styles to
  //     var forms = document.getElementsByClassName('needs-validation');
  //     // Loop over them and prevent submission
  //     var validation = Array.prototype.filter.call(forms, function (form) {
  //       form.addEventListener('submit', function (event) {
  //         debugger;
  //         if (form.checkValidity() === false) {
  //           event.preventDefault();
  //           event.stopPropagation();
  //         }
  //         if (form.checkValidity() === true) {
  //           debugger
  //          this.onAddUserSubmit();
  //         }
  //         form.classList.add('was-validated');
  //       }, false);
  //     }.bind(this));    
  // }

  onSharingChange = (e, data) => {
    this.setState({ sharingType: data.value });
  }

  onProfessiontypeChange = (e, data) => {
    console.log(data.value);
    this.setState({ professionType: data.value });
  }

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <div>
        <div id="results" className="search-results p-5">
          <div>
            <Form id='loading'>
              <form id="data" onSubmit={this.onAddUserSubmit} className="form-group needs-validation" noValidate>
                <div className="form-group">
                  <label for="exampleInputEmail1"> Name</label>
                  <input type="" required className="form-control" placeholder="Enter name" name="name"></input>
                  <div class="invalid-feedback">
                    Please enter a username.
                   </div>
                  {/* <div class="valid-feedback">
        Looks good!
      </div> */}
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1"> Email</label>
                  <input type="" required className="form-control" placeholder="Enter nmail" name="email"></input>
                  <div class="invalid-feedback">
                    Please enter a email.
                   </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Hostel No</label>
                    <input type="" required className="form-control" placeholder="Enter hostel number" name="hostelno"></input>
                    <div class="invalid-feedback">
                      Please enter a hostel number.
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Room No</label>
                    <input type="" required className="form-control" placeholder="Enter room number" name="roomno"></input>
                    <div class="invalid-feedback">
                      Please enter a room number.
                   </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Sharing (AC/ Non-A/C)</label>
                    <Form.Select fluid onChange={this.onSharingChange} options={stayOptions} placeholder="Sharing (AC/ Non-A/C)" />
                    <input type="" required value={this.state.sharingType} className="form-control  d-none" placeholder="Email" name="sharingtype"></input>
                    <div class="invalid-feedback">
                      Please enter a sharing mode.
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Studying / Working</label>
                    <Form.Select fluid onChange={this.onProfessiontypeChange} options={profOptions} placeholder="Studying / Working" />

                    <input required className="form-control  d-none" placeholder="Email" name="professiontype" value={this.state.professionType}></input>
                    <div class="invalid-feedback">
                      Please enter a profession type.
                   </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Advance Aount</label>
                    <input type required className="form-control" placeholder="Enter the advance amount" name="advanceamount"></input>
                    <div class="invalid-feedback">
                      Please enter the advance amount
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Date of Joining</label>
                    <DatePicker selected={this.state.startDate}
                      onChange={this.handleChange} required={true} className="col-md-12" name="doj" placeholderText="Enter the Joining Date"></DatePicker>
                    <div class="invalid-feedback">
                      Please enter the date of Joining
                   </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Mobile No</label>
                    <input type="" required className="form-control" placeholder="Email" name="smobileno"></input>
                    <div class="invalid-feedback">
                      Please enter the mobile number
                   </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label for="exampleInputEmail1">Parents Mob No</label>
                    <input type="" required className="form-control" placeholder="Email" name="pmobileno"></input>
                    <div class="invalid-feedback">
                      Please enter the Parents amount
                   </div>
                  </div>
                </div>
                <div className="form-group">
                  <label for="exampleInputEmail1">Address</label>
                  <textarea required placeholder="Enter permanent address" rows="3" name="address"></textarea>
                  <div class="invalid-feedback">
                    Please enter the permanent address
                   </div>
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