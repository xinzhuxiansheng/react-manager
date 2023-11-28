import * as echarts from 'echarts'
import { useEffect, useRef, useState } from 'react'

export const useCharts = (): [React.RefObject<HTMLDivElement>, echarts.ECharts | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType>()
  useEffect(() => {
    // 如果当前 DOM 元素上已经有实例，先销毁它
    if (chartRef.current && echarts.getInstanceByDom(chartRef.current)) {
      echarts.dispose(chartRef.current)
    }

    const chart = echarts.init(chartRef.current as HTMLElement)
    setChartInstance(chart)

    // 组件卸载时销毁实例
    return () => {
      chart.dispose()
    }
  }, [])
  return [chartRef, chartInstance]
}
