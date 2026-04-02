import React from 'react'

import './TeamPage.scss'

import TeamBlock from './components/TeamBlock'
import TeamPageField from './components/TeamPageField'

const TeamPage: React.FC = () => {
  return (
    <div>
      <TeamPageField>
        <div>
          <TeamBlock>Команда 1</TeamBlock>
          <TeamBlock>Команда 2</TeamBlock>
          <TeamBlock>Команда 3</TeamBlock>
        </div>
      </TeamPageField>
    </div>
  )
}

export default TeamPage
