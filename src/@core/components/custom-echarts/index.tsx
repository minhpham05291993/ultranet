import Box from '@mui/material/Box'
import type { EChartsOption, SeriesOption } from 'echarts'
import { ECharts, getInstanceByDom, init } from 'echarts'
import { memo, useEffect, useRef } from 'react'
import { withSize } from 'react-sizeme'
import { IEchartsHighlightParams, IEchartsDataZoomParams, IOpts } from './types'
import { useIsFirstRender } from './utils'
import * as React from 'react'

export interface EchartsProps {
  size?: {
    width: number
    height: number
  }
  opts?: IOpts
  option: EChartsOption
  handleCbChartRef?: (data: React.RefObject<HTMLDivElement>) => void
  handleHighlight?: (params: IEchartsHighlightParams, series: SeriesOption[]) => void
  handleZoom?: (params: IEchartsDataZoomParams, oldOption: EChartsOption) => void
}

const Echarts = ({
  size,
  opts,
  option,
  handleCbChartRef,
  handleHighlight,
  handleZoom
}: EchartsProps): React.ReactElement => {
  const chartRef = useRef<HTMLDivElement>(null)
  const isFirst = useIsFirstRender()

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined
    if (chartRef.current !== null && chartRef.current.clientHeight) {
      chart = init(chartRef.current, undefined, opts)
      handleCbChartRef && handleCbChartRef(chartRef)
    }

    // Return cleanup function
    return () => {
      chart?.dispose()
    }
  }, [handleCbChartRef, opts])

  useEffect(() => {
    if (isFirst && chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)

      chart &&
        chart.on('highlight', function (params: unknown) {
          handleHighlight &&
            handleHighlight(params as IEchartsHighlightParams, chart?.getOption()?.series as SeriesOption[])
        })
    }
  }, [handleHighlight, isFirst])

  useEffect(() => {
    if (isFirst && chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)

      chart &&
        chart.on('datazoom', function (params: unknown) {
          handleZoom && handleZoom(params as IEchartsDataZoomParams, chart?.getOption() as EChartsOption)
        })
    }
  }, [handleZoom, isFirst])

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      chart?.resize()
    }
  }, [size])

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current)
      if (!chart) return
      const old: EChartsOption = chart?.getOption() as EChartsOption
      const settings: {
        notMerge?: boolean
      } = {}
      if (
        old?.series &&
        option?.series &&
        (old?.series as SeriesOption[]).length > (option?.series as SeriesOption[]).length
      ) {
        settings.notMerge = true

        // settings.replaceMerge = 'xAxis'
      }

      // console.log("updated chart", chart, old, option);
      option && chart && chart.setOption && chart.setOption(option, settings)
    }
  }, [option, opts]) // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  return (
    <Box
      ref={chartRef}
      sx={{
        width: '100%',
        minWidth: '100px',
        minHeight: '100px',
        height: '100%',
        borderRadius: '10px'
      }}
    />
  )
}

export default memo(withSize()(Echarts))
