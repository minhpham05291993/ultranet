import type { EChartsOption } from 'echarts'
import { GridRowsProp } from '@mui/x-data-grid'

export interface ITagRequest {
  chainId: string
  dataUnit: string
  description: string
  name: string
  path: string
  uuid: string
}

export interface ITimeframe {
  startTime: string
  endTime: string
}

export interface ITag {
  dataType: string
  chainId: string
  uuid: string
  name: string
  description: string
  dataUnit: string
  path: string
  id: string
  min: number
  max: number
  avg: number
  color: string
  decimalNumber: number
}

export interface ITags {
  [key: string]: ITag
}

export interface IDataTag {
  avg: number
  count: number
  interval?: string
  max: number
  min: number
  ts: number
}

export interface IDataTags {
  [key: string]: IDataTag[]
}

export interface IBatch {
  batch: string
  dataIndex: number
  dataIndexInside: number
  escapeConnect: boolean
  notBlur: boolean
  seriesIndex: number
  type: string
}

export interface IEchartsHighlightParams {
  type: string
  batch: IBatch[]
}

export interface IEchartsDataZoomBatch {
  start: number
}

export interface IEchartsDataZoomParams {
  batch: IEchartsDataZoomBatch[]
  start: number
}

export interface IAddedTag {
  property: string
  tag: ITag
}

export interface IResponseData {
  [key: string]: {
    [key: string]: IDataTag[]
  }
}

export interface IColorHelper {
  webColors: {
    [key: string]: string
  }
  hexToRGBA: (color: string, opacity: number) => string
}

export type ExportType = 'csv' | 'svg' | 'png'

export interface IPMP {
  App: {
    TagExplorer2: {
      pickTags: (data: { maxNumberOfTags: number; onFinished: ((data: IAddedTag[]) => void) | undefined }) => void
    }
  }
}

export interface IResolution {
  isAuto: boolean
  value: string
}

export type IUpdatedTimeFrame = {
  startTime: string
  endTime: string
} | null

export type IOpts = {
  renderer?: 'canvas' | 'svg'
}

export interface IListItem {
  name: string
  value: number
}

export type ActionUpdateTimeFrame = {
  startTime: string
  endTime: string
}

export type IEchartsReducerActionPayload =
  | ActionUpdateTimeFrame
  | EChartsOption
  | {
      [key: string]: ITag
    }
  | string
  | {
      [key: string]: IDataTag[]
    }
  | IResolution
  | GridRowsProp

export interface SeriesOptionData {
  ts: number
  avg: number
  dataUnit?: string
  decimal?: number
}
