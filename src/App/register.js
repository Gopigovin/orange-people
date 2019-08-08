import React from 'react';
class Register extends React.Component {
  onInputChange = () => {

  }
  render() {
    return (
      <div>
        <h1>Resiter page</h1>
        <input type="text" className="form-control" placeholder="Search..." value="Search..." onChange={this.onInputChange}></input>
      </div>)
  }
}
export default Register