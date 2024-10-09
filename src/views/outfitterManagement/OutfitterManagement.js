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
    CCardText,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalFooter,
    CModalBody,
    CForm,
    CFormInput,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CTable,
    CTableHead,
    CTableRow,
    CTableHeaderCell,
    CTableBody,
    CTableDataCell
} from '@coreui/react';
import { cilDisabled } from '@coreui/icons';

const OutfitterManagement = () => {
    const [visible, setVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [selectedOutfitter, setSelectedOutfitter] = useState(null);
    const [outfitters, setOutfitters] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        description: '',
        area: '',
        location: '',
        animalCategory: ''
    });

    useEffect(() => {
        const fetchOutfitters = async () => {
            try {
                const response = await axios.get('http://13.202.114.74:3002/api/outfitter/getAll');
                setOutfitters(response.data.data);
            } catch (error) {
                console.error('Error fetching outfitters:', error);
            }
        };

        fetchOutfitters();
    }, []);

    const handleVerify = (id) => {
        setOutfitters(outfitters.map(outfitter =>
            outfitter._id === id ? { ...outfitter, verified: true } : outfitter
        ));
        setVisible(false);
    };

    const handleDelete = (id) => {
        setOutfitters(outfitters.filter(outfitter => outfitter._id !== id));
    };

    const handleAddOutfitter = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://13.202.114.74:3002/api/outfitter/create', formData);
            const newOutfitter = response.data.outfitter;
            setOutfitters([...outfitters, newOutfitter]);
            setFormVisible(false);
            setFormData({
                name: '',
                email: '',
                mobileNumber: '',
                description: '',
                area: '',
                location: '',
                animalCategory: ''
            });
        } catch (error) {
            console.error('Error adding outfitter:', error);
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
                                Outfitter Management
                            </div>
                        </CCol>
                        <CCol xs="auto" className="px-4">
                            <CButton color="primary" className="px-4" onClick={() => setFormVisible(true)}>Add Outfitters</CButton>
                        </CCol>
                    </CRow>
                </CCardHeader>

                <CTable responsive striped hover>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Outfitter Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Mobile Number</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Area</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Animal Category</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Verification</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {outfitters.map((outfitter, index) => (
                            <CTableRow key={outfitter._id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.name || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.outfitterName || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.email || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.mobileNumber || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.area || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.location || 'null'}</CTableDataCell>
                                <CTableDataCell style={{ fontSize: '0.870rem' }}>{outfitter.animalCategory || 'null'}</CTableDataCell>
                                <CTableDataCell>
                                    <CDropdown>
                                        <CDropdownToggle color="secondary">Actions</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem onClick={() => { /* Add edit functionality */ }}>✏ Edit</CDropdownItem>
                                            <CDropdownItem onClick={() => handleDelete(outfitter._id)}>🗑 Delete</CDropdownItem>
                                            <CDropdownItem onClick={() => { setSelectedOutfitter(outfitter); setVisible(true); }}>👁‍🗨 View</CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                </CTableDataCell>
                                <CTableDataCell>
                                    {outfitter.verified ? '✅' : '❌'}
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </CCard>


            <CModal visible={formVisible} onClose={() => setFormVisible(false)}>
                <CModalHeader closeButton>
                    <CModalTitle>Add Outfitter</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm className="row g-3" onSubmit={handleAddOutfitter}>
                        <CCol md={6}>
                            <CFormInput type="text" id="name" label="Name" value={formData.name} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput type="text" id="email" label="Email" value={formData.email} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CFormInput id="mobileNumber" label="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput id="area" label="Area" value={formData.area} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput id="location" label="Location" value={formData.location} onChange={handleChange} />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput id="animalCategory" label="Animal Category" value={formData.animalCategory} onChange={handleChange} />
                        </CCol>
                        <CCol xs={12}>
                            <CButton color="primary" type="submit" >Add</CButton>
                        </CCol>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setFormVisible(false)}>Close</CButton>
                </CModalFooter>
            </CModal>

            {selectedOutfitter && (
                <CModal visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader closeButton>
                        <CModalTitle>Verification</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <p>Verify {selectedOutfitter.name}'s documents.</p>
                        <CForm className="row g-3">
                            <CCol xs={12}>
                                <CFormInput type="file" id="verificationFile" label="Upload Verification Document" />
                            </CCol>
                        </CForm>
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>Close</CButton>
                        <CButton color="info" onClick={() => handleVerify(selectedOutfitter._id)}>Verify</CButton>
                    </CModalFooter>
                </CModal>
            )}
        </>
    );
};

export default OutfitterManagement;