// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'

// ** Types Imports
import { FactoryInformation } from 'src/types/apps/factoryTypes'

// Styled component for the trophy image
const TrophyImg = styled('img')({
  right: 36,
  bottom: 20,
  height: 40,
  width: 30,
  position: 'absolute'
})

interface Props {
  factoryInformation: FactoryInformation
}

const FactoryDetailForcasting = ({ factoryInformation }: Props) => {
  // ** Hook

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ height: 120 }}>
        <Typography variant='h6'>Total Power Forecasting</Typography>
        <Typography variant='h5' sx={{ mt: 1, color: 'primary.main' }}>
          {factoryInformation?.total_power_forecasting}
        </Typography>
        <Typography sx={{ color: 'primary.main' }}>MW</Typography>
        <TrophyImg alt='trophy' src='/images/misc/trophy.png' />
      </CardContent>
    </Card>
  )
}

export default FactoryDetailForcasting
