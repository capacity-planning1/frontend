import { Grid } from '@mui/material'

type Props = {
  children: React.ReactNode
}

const TeamBlock: React.FC<Props> = ({ children }) => {
  return (
    <Grid className='TeamPage-TeamBlock' container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid className='TeamPage-Grid'>{children}</Grid>
    </Grid>
  )
}

export default TeamBlock
