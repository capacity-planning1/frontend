import React from 'react'

import Grid from '@mui/material/Grid'

import './TeamPage.scss'

import TeamBlock from './components/TeamBlock'

const TeamPage: React.FC = () => {
  return (
    <section className='TeamPage-Section'>
      <nav className='TeamPage-Nav'></nav>

      <section className='TeamPage-Field_block'>
        <Grid container columnSpacing={4} rowSpacing={4} className='TeamPage-Grid'>
          <Grid size={{ xs: 12, md: 6 }}>
            <TeamBlock>Кол-во задач</TeamBlock>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TeamBlock>Кол-во задач</TeamBlock>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TeamBlock>Кол-во задач</TeamBlock>
          </Grid>
        </Grid>
      </section>
    </section>
  )
}

export default TeamPage
