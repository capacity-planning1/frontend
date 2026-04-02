import React from 'react'

import Box from '@mui/material/Box'

type Props = {
  children: React.ReactNode
}

const TeamPageField: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Box className='TeamPage-Field_block'>{children}</Box>
    </div>
  )
}

export default TeamPageField
