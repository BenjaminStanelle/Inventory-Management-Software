import React, {useState} from 'react'

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({userName:"", password: ""});
    const submitHandler = e => {
        e.preventDedault();
        Login(details);
    }
    return(
        <form onSubmit={submitHandler}>
            <div className = "form-inner">
                <h2>Login</h2>
                {(error != "") ? (<div className ="error">{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="userName">User Name</label> 
                    <input type="text" name="userName" id="userName" onChange={e => setDetails({...details, userName: e.target.value})} value ={details.userName}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label> 
                    <input type="text" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value ={details.password}/>
                </div>
                <input type="submit" value="LOGIN"/>
            </div>
        </form>
    )
}

export default LoginForm