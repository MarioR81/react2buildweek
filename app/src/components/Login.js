import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios'; 
import styled from 'styled-components';

const Form = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Flexdiv = styled.div`
display: flex;
flex-direction: column;
`;


const Button = styled.button`
width: 10%;
margin: 2%;
`;


const Login = (props) => {

    const useform = useForm(props);
    console.log('useform objects = ', useform);
    const onSubmit = (values) => {
        console.log('onSubmit values', values);
        axios
        .post('https://comake2.herokuapp.com/api/auth/login', values).then(res => {
            if (res.data) {
                // console.log('response from posting', res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user_id', res.data.user_id);
                window.location.href = '/dash';
            } else {
                alert('login failed');
            }
        }).catch(err => console.log(err))
        
    }

    const onRegister = (values) => {
        console.log('onRegister values', values);
        axios
        .post('https://comake2.herokuapp.com/api/auth/register', values).then(res => {
            if (res.data) {
                // console.log('response from posting', res.data);
                onSubmit(values);
            } else {
                alert('login failed');
            }
        }).catch(err => console.log(err))
        
    }


    return (

        <Form onSubmit = {useform.handleSubmit(onSubmit)}>

            <p>Login</p>

            <Flexdiv>
                <label htmlFor = 'username'>Username</label>
                <input htmlFor = 'username' name = 'username' ref = {useform.register({ required: true })} />
                {useform.errors.username && <p className='loginError'>Username is required!</p>}
            </Flexdiv>

            <Flexdiv>
                <label htmlFor = 'password'>Password</label>
                <input htmlFor = 'password' name = 'password' ref = {useform.register({ required: true })} type = 'password'/>
                {useform.errors.password && <p className='loginError'>Password is required!</p>}
            </Flexdiv>

            <Button type = 'submit'>Login</Button>
            <Button onClick = {useform.handleSubmit(onRegister)} >Register</Button>

        </Form>

    )

}

export default Login;

/*

*/