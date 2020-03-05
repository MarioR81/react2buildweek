import React, { useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { ContextData } from '../context/contextData';
import styled from 'styled-components';

const Card = styled.div`
border: solid black 1px;
width: 40%;
padding: 20px;
margin-bottom: 5px;
`;

export default function IssueCard (props) {
// console.log(props)
const [isUser, setIsUser] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [data, setData] = useState({
    title: props.data.title,
    desc: props.data.desc,
    resolved: props.data.resolved,
    zipcode: "37813",
    city: "Morristown",
    state: "TN"
});
const { appRefresh } = useContext(ContextData)

useEffect(() => {
// console.log(data)
}, [data])




useEffect(() => {
    if (props.data.creator_id == localStorage.getItem('user_id')){
        // console.log('able to edit or delete')
        setIsUser(true);
    } else {
        // console.log('NOT able to edit or delete')
    }
}, [])


const editCard = () => {
    setIsEditing(!isEditing);
}

// console.log('edit', data.id)

const saveEdit = event => {
    event.preventDefault();
    
    console.log(data)
    const token = localStorage.getItem('token')
    axiosWithAuth()
    .put(`/api/posts/${props.data.id}`, data)
    .then(res => {
        console.log('put issue card', res.data)
        editCard()
    })
    .catch(err => console.log(err))
    .finally(()=>{
        appRefresh()
    })

}


const changeHandler = event => {
    setData({
        ...data,
        [event.target.name]: event.target.value
    })
    console.log('change handler', event.target)
    appRefresh()
}

const deleteHandler = event => {
    event.preventDefault();
    axiosWithAuth()
    .delete(`/api/posts/${props.data.id}`)
    .then(res => {
        // console.log('axios delete',res)
        alert(res.data.message)
    })
    .catch(err => console.log(err))
    .finally(()=>{
        appRefresh()
    })
}

    return (
        <Card>
            {isEditing ? (
            <>
            <form>
                <label>Card title:</label><br/>
                <input
                    type='text'
                    name='title'
                    style={{ width: "70%", height: '17px' }}
                    value={data.title}
                    onChange={event => changeHandler(event)}
                /><br/>

                <label>Description:</label><br/>
                <input
                    type='text'
                    name='desc'
                    style={{ width: "70%", height: '17px' }}
                    value={data.desc}
                    onChange={event => changeHandler(event)}
                /><br/>

                <label>Issue Status:</label><br/>
                <button onClick={(event)=>{
                    event.preventDefault();
                    setData({
                        ...data,
                        'resolved': !data.resolved
                    })
                }}>{data.resolved ? ('Issue Resolved') : ('Not Resolved')}</button>
                <button onClick={saveEdit} type='submit'>Submit Edit</button>

            </form>
            </>

            ) : 
            (<>
            <h3>Card title: {props.data.title}</h3>
            <p>Description: {props.data.desc}</p>
            <p>Upvotes: {props.data.upvotes}/Downvotes: {props.data.downvotes}</p>
            <p>Issue Status: {props.data.resolved}</p>
            <p>Created by: {props.data.creator_name}</p>
            <p>Created on: {props.data.created_at}</p>
            </>)}
            {isUser && (<><button onClick={()=>{editCard()}} >
                {isEditing ? ('Cancel Edit') : ('Edit')}
            </button>
            <button onClick={event => deleteHandler(event)}>Delete</button></>)}
        </Card>
    );
};