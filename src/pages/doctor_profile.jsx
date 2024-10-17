import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import DoctorProfile from '@/components/DoctorProfile/DoctorProfile'
import React from 'react'

function doctor_profile() {
  return (
    <div>
        <Breadcrumb heading='Doctor Profile' subHeading='Home / Doctor Profile' /> 
        <DoctorProfile />
    </div>
  )
}

export default doctor_profile