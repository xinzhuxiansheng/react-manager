import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'

export const useCharts = (): [React.RefObject<HTMLDivElement>, echarts.ECharts | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()
  useEffect(() => {
    const chart = echarts.init(chartRef.current)
    setChartInstance(chart)
  })
  return [chartRef, chartInstance]
}
