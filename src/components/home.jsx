import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { deleteUser, get_all_users } from '../helpers/redaux/user_actions';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditUser from './EditUser';
import './home.css';

const Home = (props) => {
    const [editUserId, setEditUserId] = useState(null); 

    useEffect(() => {
        props.get_all_users();
    }, []); 

    const handleEditClick = (userId) => {
        setEditUserId(userId);
    };

    const handleCancelEdit = () => {
        setEditUserId(null);
    };
   

    return (
        
        <div className='container '>
             {props.loading ? (<h1>loading......</h1>):( <React.Fragment>
            <h1>Crud App with local data</h1>
            <Link to="/create-user" className="btn btn-success my-3">Create +</Link>
           <div className='table-responsive'>
            <table className='table '>
                <thead className=''>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => props.deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                <button onClick={() => handleEditClick(user.id)} className="btn btn-primary ms-2">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {editUserId && <EditUser userid={editUserId} onCancelEdit={handleCancelEdit} />}
            </React.Fragment>) }
        </div>
        
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        loading:state.loading
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (id) => dispatch(deleteUser(id)),
        get_all_users: () => dispatch(get_all_users()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
