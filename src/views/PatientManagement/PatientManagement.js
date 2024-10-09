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

const PatientManagement = () => {
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    SSN: '',
    DOB: '',
    addedBy: '',
  });

  // console.log("selectedPatient", selectedPatient)
  // Fetch all patients and their associated user details
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:9006/api/patient/');
        const patientData = response.data.data;

        // For each patient, fetch user details based on userId
        const updatedPatients = await Promise.all(
          patientData.map(async (patient) => {
            if (patient.userId) {
              try {
                const userResponse = await axios.get(`http://localhost:9006/api/user/${patient.userId}`);
                const userData = userResponse.data.data;
                return { ...patient, addedByName: userData.name };
              } catch (error) {
                console.error(`Error fetching user data for userId ${patient.userId}:`, error);
              }
            }
            return patient;
          })
        );

        setPatients(updatedPatients);
        // console.log("setPatients", patients);
        
      } catch (error) {
        console.error('Error fetching patients', error);
      }
    };
    fetchPatients();
  }, []);

  const handleViewPatient = async (patient) => {
    try {
      const response = await axios.get(`http://localhost:9006/api/patient/getPatients/${patient.userId}`);
      const patientsArray = response.data.data; 
  
      // Find the patient you want to view
      const selectedPatient = patientsArray.find(p => p.userId === patient.userId);
  
      if (selectedPatient) {
        setSelectedPatient(selectedPatient);  // Set patient details
  
        // Now fetch the user details using userId
        const userResponse = await axios.get(`http://localhost:9006/api/user/${patient.userId}`);
        const userDetail = userResponse.data.data;
        const userName = userDetail.name;
        // console.log("userName", userName);
        
        // Update the selectedPatient with the userName
        setSelectedPatient(prevState => ({
          ...prevState,
          addedByName: userName // Store the fetched name
        }));
  
        // console.log("setSelectedPatient with user name", selectedPatient);
        
        setVisible(true);  // Show modal
      } else {
        console.log('Patient not found in the array');
      }
  
    } catch (error) {
      console.error('Error fetching patient or user details:', error);
    }
  };
  
  
  

  const handleAddPatient = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9006/api/auth/register', formData);
      const newPatient = response.data.patient;
      setPatients([...patients, newPatient]);
      setFormVisible(false);
      setFormData({
        name: '',
        SSN: '',
        DOB: '',
        addedBy: '',
      });
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // console.log("selectedPatient", selectedPatient)


  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow className="align-items-center">
            <CCol>
              <div style={{ fontSize: '1rem' }}>Patient Management</div>
            </CCol>
          </CRow>
        </CCardHeader>

        <CTable responsive striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">SSN</CTableHeaderCell>
              <CTableHeaderCell scope="col">DOB</CTableHeaderCell>
              <CTableHeaderCell scope="col">Added by</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {patients.map((patient, index) => (
              <CTableRow key={patient._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  {patient.firstname + ' ' + patient.lastname || 'null'}
                </CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>{patient.SSN || 'null'}</CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  {new Date(patient.DOB).toLocaleDateString() || 'null'}
                </CTableDataCell>
                <CTableDataCell style={{ fontSize: '0.870rem' }}>
                  {patient.addedByName || 'null'}
                </CTableDataCell>
                <CTableDataCell>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => handleViewPatient(patient)}>
                        <FontAwesomeIcon icon={faEye} /> View
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
          <CModalTitle>Add Patient</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3" onSubmit={handleAddPatient}>
            <CCol md={6}>
              <CFormInput type="text" id="name" label="Name" value={formData.firstname} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="SSN" label="Email" value={formData.SSN} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="DOB" label="DOB" value={formData.DOB} onChange={handleChange} />
            </CCol>
            <CCol md={6}>
              <CFormInput type="text" id="addedBy" label="Added by" value={formData.addedBy} onChange={handleChange} />
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
      {selectedPatient && (
  <CModal visible={visible} onClose={() => setVisible(false)}>
    <CModalHeader closeButton>
      <CModalTitle>View Patient</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <p>Details for {selectedPatient.firstname || 'N/A'} {selectedPatient.lastname || ''}.</p>
      <ul>
        <li><strong>Name:</strong> {selectedPatient.firstname || 'N/A'} {selectedPatient.lastname || ''}</li>
        <li><strong>SSN:</strong> {selectedPatient.SSN || 'N/A'}</li>
        <li>
          <strong>DOB:</strong> 
          {selectedPatient.DOB ? new Date(selectedPatient.DOB).toLocaleDateString() : 'N/A'}
        </li>
        <li><strong>Added By:</strong> {selectedPatient.addedByName ? selectedPatient.addedByName : 'N/A'}</li>
      </ul>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" onClick={() => setVisible(false)}>
        Close
      </CButton>
    </CModalFooter>
  </CModal>
)}

    </>
  );
};

export default PatientManagement;
