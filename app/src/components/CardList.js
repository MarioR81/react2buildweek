import React, {useState, useEffect} from 'react';
// import data from './dummydata';
import Card from './IssueCard';
import UpdateForm from './UpdateForm';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { ContextData } from '../context/contextData';

const Cardlist = styled.div`
border: solid black 2px;
/* display: flex; */
flex-direction: column;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
text-decoration: none;
`;



export default function CardList (props) {
    
    const [cardData, setCardData]  = useState([]);
    const [refresh, setRefresh] = useState(false)
    
    
   
    
    const appRefresh = () => {
        setRefresh(!refresh)
    }
    
    useEffect(() => {
        
        axios
        .get('https://comake2.herokuapp.com/api/posts')
        .then(res => {
            console.log(res);
            setCardData(res.data);
        })
        .catch(err => console.log(err))
    }, [refresh]);
    
    return (
        <ContextData.Provider value={{cardData, setCardData, appRefresh,}} >
            <Cardlist>
                {/* <p>This box is the cardlist Landing Page!</p> */}

                    <Link to = '/'>
                    <button className='buttons'>Home</button>
                    </Link>

                    <Link to = '/'>
                    <button className='buttons' onClick = {() => {localStorage.clear()}}>Logout</button>
                    </Link>

                    <UpdateForm/>
                    <div className='landing'>

                {cardData.map((item, index) => (
                    <Card data = {item} key = {index}/>
                    ))}
                    </div>
            </Cardlist>
        </ContextData.Provider>
    )
    
}
// export const ContextData = createContext();