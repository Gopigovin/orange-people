import React from "react";

class Logout extends React.Component {
    constructor(props){
   
        super(props);  
    }
    loginPage = () => {
        this.props.history.push("/login")
    }

    render() {
        return (
            <div id="results" className="App">
                <span>You are Logged Out</span>                
                <button  className="btn btn-outline-primary float-right btn-sm m-1" onClick={this.loginPage}>Login Again</button>                    
            </div>
        );
    }
};


export default Logout