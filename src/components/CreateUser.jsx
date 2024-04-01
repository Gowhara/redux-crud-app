import React, { useState } from 'react';
import { addUser } from '../helpers/redaux/user_actions';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const CreateUser = (props) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const navigate = useNavigate();
    const randomId = () => {
        const randomNumber = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        return randomNumber;
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim()) {
            document.getElementById('inputName').classList.add('is-invalid');
            document.getElementById('inputEmail3').classList.add('is-invalid');
            return;
        }

        const generatedId = randomId();
        setId(generatedId);
        props.addUser({ id: generatedId, name, email });
        setModalIsOpen(false);
        navigate("/");
        return true;
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        document.getElementById('inputName').classList.remove('is-invalid');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        document.getElementById('inputEmail3').classList.remove('is-invalid');
    };

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <div className="modal-header justify-content-between align-items-center">
                <h1 className='m-2'>Create User Form</h1>
                <button type="button" className="close btn btn-outline-dark" aria-label="Close" onClick={handleModalClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className='container-fluid'>
                <form className='needs-validation' noValidate onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" value={email} onChange={handleEmailChange} required />
                            <div className="invalid-feedback">
                                Email cannot be empty.
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName" value={name} onChange={handleNameChange} required />
                            <div className="invalid-feedback">
                                Name cannot be empty.
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary col-sm-5 col-md-5 col-lg-4 col-xl-3 m-3 mx-xl-auto mx-lg-auto mx-md-auto ms-sm-auto d-block">Save</button>
                </form>
            </div>
            {<Toast msg={"user created successfully"}/>}
        </Modal>
        
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUser: (userData) => dispatch(addUser(userData))
    };
};

export default connect(null, mapDispatchToProps)(CreateUser);
