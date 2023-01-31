// ** React Imports
import { ChangeEvent, useState } from 'react'
import useFactory from 'src/hooks/useFactory'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import { useForm, Controller } from 'react-hook-form'

// import Select, { SelectChangeEvent } from '@mui/material/Select'
import Select from '@mui/material/Select'

import { UserType } from 'src/types/apps/userTypes'
import { Factory } from 'src/types/apps/factoryTypes'
import { map } from 'lodash'

// import toast from 'react-hot-toast'

interface State {
  email: string | null
  number: string | null
  info: string | null
  role: string | null
  username: string | null
  password: string | null
  factories: number[]
}

interface Props {
  user?: UserType
  onCreate?: (data: UserType) => void
  onUpdate?: (data: UserType) => void
  onCancel: () => void
}

const DEFAULT_STATE = {
  email: '',
  number: '',
  info: '',
  role: '',
  username: '',
  password: '',
  factories: []
}

const FormCreateUser = ({ user, onCreate, onUpdate, onCancel }: Props) => {
  // ** States
  const { factory } = useFactory()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ DEFAULT_STATE } as any)

  const roles = [
    // { key: 'admin', label: 'Admin' },
    { key: 'user', label: 'User' },
  ];

  const [values, setValues] = useState<State>(user ? user : DEFAULT_STATE)

  const handleChange = (prop: keyof State, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSelectFactories = (_event: any, newValues: number[]) => {
    setValues({ ...values, ['factories']: map(newValues, 'id') })
  }

  const fillFactories = (factoryValues: number[]) => {
    const existedFactories: Factory[] = [];
    if (factoryValues) {
      factory.forEach(fact => {
        factoryValues.forEach(value => {
          if (value === fact.id) existedFactories.push(fact)
        })
      })
    }

    return existedFactories;
  }

  // const onSubmit = () => toast.success('Form Submitted');

  return (
    <Card>
      <CardHeader title='Add User' />
      <CardContent>
        <form onSubmit={handleSubmit(() => {
          if (user) {
            onUpdate && onUpdate(values as UserType)
          } else {
            onCreate && onCreate(values as UserType)
          }
        })}>
          <Grid container spacing={5}>

            {!user && <><Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='username'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={values['username']}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Username'

                      onChange={(e) => {
                        onChange(e);
                        handleChange('username', e);
                      }}
                      placeholder='Username'
                      error={Boolean(errors.username)}
                      aria-describedby='validation-basic-username'
                    />

                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-username'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <Controller
                    name='password'
                    control={control}
                    rules={{ required: true }}
                    defaultValue={values['password']}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Password'

                        onChange={(e) => {
                          onChange(e);
                          handleChange('password', e);
                        }}
                        placeholder='Password'
                        error={Boolean(errors.password)}
                        aria-describedby='validation-basic-password'
                      />

                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-password'>
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </>}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={values['email']}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Email'

                      onChange={(e) => {
                        onChange(e);
                        handleChange('email', e);
                      }}
                      placeholder='example@gmail.com'
                      error={Boolean(errors.email)}
                      aria-describedby='validation-basic-email'
                    />

                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-email'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='number'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={values['number']}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Number'

                      onChange={(e) => {
                        onChange(e);
                        handleChange('number', e);
                      }}
                      placeholder='Number'
                      error={Boolean(errors.number)}
                      aria-describedby='validation-basic-number'
                    />

                  )}
                />
                {errors.number && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-number'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Controller
                  name='info'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={values['info']}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Info'

                      onChange={(e) => {
                        onChange(e);
                        handleChange('info', e);
                      }}
                      placeholder='Info'
                      error={Boolean(errors.info)}
                      aria-describedby='validation-basic-info'
                    />

                  )}
                />
                {errors.info && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-info'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Controller
                  name='role'
                  control={control}
                  rules={{ required: true }}
                  defaultValue={values['role']}
                  render={({ field: { value, onChange } }) => (

                    <Select
                      value={value || ''}
                      label='Role'
                      onChange={(e) => {
                        onChange(e);
                        handleChange('role', e as any)
                      }}
                    >
                      {roles.map((role, index) => (
                        <MenuItem value={role.key} key={index}>{role.label}</MenuItem>
                      ))}
                    </Select>

                  )}
                />
                {errors.role && (
                  <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-role'>
                    This field is required
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>

              <FormControl fullWidth>
                <Controller
                  name='factories'
                  control={control}
                  defaultValue={fillFactories(values['factories'])}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      multiple
                      blurOnSelect
                      sx={{ width: 250 }}
                      options={factory}
                      getOptionLabel={option => option.name}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          {option.code}
                        </li>
                      )}
                      renderInput={params => <TextField key={value} {...params} label='Factories' />}
                      value={fillFactories(values['factories'])}
                      onChange={(e, value: any) => {
                        onChange(e)
                        handleSelectFactories(e, value)
                      }}
                    />
                  )}
                />
              </FormControl>
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
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                >
                  {user ? 'Update': 'Create'} 
                </Button>
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

export default FormCreateUser
