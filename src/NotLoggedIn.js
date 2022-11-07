import React, { useState } from 'react';
import './css/notLoggedIn.css';
import Container from '@material-ui/core/Container';
import logo from './logo.png';
import { Button, Input } from '@material-ui/core';
import { auth } from './firebase';

function NotLoggedIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogIn = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

  }

    return (
        <Container  className='not-logged-in-main'>
            <form className='not-logged-in-form'>
               <center>
                    <img 
                        src={logo}
                        alt="brand logo"
                        className='not-logged-in-image'  
                    />
                </center>
                <Input className='not-logged-in-input'
                    placeholder='email'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disableUnderline={true}  
                />
                <Input className='not-logged-in-input'
                    placeholder='password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disableUnderline={true}
                    style={{marginBottom: '0%'}}
                />
                <br/>
                {/* <Button onClick={handleLogIn} type='submit' className='not-logged-in-button p-3 mb-2 bg-primary text-white'>Log In</Button>  */}
                <button
                    onClick={handleLogIn}
                    type='submit' 
                    class="btn btn-primary not-logged-in-button"
                > Log In </button>
            </form>
            
        </Container>
    )
}

export default NotLoggedIn
