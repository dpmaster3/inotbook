import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import PasswordChecklist from "react-password-checklist"

const Signup = (props) => {
  const {showAlert}=props
  const host = "http://localhost:5000";
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" });
  
  let history= useHistory()

  const handle = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      history.push("/")
      showAlert("Account Created","success")
    }
    else{
      
      showAlert(`Invalid ${json.errors[0].path}`,"danger")
      
    }
  };
  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container">
      <h2>Create Account</h2>
    <form onSubmit={handle}>
    <div className="mb-3">
          <label htmlFor="name" className="form-label">
           Enter Name
          </label>
          <input
            value={credentials.name}
            name="name"
            onChange={onChange}
            type="name"
            className="form-control"
            id="name"
            aria-describedby="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
           Enter your Email address
          </label>
          <input
            value={credentials.email}
            name="email"
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
           Create Password
          </label>
          <input
            name="password"
            value={credentials.password}
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <PasswordChecklist
				rules={["minLength","specialChar","number","capital"]}
				minLength={5}
				value={credentials.password}
				onChange={(isValid) => {}}
			/>

        <button disabled={credentials.name.length<1} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
