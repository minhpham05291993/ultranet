import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { meanBy } from 'lodash';
import { GoogleMap, LoadScript, } from '@react-google-maps/api';
import useFactory from 'src/hooks/useFactory'
import LocationItem from './item';
import CancelIcon from '@mui/icons-material/Cancel';
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Factory } from 'src/types/apps/factoryTypes'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Button from '@mui/material/Button'
import FactoryIcon from '@mui/icons-material/Factory';
import WindPowerIcon from '@mui/icons-material/WindPower';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SignalWifiStatusbar4BarIcon from '@mui/icons-material/SignalWifiStatusbar4Bar';

const containerStyle = {
  width: '100%',
  height: '100%'
};

interface GoogleMapSidebarLeftType {
  data?: Factory
  mdAbove?: boolean
  leftSidebarWidth?: number
  leftSidebarOpen?: boolean
  handleLeftSidebarToggle?: () => void
}

const GoogleMapSidebarLeft = (props: GoogleMapSidebarLeftType) => {
  const {
    data,
    mdAbove,
    leftSidebarWidth,
    handleLeftSidebarToggle
  } = props

  // ** Hooks
  const router = useRouter()

  return (
    <Drawer
      open={true}

      onClose={handleLeftSidebarToggle}
      variant={mdAbove ? 'permanent' : 'temporary'}
      ModalProps={{
        disablePortal: true,
        disableAutoFocus: true,
        disableScrollLock: true,
        keepMounted: true // Better open performance on mobile.
      }}
      sx={{
        zIndex: 2,
        display: 'block',
        position: mdAbove ? 'static' : 'absolute',
        '& .MuiDrawer-paper': {
          boxShadow: 'none',
          width: leftSidebarWidth,
          borderTopRightRadius: 0,
          alignItems: 'flex-start',
          borderBottomRightRadius: 0,
          p: theme => theme.spacing(3),

          zIndex: mdAbove ? 2 : 'drawer',
          position: mdAbove ? 'static' : 'absolute'
        },
        '& .MuiBackdrop-root': {
          position: 'absolute',
          backgroundColor: 'transparent',
        }
      }}
    >
      <Box
        sx={{
          width: '100%'
        }}
      >
        <CancelIcon
          sx={{ float: 'right', cursor: 'pointer' }}
          onClick={() => {
            if (handleLeftSidebarToggle) handleLeftSidebarToggle();
          }}
        />
      </Box>

      <Grid item xs={12} sm={5}>
        <CardHeader
          title={data?.name}
          subheader='Factory'
          subheaderTypographyProps={{ sx: { lineHeight: '1.25rem', fontSize: '0.875rem !important' } }}
          titleTypographyProps={{
            sx: {
              fontSize: '1.5rem !important',
              lineHeight: '2rem !important',
              letterSpacing: '0.43px !important'
            }
          }}
        />
        <CardContent
          sx={{ pt: theme => `${theme.spacing(4)} !important`, pb: theme => `${theme.spacing(5.5)} !important` }}
        >
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin='light'
              variant='rounded'
              color='success'
              sx={{ mr: 3.5, '& svg': { color: `red` } }}
            >
              <ManageAccountsIcon />
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{data?.manager}</Typography>
              <Typography>Manager</Typography>
            </Box>
          </Box>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin='light'
              variant='rounded'
              color='success'
              sx={{ mr: 3.5, '& svg': { color: `orange` } }}
            >
              <WindPowerIcon />
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{data?.power}</Typography>
              <Typography>Power</Typography>
            </Box>
          </Box>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin='light'
              variant='rounded'
              color='success'
              sx={{ mr: 3.5, '& svg': { color: `purple` } }}
            >
              <SignalWifiStatusbar4BarIcon />
            </CustomAvatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{data?.status}</Typography>
              <Typography>Status</Typography>
            </Box>
          </Box>
          {data && data.image && <Box>
            <img
              style={{
                width: '100%'
              }}
              alt={data?.name}
              src={`http://10.250.0.171:8000/image/${data.image}`}
            />
          </Box>}
          <Button fullWidth variant='contained' sx={{ marginTop: '5px' }} onClick={() => { router.push(`/apps/factory/${data?.id}`) }}>
            View Report
          </Button>
        </CardContent>
      </Grid>
    </Drawer>
  )
}


const LocationList = () => {
  const { factory } = useFactory()
  console.log(factory);
  const [locationInfoSideBar, setLocationInfoSideBar] = useState<Factory | null>(null)
  const [isShowLocationInfoSideBar, setIsShowLocationInfoSideBar] = useState(false)
  const naiveRound = (num: number, decimalPlaces = 0) => {
    const p = Math.pow(10, decimalPlaces);

    return Math.round(num * p) / p;
  }

  const setCenterPosition = () => {
    if (factory.length > 0) {
      return { lat: naiveRound(meanBy(factory, 'latitude'), 3), lng: naiveRound(meanBy(factory, 'longitude'), 3) };
    }
  };

  const sizeIcon = 8;
  const turbineIcon = {
    fillOpacity: 1,
    scale: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
    fillColor: 'purple',
    path: `M 0 0 m -${sizeIcon} 0 a ${sizeIcon} ${sizeIcon} 0 2 0 ${sizeIcon * 2} 0 a ${sizeIcon} ${sizeIcon} 0 2 0 -${sizeIcon * 2} 0`
  };

  const factoryIcon = {
    fillOpacity: 1,
    scale: 1,
    strokeColor: '#FFFFFF',
    strokeWeight: 2,
    fillColor: 'red',
    path: `M 0 0 m -${sizeIcon} 0 a ${sizeIcon} ${sizeIcon} 0 2 0 ${sizeIcon * 2} 0 a ${sizeIcon} ${sizeIcon} 0 2 0 -${sizeIcon * 2} 0`
  };

  return (
    <>
      {factory.length > 0 && <LoadScript
        googleMapsApiKey="AIzaSyB2gvGyHM2MEOA88wn9Y_DTJlTLxv5mOTY"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={setCenterPosition()}

          onLoad={map => {
            const bounds = new window.google.maps.LatLngBounds();

            factory.map(item => {
              bounds.extend({
                lat: item.latitude,
                lng: item.longitude
              });
            });
            map.fitBounds(bounds);
          }}

        // zoom={1}
        >
          {isShowLocationInfoSideBar && locationInfoSideBar && <GoogleMapSidebarLeft data={locationInfoSideBar} leftSidebarWidth={300} handleLeftSidebarToggle={() => setIsShowLocationInfoSideBar(false)} />}


          {factory.map((fact, index) => (
            <>
              <LocationItem
                item={fact}
                key={`fact-${index}`}
                handleShowInfoSidebarToggle={(item: Factory) => {
                  if (item) {
                    setLocationInfoSideBar(item);
                    setIsShowLocationInfoSideBar(true);
                  }
                }}
                svgMarker={factoryIcon}
              />

              {
                fact?.turbines.map((turbine, factIndex) => (
                  <LocationItem
                    item={turbine}
                    key={`tur-${factIndex}`}
                    svgMarker={turbineIcon}
                    renderInfoWindow={
                      <>
                        <Grid item xs={12} sm={5}>
                          <CardHeader
                            title={turbine.model}
                            subheader='Model'
                            subheaderTypographyProps={{ sx: { lineHeight: '1.25rem', fontSize: '0.875rem !important' } }}
                            titleTypographyProps={{
                              sx: {
                                fontSize: '1.5rem !important',
                                lineHeight: '2rem !important',
                                letterSpacing: '0.43px !important'
                              }
                            }}
                          />
                          <CardContent
                            sx={{ pt: theme => `${theme.spacing(4)} !important`, pb: theme => `${theme.spacing(5.5)} !important` }}
                          >
                            <Box key={index} sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                              <CustomAvatar
                                skin='light'
                                variant='rounded'
                                color='success'
                                sx={{ mr: 3.5, '& svg': { color: `purple` } }}
                              >
                                <FactoryIcon />
                              </CustomAvatar>
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 600 }}>{fact.name}</Typography>
                                <Typography>Factory</Typography>
                              </Box>
                            </Box>
                            <Box key={index} sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                              <CustomAvatar
                                skin='light'
                                variant='rounded'
                                color='primary'
                                sx={{ mr: 3.5, '& svg': { color: `orange` } }}
                              >
                                <WindPowerIcon />
                              </CustomAvatar>
                              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ fontWeight: 600 }}>{turbine.power}</Typography>
                                <Typography>Power</Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Grid>
                      </>
                    }
                  />
                ))
              }
            </>
          ))}
        </GoogleMap>
      </LoadScript>}
    </>
  )
}

export default LocationList; 