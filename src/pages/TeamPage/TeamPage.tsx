import React from 'react'

import Grid from '@mui/material/Grid'

import './TeamPage.scss'

import TeamBlock from './components/TeamBlock'

const TeamPage: React.FC = () => {
  return (
    <section className='TeamPage-Field_block'>
      <Grid container spacing={4} className='TeamPage-Grid'>
        <Grid size={{ xs: 12, md: 6 }}>
          <TeamBlock>Команда 1</TeamBlock>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TeamBlock>Команда 2</TeamBlock>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TeamBlock>Команда 3</TeamBlock>
        </Grid>
      </Grid>
    </section>
  )
}

export default TeamPage
