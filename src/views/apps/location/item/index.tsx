import * as React from 'react'

import { Marker, InfoWindow } from '@react-google-maps/api'

import { useState, ReactElement } from 'react';

export interface LocationItemProps {
  item: any
  handleShowInfoSidebarToggle?: (item: any) => void
  renderInfoWindow?: ReactElement,
  svgMarker?: string | google.maps.Icon | google.maps.Symbol | undefined;
}

const LocationItem = ({ item, handleShowInfoSidebarToggle, renderInfoWindow, svgMarker }: LocationItemProps) => {
  const [isShowInfoWindow, setIsShowInfoWindow] = useState(false)

  return (
    <>
      <Marker
        onClick={() => {
          if (handleShowInfoSidebarToggle) handleShowInfoSidebarToggle(item);
        }}
        position={{ lat: item.latitude, lng: item.longitude }}
        onMouseOver={() => {
          if (renderInfoWindow) setIsShowInfoWindow(true)
        }}
        onMouseOut={() => {
          if (renderInfoWindow)
            setTimeout(() => {
              setIsShowInfoWindow(false)
            }, 500);
        }}
        icon={svgMarker}
        cursor="pointer"
      />
      {isShowInfoWindow && renderInfoWindow && (
        <InfoWindow
          position={{ lat: item.latitude, lng: item.longitude }}
          onCloseClick={() => setIsShowInfoWindow(false)}
        >
          {renderInfoWindow}
        </InfoWindow>
      )}
    </>
  )
}

export default LocationItem
