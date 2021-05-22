import React, {useEffect, useState} from 'react'
import axios from 'axios';

function Stocks() {
    const [users, setUsers] = useState([]);
    // useEffect(() => {
    //     axios.get('/api/users').then((res) => {
    //         setUsers((pstate) => { return res.data.users });
    //         setUsers(res.data);
    //         console.log(res);
    //     });
    // },[])
    return (
        <div>
            <h1>stocks</h1>
        </div>
    )
}

export default Stocks
