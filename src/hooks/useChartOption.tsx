import { useState, useEffect } from 'react'

// import ChartOptionService from 'src/services/ChartOption'
// import { ChartOptionType } from 'src/types/apps/ChartOptionTypes'

const DEFAULT_OPTION: any = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}

const DEFAULT_OPTION_2 = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {}
    }
  ]
}

const useChartOption = (resolution: string) => {
  const [chartOption, setChartOption] = useState<any>(DEFAULT_OPTION)

  useEffect(() => {
    const getChartOption = async () => {
      try {
        //    wait 2 second
        await new Promise(resolve => setTimeout(resolve, 2000))

        // random number  0 or 1
        const randomNumber = Math.floor(Math.random() * 2)
        if (randomNumber === 0) {
          setChartOption(DEFAULT_OPTION)
        } else {
          setChartOption(DEFAULT_OPTION_2)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getChartOption()
  }, [resolution])

  return { chartOption }
}

export default useChartOption
