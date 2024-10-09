import React, { useState } from 'react';
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
    CFormSelect,
    CFormCheck
} from '@coreui/react';

const CommunicationSupport = () => {

    const [outfitters, setOutfitters] = useState([
        { id: 1, name: 'Jacob', company: 'Thornton', place: '@Otto', contact: '35468859085', verified: false },
        { id: 2, name: 'Jacob', company: 'Thornton', place: '@Otto', contact: '475675629857', verified: false },
        { id: 3, name: 'Jacob', company: 'Thornton', place: '@Otto', contact: '46587687', verified: false },
    ]);

    const [users, setusers] = useState([
        { id: 1, name: 'Jacob', company: 'Thornton', place: 'Europe', contact: '8976563537', verified: false },
        { id: 2, name: 'Jack', company: 'Microsoft', place: 'United Kingdom', contact: '9976867384', verified: false },
        { id: 3, name: 'Maria', company: 'Apple', place: 'USA', contact: '9976867784', verified: false },
    ]);

    return(
        <>
             <CCard>
                <CCardHeader>
                    <CRow>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <CCol>
                                    Contacts Detail
                                </CCol>
                            </div>
                            <div className='px-4'>
                                <CCol>
                                    <CButton color="primary"  className='px-4' onClick={() => setFormVisible(true)}>Emergency Reponse</CButton>
                                </CCol>
                            </div>
                        </div>
                    </CRow>
                </CCardHeader>
                <CListGroup flush>
                    <CListGroupItem>
                        <CCardText>
                            <CRow xs={{ gutterX: 2 }}>
                                <CCol><div className="p-3 fw-semibold">#</div></CCol>
                                <CCol><div className="p-3 fw-bolder">Patient Name</div></CCol>
                                <CCol><div className="p-3 fw-bolder">Contact Number</div></CCol>
                                <CCol><div className="p-3 fw-bolder">Action</div></CCol>
                            </CRow>
                        </CCardText>
                    </CListGroupItem>
                    {outfitters.map(outfitter => (
                        <CListGroupItem key={outfitter.id}>
                            <CCardText>
                                <CRow xs={{ gutterX: 2 }}>
                                    <CCol><div className="p-3">{outfitter.id}</div></CCol>
                                    <CCol><div className="p-3 px-1">{outfitter.name}</div></CCol>
                                    <CCol><div className="p-3">{outfitter.contact}</div></CCol>
                                    <CCol>
                                        <div className="p-3">
                                            <CButton color="warning" className='p-1' style={{marginRight: '5px'}}>📞</CButton>
                                            <CButton color="info" className='p-1'>✉</CButton>  
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardText>
                        </CListGroupItem>
                    ))}
                </CListGroup>
            </CCard>


            <CCard className='my-4'>
                <CCardHeader>
                    <CRow>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <CCol>
                                    User Support
                                </CCol>
                            </div>
                            <div className='px-4'>
                                <CCol>
                                    <CButton color="primary"  className='px-4' onClick={() => setFormVisible(true)}>Emergency Reponse</CButton>
                                </CCol>
                            </div>
                        </div>
                    </CRow>
                </CCardHeader>
                <CListGroup flush>
                    <CListGroupItem>
                        <CCardText>
                            <CRow xs={{ gutterX: 2 }}>
                                <CCol><div className="p-3 fw-semibold">#</div></CCol>
                                <CCol><div className="p-3 fw-bolder">Patient Name</div></CCol>
                                <CCol><div className="p-3 fw-bolder">Contact Number</div></CCol>
                                <CCol><div className="p-3 fw-bolder">Action</div></CCol>
                            </CRow>
                        </CCardText>
                    </CListGroupItem>
                    {users.map(user => (
                        <CListGroupItem key={user.id}>
                            <CCardText>
                                <CRow xs={{ gutterX: 2 }}>
                                    <CCol><div className="p-3">{user.id}</div></CCol>
                                    <CCol><div className="p-3 px-1">{user.name}</div></CCol>
                                    <CCol><div className="p-3">{user.contact}</div></CCol>
                                    <CCol>
                                        <div className="p-3">
                                        <CButton color="warning" className='p-1' style={{marginRight: '5px'}}>📞</CButton>
                                            <CButton color="info" className='p-1'>✉</CButton>  
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardText>
                        </CListGroupItem>
                    ))}
                </CListGroup>
            </CCard>
        </>
    )
}
export default CommunicationSupport;