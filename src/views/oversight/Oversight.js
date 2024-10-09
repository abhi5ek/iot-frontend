import React from 'react';


import {
    CToaster,
    CToast,
    CToastBody,
    CTabContent,
    CToastHeader,
    CBadge,
    CCardHeader,
    CCard,
    CRow,
    CCol
} from '@coreui/react';
const Oversight = () => {
    return (
        <>
            <CCard>
                <CCardHeader>
                    <CRow>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <CCol>
                                    <h5 className='px-2'>Log Activity</h5>
                                </CCol>
                            </div>
                            {/* Not Needed Button becoz there is no such function */}
                            {/* <div className='px-4'>
                                <CCol>
                                    <CButton color="primary" className='px-4' onClick={() => setFormVisible(true)}>Add Outfitters</CButton>
                                </CCol>
                            </div> */}
                        </div>
                    </CRow>
                </CCardHeader>

                <CToaster className="position-static p-3">
                    <CToast autohide={false} visible={true} style={{ width: '80vw' }}>
                        <CToastHeader closeButton>
                            {/* it is for styling purpose, not needed */}
                            {/* <svg
                            className="rounded me-2"
                            width="20"
                            height="20"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                            role="img"
                        >
                            <rect width="100%" height="100%" fill="#007aff"></rect>
                        </svg> */}
                            <div className="fw-bold me-auto"> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="info">User</CBadge></h5>Hello, world! This is a toast message. </div>
                            <small>7 min ago</small>
                        </CToastHeader>
                        
                        {/* No Body required by the time */}
                        {/* <div>
                            <CToastBody> </CToastBody>
                        </div> */}

                    </CToast>
                    <CToast autohide={false} visible={true} style={{ width: '80vw' }}>
                        <CToastHeader closeButton>
                        <div className="fw-bold me-auto"> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="danger">Outfitter</CBadge></h5>Hello, world! This is a toast message. </div>
                            <small>7 min ago</small>
                        </CToastHeader>
                        {/* <CToastBody> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="danger">Outfitter</CBadge></h5>Hello, world! This is a toast message.</CToastBody> */}
                    </CToast>

                    <CToast autohide={false} visible={true} style={{ width: '80vw' }}>
                        <CToastHeader closeButton>
                        <div className="fw-bold me-auto"> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="success">Guide</CBadge></h5>Hello, world! This is a toast message. </div>
                            <small>7 min ago</small>
                        </CToastHeader>
                        {/* <CToastBody> <h5 style={{ display: 'inline-block' }} className='px-4'><CBadge color="success">Admin</CBadge></h5>Hello, world! This is a toast message.</CToastBody> */}
                    </CToast>
                </CToaster>
            </CCard>


        </>
    )
}
export default Oversight;