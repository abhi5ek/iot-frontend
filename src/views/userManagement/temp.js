import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CCard,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CListGroup,
    CListGroupItem,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CModalBody,
    CForm,
    CFormInput,
    CButtonGroup,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell,
    CAlert
} from '@coreui/react';

// Import necessary Font Awesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
    const [visible, setVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        guideName: '',
        password: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:9006/api/user/');
            setUsers(response.data.data);
        } catch (error) {
            setError('Error fetching users');
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:9006/api/user/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            setError('Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    const handleAddUser = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:9006/api/user/register', formData);
            setFormVisible(false);
            resetFormData();
            fetchUsers(); // Re-fetch users after adding a new user
        } catch (error) {
            setError('Error adding user');
            console.error('Error adding user:', error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name || '',
            email: user.email || '',
            mobileNumber: user.mobileNumber || '',
            guideName: user.guideName || '',
            password: user.password || ''
        });
        setEditVisible(true);
    };

    const handleEditUser = async (event) => {
        event.preventDefault();
        const { _id } = selectedUser;
        try {
            await axios.put(`http://localhost:9006/api/user/${_id}`, formData);
            setEditVisible(false);
            resetFormData();
            fetchUsers(); // Fetch the latest data after updating
        } catch (error) {
            setError('Error updating user');
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'mobileNumber') {
            // Ensure mobile number contains only digits and is prefixed with +1
            const cleanedValue = value.replace(/\D/g, ''); // Remove all non-digit characters
            const prefixedValue = cleanedValue.startsWith('1') ? `+${cleanedValue}` : `+1${cleanedValue}`;
            setFormData({ ...formData, [id]: prefixedValue });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };


    const resetFormData = () => {
        setFormData({
            name: '',
            email: '',
            mobileNumber: '',
            guideName: '',
            password: ''
        });
    };

    return (
        <>
            {error && <CAlert color="danger">{error}</CAlert>}
            <CCard>
                <CCardHeader>
                    <CRow className="align-items-center">
                        <CCol>
                            <div style={{ fontSize: '1rem' }}>
                                User Management
                            </div>
                        </CCol>
                        {/* <CCol xs="auto" className="px-4">
                            <CButton color="primary" className="px-4" onClick={() => setFormVisible(true)}>Add User</CButton>
                        </CCol> */}
                    </CRow>
                </CCardHeader>

                <CTable responsive striped hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                            {/* {/ <CTableHeaderCell scope="col">Guide Name</CTableHeaderCell> /} */}
                            <CTableHeaderCell className="text-center" scope="col">Action</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {users.map((user, index) => (
                            <CTableRow key={user._id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{user.name || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{user.email || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{user.mobileNumber || 'null'}</CTableDataCell>
                                {/* {/ <CTableDataCell style={{ fontSize: '0.870rem' }}>{user.guideName || 'null'}</CTableDataCell> /} */}
                                <CTableDataCell className="text-center">
                                    {/* {/ <CButton className="me-1 p-1" onClick={() => handleEdit(user)}> <FontAwesomeIcon icon={faEdit} /></CButton> /} */}
                                    <CButton className="me-1 p-1" onClick={() => handleDelete(user._id)}><FontAwesomeIcon
                                        icon={faTrash}
                                        style={{ color: "#fd2b2b" }}
                                    /></CButton>
                                    <CButton className="p-1" onClick={() => { setSelectedUser(user); setVisible(true); }}><FontAwesomeIcon icon={faEye} /></CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCard>

            <CModal visible={formVisible} onClose={() => { setFormVisible(false); resetFormData(); }}>
                <CModalHeader closeButton>
                    <CModalTitle>Add User</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3" onSubmit={handleAddUser}>
                        <CCol md={6}>
                            <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="email" id="email" label="Email" value={formData.email} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CFormInput id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CButton color="primary" type="submit">Submit</CButton>
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => { setFormVisible(false); resetFormData(); }}>Close</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={editVisible} onClose={() => { setEditVisible(false); resetFormData(); }}>
                <CModalHeader closeButton>
                    <CModalTitle>Edit User</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3" onSubmit={handleEditUser}>
                        <CCol md={6}>
                            <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="email" id="email" label="Email" value={formData.email} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CFormInput id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput id="guideName" label="Guide Name" value={formData.guideName} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="password" id="password" label="Password" value={formData.password} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CButton color="primary" type="submit">Submit</CButton>
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => { setEditVisible(false); resetFormData(); }}>Close</CButton>
                </CModalFooter>
            </CModal>

            <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader onClose={() => setVisible(false)} closeButton>
                    <CModalTitle>User Details</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CListGroup>
                        <CListGroupItem><strong>Name:</strong> {selectedUser?.name}</CListGroupItem>
                        <CListGroupItem><strong>Email:</strong> {selectedUser?.email}</CListGroupItem>
                        <CListGroupItem><strong>Mobile Number:</strong> {selectedUser?.mobileNumber}</CListGroupItem>
                        {/* {/ <CListGroupItem><strong>Guide Name:</strong> {selectedUser?.guideName}</CListGroupItem> /} */}
                        {/* {/ <CListGroupItem>Password: {selectedUser?.password}</CListGroupItem> /} */}
                    </CListGroup>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>
        </>
    );
};

export default UserManagement;
