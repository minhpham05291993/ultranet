// ** React Imports
import { ChangeEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Types Imports
import { Turbine } from 'src/types/apps/turbineTypes'

const DEFAULT_STATE = {
  company: 'string',
  model: 'string',
  radius_blade: 0,
  longitude: 0,
  latitude: 0,
  efficiency: 0
}

interface State {
  company: string | null
  model: string | null
  radius_blade: number | null
  longitude: number | null
  latitude: number | null
  efficiency: number | null
}

interface Props {
  turbine?: Turbine
  onCreate?: (data: Turbine) => void
  onUpdate?: (data: Turbine) => void
  onCancel: () => void
}

const FormCreateUpdateTurbine = ({ turbine, onCreate, onUpdate, onCancel }: Props) => {
  // ** States
  const [values, setValues] = useState<State>(turbine ? turbine : DEFAULT_STATE)

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <Card>
      <CardHeader title={`${turbine ? 'Update' : 'Create'} turbine`} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <TextField
                defaultValue={values['company']}
                fullWidth
                label='company'
                placeholder='company'
                onChange={handleChange('company')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                defaultValue={values['model']}
                label='model'
                placeholder='model'
                onChange={handleChange('model')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                defaultValue={values['efficiency']}
                type='number'
                label='efficiency'
                placeholder='efficiency'
                onChange={handleChange('efficiency')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                defaultValue={values['radius_blade']}
                type='number'
                label='radius_blade'
                placeholder='radius_blade'
                onChange={handleChange('radius_blade')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                defaultValue={values['longitude']}
                type='number'
                label='longitude'
                placeholder='longitude'
                onChange={handleChange('longitude')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                defaultValue={values['latitude']}
                type='number'
                label='latitude'
                placeholder='latitude'
                onChange={handleChange('latitude')}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {turbine ? (
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    onClick={() => onUpdate && onUpdate(values as Turbine)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    onClick={() => onCreate && onCreate(values as Turbine)}
                  >
                    Create
                  </Button>
                )}

                <Button type='reset' variant='outlined' size='large' color='secondary' onClick={onCancel}>
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormCreateUpdateTurbine
