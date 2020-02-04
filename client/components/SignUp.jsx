import React from 'react';

// this component could be used to show more information and allow for users to signup

const SignUp = (props) => (
  <div className="signupPage">
    <form className="signupForm" onSubmit={(event) => { props.handleSignup(event); }}>
      <label>
        Create Username:
        <input name="username" type="text" />
      </label>
      <label>
        Create Password:
        <input name="password" type="password" />
      </label>
      <label>
        Email:
        <input name="email" type="text" />
      </label>
      <label>
        City:
        <input name="city" type="text" />
      </label>
      <label>
        State:
        <input name="state" type="text" />
      </label>
      <input className="btn btn-outline-light btn-sm" type="submit" value="Submit" />
    </form>
    {/* <input className="btn btn-outline-light btn-sm" type="button" value="Login Page" onClick={props.switchLogin}></input> */}
  </div>
);

export default SignUp;
