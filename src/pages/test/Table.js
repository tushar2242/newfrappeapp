import React from 'react';

const Table = () => {
    const users = [
        { name: 'Olivia Rhye', username: '@olivia', status: 'Active', role: 'Product Designer', email: 'olivia@untitledui.com', teams: ['Design', 'Product', 'Marketing'] },
        
    ];

    return (
        <div className="App">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Email address</th>
                        <th>Teams</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.name} <span className="username">{user.username}</span></td>
                            <td>{user.status}</td>
                            <td>{user.role}</td>
                            <td>{user.email}</td>
                            <td>
                                {user.teams.map(team => <span className="team">{team}</span>)}
                                {/* If there are more than 3 teams, you can add +x */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
