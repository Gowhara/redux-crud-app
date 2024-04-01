import React, { useState, useEffect } from 'react';
import { editUser } from '../helpers/redaux/user_actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast'; // Step 1: Import the Toast component

const EditUser = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [showToast, setShowToast] = useState(false); // State to control when to show the toast
    const navigate = useNavigate();

    useEffect(() => {
        if (props.userid) {
            const userData = props.users.find(user => user.id === props.userid);
            if (userData) {
                setName(userData.name);
                setEmail(userData.email);
            }
        }
    }, [props.userid, props.users]);

  
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.editUser(props.userid, { name, email });
        setModalIsOpen(false);
        setShowToast(true); 
        props.onCancelEdit();
    };
    console.log(showToast);

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <div className="modal-header justify-content-between align-items-center">
                <h1 className='m-2'>Edit Form</h1>
            </div>
            <div className='container-fluid'>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">ID</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName" value={props.userid} readOnly disabled />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" value={email} onChange={handleEmailChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName" value={name} onChange={handleNameChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary col-sm-5 col-md-5 col-lg-4 col-xl-3  m-3 mx-xl-auto mx-lg-auto  mx-md-auto ms-sm-auto d-block   ">Save</button>
                </form>
            </div>
            {showToast && <Toast msg={"User edited successfully"} />} 
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.users
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUser: (id, userData) => dispatch(editUser(id, userData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
