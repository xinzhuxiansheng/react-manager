import { Descriptions, Card, Button } from 'antd'
import * as echarts from 'echarts'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { formatNum, formatMoney, formatState } from '@/utils'
import api from '@/api'
import { Databoard } from '@/types/api'
import { useCharts } from '@/hook/useCharts'
export default function DashBoard() {
  const userInfo = useStore(state => state.userInfo)
  const [report, setReport] = useState<Databoard.ReportData>()

  const [lineRef, lineChart] = useCharts()
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()
  const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    renderLineChart()
    renderPieCityChart()
    renderPieAgeChart()
    renderRadarChart()
  }, [lineChart, pieChart1, pieChart2, radarChart])

  const renderLineChart = async () => {
    const data = await api.getLineData()
    lineChart?.setOption({
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单', '流水']
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: data.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order
        },
        {
          name: '流水',
          type: 'line',
          data: data.money
        }
      ]
    })
  }

  const renderPieCityChart = async () => {
    const data = await api.getPieCityData()
    pieChart1?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data
        }
      ]
    })
  }

  const renderPieAgeChart = async () => {
    const data = await api.getPieAgeData()
    pieChart2?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: '55%',
          roseType: 'radius',
          center: ['50%', '50%'],
          data: data
        }
      ]
    })
  }

  const renderRadarChart = async () => {
    const data = await api.getRadarData()
    radarChart?.setOption({
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: data.data
        }
      ]
    })
  }

  const handleRefresh = () => {
    renderPieCityChart()
    renderPieAgeChart()
  }

  useEffect(() => {
    getReportDate()
  }, [])

  const getReportDate = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.userinfo}>
        <img src={userInfo.userImg} alt='' className={styles.userImg} />
        <Descriptions title='欢迎新同学，每天都要开心'>
          <Descriptions.Item label='用户ID'>{userInfo._id}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}个</div>
        </div>

        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>

        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{report?.orderCount}单</div>
        </div>

        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{report?.cityNum}座</div>
        </div>
      </div>

      <div className='chart'>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className='chart'>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={handleRefresh}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className='chart'>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
