import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CForm,
  CFormInput,
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9006/api/user/');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleViewUser = async (user) => {
    try {
      const response = await axios.get(`http://localhost:9006/api/user/${user._id}`);
      setSelectedUser(response.data.data);
      setVisible(true);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9006/api/user/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9006/api/auth/register', formData);
      const newUser = response.data.user;
      setUsers([...users, newUser]);
      setFormVisible(false);
      setFormData({
        name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <>
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
              <CTableHeaderCell scope="col">S.NO</CTableHeaderCell>
              <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user, index) => (
              <CTableRow key={user._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{user.name || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{user.email || 'null'}</CTableDataCell>
                <CTableDataCell>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                    <CDropdownMenu>
                      {/* <CDropdownItem onClick={() => {  }}>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </CDropdownItem> */}
                      <CDropdownItem onClick={() => handleViewUser(user)}>
                        <FontAwesomeIcon icon={faEye} /> View
                      </CDropdownItem>
                      <CDropdownItem onClick={() => handleDelete(user._id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>

      <CModal visible={formVisible} onClose={() => setFormVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Add User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleAddUser}>
            <CCol md={6}>
              <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">Add</CButton>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setFormVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      {selectedUser && (
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader closeButton>
            <CModalTitle>View User</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p>Details for {selectedUser.name}.</p>
            <ul>
              <li>Name: {selectedUser.name}</li>
              <li>Email: {selectedUser.email}</li>
            </ul>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
};

export default UserManagement;
