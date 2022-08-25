import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="http://simstech.vn" target="_blank" rel="noopener noreferrer">
          AnhTuanHoang
        </a>
        <span className="ms-1">&copy; 2021 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="http://simstech.vn" target="_blank" rel="noopener noreferrer">
          AnhTuanHoang
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
