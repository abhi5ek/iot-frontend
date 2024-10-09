import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CButton,
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
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons';

const PatientManagement = () => {
  const [view, setView] = useState(false);
  const [pdfPreviewVisible, setPdfPreviewVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null); // To store the URL for PDF preview
  const [patients, setPatients] = useState([]);
  const [pdfData, setPdfData] = useState([]);

  // Fetch patients data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:9006/api/patient/');
        const patientData = response.data.data;

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
      } catch (error) {
        console.error('Error fetching patients', error);
      }
    };
    fetchPatients();
  }, []);

  const handleViewPatient = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9006/api/measures/data/${id}`);
      const myData = response.data.data;
      setPdfData(myData);
      setView(true);
    } catch (error) {
      console.error('Error fetching patient or user details:', error);
    }
  };

  const generatePdfForPreview = async (userId, date) => {
    try {
      const response = await axios.post(
        'http://localhost:9006/api/patient/generate-pdf',
        { userId, date },
        { responseType: 'blob' } // Receive response as a Blob
      );
  
      if (response.data instanceof Blob) {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfBlobUrl = URL.createObjectURL(pdfBlob);
        
        // Open the PDF in a new tab
        window.open(pdfBlobUrl, '_blank');
      } else {
        console.error('Response data is not a blob.');
      }
    } catch (error) {
      console.error('Error generating PDF for preview:', error);
    }
  };
  

  const downloadPdf = async (userId, date) => {
    try {
      const response = await axios.post(
        'http://localhost:9006/api/patient/generate-pdf',
        { userId, date },
        { responseType: 'blob' }
      );

      if (response.data instanceof Blob) {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `Report-${userId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      } else {
        console.error('Response data is not a blob.');
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow className="align-items-center">
            <CCol>
              <div style={{ fontSize: '1rem' }}>Report Management</div>
            </CCol>
          </CRow>
        </CCardHeader>

        <CTable responsive striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Doctor</CTableHeaderCell>
              <CTableHeaderCell scope="col">Patient</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {patients.map((patient, index) => (
              <CTableRow key={patient._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{patient.addedByName || 'null'}</CTableDataCell>
                <CTableDataCell>{patient.firstname + ' ' + patient.lastname || 'null'}</CTableDataCell>
                <CTableDataCell>
                  <CButton onClick={() => handleViewPatient(patient.userId)}>
                    <FontAwesomeIcon icon={faEye} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>

      <CModal size='lg' visible={view} onClose={() => setView(false)}>
        <CModalHeader>
          <CRow className="w-100">
            <CCol xs={12} md={6} className="d-flex align-items-center justify-content-start">
              <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>Report Data</div>
            </CCol>
          </CRow>
        </CModalHeader>
        <CModalBody>
          <div className="table-responsive">
            <table className="table table-success table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="text-center align-middle">#</th>
                  <th scope="col" className="text-center align-middle">Date</th>
                  <th scope="col" className="text-center align-middle">Download</th>
                  <th scope="col" className="text-center align-middle">Preview</th>
                </tr>
              </thead>
              <tbody>
                {pdfData.map((work, index) => (
                  <tr key={work._id}>
                    <th scope="row" className="text-center align-middle">{index + 1}</th>
                    <td className="text-center align-middle">
                      {new Date(work.date).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </td>
                    <td className="text-center align-middle">
                      <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => downloadPdf(work.userId, work.date)}>
                        <FontAwesomeIcon icon={faDownload} style={{ color: 'black' }} />
                      </button>
                    </td>
                    <td className="text-center align-middle">
                      <button style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => generatePdfForPreview(work.userId, work.date)}>
                        <FontAwesomeIcon icon={faEye} style={{ color: 'black' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setView(false)}>Close</CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={pdfPreviewVisible} onClose={() => setPdfPreviewVisible(false)} size="xl">
        <CModalHeader closeButton>
          <CModalTitle>PDF Preview</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              style={{ width: '100%', height: '500px' }}
              frameBorder="0"
            ></iframe>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setPdfPreviewVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default PatientManagement;
