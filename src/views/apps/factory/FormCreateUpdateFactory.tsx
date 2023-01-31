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
import { useSnackbar } from 'notistack'

// ** Types Imports
import { Factory } from 'src/types/apps/factoryTypes'

// ** Styled Component
import DropzoneWrapper from 'src/@core/styles/libs/react-dropzone'
import FileUploaderSingle from 'src/views/forms/form-elements/file-uploader/FileUploaderSingle'
import ImageService, { ImageUrl } from 'src/services/image'

const DEFAULT_STATE = {
  code: 'string',
  name: 'string',
  longitude: 0,
  latitude: 0,
  manager: 'string',
  status: 'string',
  image: 'string',
  power: 0,
  number_turbine: 0
}

interface State {
  code: string | null
  name: string | null
  longitude: number | null
  latitude: number | null
  manager: string | null
  status: string | null
  image: string | null
  power: number | null
  number_turbine: number | null
}

interface Props {
  factory?: Factory
  onCreate?: (data: Factory) => void
  onUpdate?: (data: Factory) => void
  onCancel: () => void
}

const FormCreateUpdateFactory = ({ factory, onCreate, onUpdate, onCancel }: Props) => {
  const { enqueueSnackbar } = useSnackbar()

  // ** States
  const [values, setValues] = useState<State>(factory ? factory : DEFAULT_STATE)

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleDrop = async (data: File[]) => {
    try {
      if (data.length === 1) {
        const file = data[0]
        const bodyFormData = new FormData()
        bodyFormData.append('image', file)
        const res = await ImageService.upload(bodyFormData)
        enqueueSnackbar('Upload image success', { variant: 'success' })
        setValues({ ...values, image: res.image })
      }
    } catch (error) {
      enqueueSnackbar('Upload image error', { variant: 'error' })
      console.log(error)
    }
  }

  return (
    <Card sx={{ width: '1000px' }}>
      <CardHeader title={`${factory ? 'Update ' : 'Create '} factory`} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <TextField
                    defaultValue={values['code']}
                    fullWidth
                    label='code'
                    placeholder='code'
                    onChange={handleChange('code')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    defaultValue={values['name']}
                    fullWidth
                    label='Name'
                    placeholder='name'
                    onChange={handleChange('name')}
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    defaultValue={values['manager']}
                    label='manager'
                    placeholder='manager'
                    onChange={handleChange('manager')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    defaultValue={values['status']}
                    label='status'
                    placeholder='status'
                    onChange={handleChange('status')}
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
                    {factory ? (
                      <Button
                        type='submit'
                        variant='contained'
                        size='large'
                        onClick={() => onUpdate && onUpdate(values as Factory)}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        type='submit'
                        variant='contained'
                        size='large'
                        onClick={() => onCreate && onCreate(values as Factory)}
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
            </Grid>

            <Grid item xs={6}>
              <DropzoneWrapper>
                {factory ? (
                  <FileUploaderSingle onDrop={handleDrop} defaultImage={ImageUrl.get(factory.image)} />
                ) : (
                  <FileUploaderSingle onDrop={handleDrop} />
                )}
              </DropzoneWrapper>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormCreateUpdateFactory
