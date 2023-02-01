// ** MUI Imports
import Button from '@mui/material/Button'

const UltranetButton = () => {
  const handleCheckin = () => {
    console.log('Check in')
  }

  const handleCheckout = () => {
    console.log('Check out')
  }

  const handleExport = () => {
    console.log('Export')
  }

  return (
    <div className='demo-space-x'>
      <Button variant='contained' onClick={handleCheckin}>
        Check in
      </Button>
      <Button variant='contained' onClick={handleCheckout}>
        Checkout
      </Button>
      <Button variant='contained' onClick={handleExport}>
        Export
      </Button>
    </div>
  )
}

export default UltranetButton
