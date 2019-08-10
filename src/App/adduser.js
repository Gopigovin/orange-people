import React from "react";
import serialize from 'form-serialize';

const EMAIL_REGEX = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      hostelname: '',
      roomno: '',
      sharingtype: '',
      doj: '',
      advanceamount: '',
      smobileno: '',
      pmobileno: '',
      professiontype: '',
      address: '',
      touched: {
        name: false,
        email: false,
        hostelname: false,
        roomno: false,
        sharingtype: false,
        doj: false,
        advanceamount: false,
        smobileno: false,
        pmobileno: false,
        professiontype: false,
        address: false
      },
      errors: {
        required: {
          name: false,
          email: false,
          hostelname: false,
          roomno: false,
          sharingtype: false,
          doj: false,
          advanceamount: false,
          smobileno: false,
          pmobileno: false,
          professiontype: false,
          address: false
        },
        valid: {
          email: true,
          name: true,
          hostelname: true,
          roomno: true,
          sharingtype: true,
          doj: true,
          advanceamount: true,
          smobileno: true,
          pmobileno: true,
          professiontype: true,
          address: true
        }
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    const errors = {
      required: { ...this.state.errors.required, [name]: false }
    };
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, ...errors }
    });
  }

  handleBlur(event) {
    const field = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
    this.validate(event);
  }

  validate(event) {
    const target = event.target;
    const { value, name } = target;

    if (value.length === 0) {
      const errors = {
        required: { ...this.state.errors.required, [name]: true }
      };

      this.setState({
        errors: { ...this.state.errors, ...errors }
      });
      return;
    }

    if (name === 'email') {
      this.validateEmail(value);
    }
  }

  validateEmail(email) {
    const emailIsValid = EMAIL_REGEX.test(this.state.email);
    const errors = {
      valid: { ...this.state.errors.valid, email: emailIsValid }
    };

    this.setState({
      errors: { ...this.state.errors, ...errors }
    });
  }

  hasError(field) {
    return (this.state.errors.required[field] || !this.state.errors.valid[field]) && this.state.touched[field];
  }

  isFormInvalid() {
    //const { email, name, errors } = this.state;
    const { email, name, hostelname, roomno, sharingtype, doj, advanceamount, smobileno, pmobileno, professiontype, address, errors } = this.state;
    const { required, valid } = errors;
    const isSomeFieldRequired = Object.keys(required).some(error => required[error]);
    const isSomeFieldInvalid = Object.keys(valid).some(error => !valid[error]);

    return isSomeFieldInvalid || isSomeFieldRequired;
  }

  displayError(field) {
    const { required, valid } = this.state.errors;
    const errorMessage = `Enter Valid ${field == 'doj' ? 'Date' : field.split(' ')
      .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(' ')}`;

    if (required[field]) {
      return `${errorMessage}`;
    }

    if (!valid[field]) {
      return `${errorMessage}`;
    }
  }

  render() {
    const { email, name, hostelname, roomno, sharingtype, doj, advanceamount, smobileno, pmobileno, professiontype, address, errors } = this.state;
    return (
      <div className="col-12">
        <div className="row">
          <form id="data" onSubmit={this.props.onAddUserSubmit}>
            <div className="form-group">
              <div>
                <label for="exampleInputEmail1">Name</label>
              </div>
              <div className="form-column">
                <input type="text" className="form-control" name="name" placeholder="User" value={name} onChange={this.handleChange} onBlur={this.handleBlur} />
                <div className={this.hasError('name') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('name')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1"> Email</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Email" name="email" value={email} onChange={this.handleChange} onBlur={this.handleBlur} ></input>
                <div className={this.hasError('email') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('email')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Hostel No</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Hostel Name" name="hostelname" value={hostelname} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('hostelname') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('hostelname')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Room No</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Room No" name="roomno" value={roomno} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('roomno') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('roomno')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Sharing (AC/ Non-A/C)</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Sharing (AC/ Non-A/C)" name="sharingtype" value={sharingtype} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('sharingtype') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('sharingtype')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Date of Joining</label>
              <div className="form-column">
                <input type="date" className="form-control" placeholder="Date of Joining" name="doj" value={doj} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('doj') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('doj')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Advance Amount</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Advance Amount" name="advanceamount" value={advanceamount} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('advanceamount') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('advanceamount')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Mobile No</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Mobile No" name="smobileno" value={smobileno} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('smobileno') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('smobileno')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Parents Mob No</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Parents Mobile No" name="pmobileno" value={pmobileno} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('pmobileno') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('pmobileno')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Studying or Working</label>
              <div className="form-column">
                <input type="text" className="form-control" placeholder="Profession Type" name="professiontype" value={professiontype} onChange={this.handleChange} onBlur={this.handleBlur}></input>
                <div className={this.hasError('professiontype') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('professiontype')}
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Address</label>
              <div className="form-column">
                <textarea className="form-control" placeholder="Address" name="address" value={address} onChange={this.handleChange} onBlur={this.handleBlur}></textarea>
                <div className={this.hasError('address') ? 'error-message__visible' : 'error-message'}>
                  {this.displayError('address')}
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-primary w-25" disabled={!this.isFormInvalid()}> Add </button>
          </form>
        </div>
      </div>
    );
  }
};


export default AddUser
