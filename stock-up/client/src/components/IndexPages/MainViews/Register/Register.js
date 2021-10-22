import React, { useState } from 'react'
import "./Register.css";
import { useHistory } from 'react-router-dom'

function Register() {
    //
    //const history = useHistory(); dont need this
    //declaring useState and initially initialize the empty string
    //created to store the user inputs 
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    //declaring the global variable, name value
    //refers key and value for the form 
    let name, value;
    //declaring a function that will target the user input
    //whatever change on the form will be handle by this function
    const handleInputs = (e) => {

        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });

    }
    //declaring a function that will post the user input
    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, password } = user;
        //it is a root for registeration
        const res = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password
            })
        });
        const data = await res.json();



        if (res.status === 422 || !data) {
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else {
            window.alert("Registration Successful");
        }
    }


    return (
        <div className="register-overlay" id="register">
            <div className="register-box" id="register-box">
                <div className=".register-box-c" id=".register-box-c">
                    <h1>Register</h1>
                    <form method="POST">
                        <p>Username</p>
                        <input
                            type="text"
                            name="name"
                            id="input_submit"
                            value={user.name}
                            onChange={handleInputs}
                            placeholder="Enter username"
                        />
                        <p>Email</p>
                        <input
                            type="email"
                            name="email"
                            id="input_submit"
                            value={user.email}
                            onChange={handleInputs}
                            placeholder="Enter email"
                        />
                        <p>Password</p>
                        <input
                            type="password"
                            id="input_submit"
                            name="password"
                            value={user.password}
                            onChange={handleInputs}
                            placeholder="Enter Password"
                        />
                        <input
                            type="submit"
                            value="Register"
                            onClick={PostData}
                        />
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Register