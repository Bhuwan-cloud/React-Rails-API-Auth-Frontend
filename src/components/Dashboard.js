import React from 'react'

const Dashboard = (props) => {
    return (
        <div>
            <h1> Hello This is Dashboard</h1>
            <h2> status:{props.loggedInStatus}</h2>
        </div>
    )
}

export default Dashboard
