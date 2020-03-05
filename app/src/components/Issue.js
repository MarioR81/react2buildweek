// import React, { useContext } from 'react';
// import { useHistory } from 'react-router-dom';

// import {ContextData} from './CardList';
// import IssueCard from './IssueCard'


// function Issue () {
//     console.log('context data', ContextData)

//     const value = useContext(ContextData);
//     console.log('value', value)

//     const history = useHistory();
//     const handleUpdate = e => {
//         e.preventDefault();
//         history.push(`/update-form/:id`);
//       };

//     return (
//     <>
//     <h1>Issue</h1>

//         <button onClick={handleUpdate}>Edit/Update</button>
//         <button>Delete/Resolve</button>
//     </>

//     )
// };

// export default Issue;