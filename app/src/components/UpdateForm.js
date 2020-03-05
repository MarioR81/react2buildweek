import React,{ useState, useContext } from 'react';
import { ContextData } from '../context/contextData';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const UpdateForm = () => {
   const { appRefresh } = useContext(ContextData)


const [data, setData] = useState({
    title: '',
    desc: '',
    city: '',
    state: '',
    zipcode: '',
    creator_id: localStorage.getItem('user_id'),
    resolved: false,
    upvotes: 1,
    downvotes: 0,
})

const submitIssue = event => {
    event.preventDefault()
    // console.log('submit button', data)
    axiosWithAuth()
    .post('/api/posts', data)
    .then(res => console.log('update form axios', res))
    //set data to context
    //redirect user to card list
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
    console.log('change handler', data)
}
    
    return (
        <>
        <h2>Create New Issue</h2>
        <form onSubmit={submitIssue}>
        <label>Card title:</label><br/>
                <input
                    type='text'
                    name='title'
                    placeholder='Issue Title'
                    value={data.title}
                    onChange={changeHandler}
                /><br/>

                <label>Description:</label><br/>
                <input
                    type='text'
                    name='desc'
                    placeholder='Issue Description'
                    value={data.desc}
                    onChange={changeHandler}
                /><br/>

                <label>City:</label><br/>
                <input
                    type='text'
                    name='city'
                    placeholder='City'
                    value={data.city}
                    onChange={changeHandler}
                /><br/>

                <label>State:</label><br/>
                <input
                    type='text'
                    name='state'
                    placeholder='State'
                    value={data.state}
                    onChange={changeHandler}
                /><br/>

                <label>Zip Code:</label><br/>
                <input
                    type='text'
                    name='zipcode'
                    placeholder='State'
                    value={data.zipcode}
                    onChange={changeHandler}
                /><br/>

                <button className='buttons' >Submit Issue</button>
        </form>
        </>
    )
};

export default UpdateForm;