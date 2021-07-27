import React from 'react';
import Modal from "react-modal";
import AddUserForm from "./AddUserForm";

const AddUser:React.FC<{count:string,limit:number}> = props => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            height: '625px',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
    }

    return (
        <div>

            <div className="row center pxT">
                <div className="col s12"> <label> <a onClick={openModal} className="waves-effect waves-light btn-large"><i className="material-icons left">account_circle</i>Add User</a></label></div>
                <div className="col s12"><h6>Total Users:{props.count}</h6></div>
                <div className="col s12"><h6>Users per page:{props.limit.toString()}</h6></div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <a onClick={closeModal} className="waves-effect waves-light btn right"><i className="material-icons right">close</i>Close</a>
                <AddUserForm close={closeModal}/>
            </Modal>
        </div>
    );
};

export default AddUser;