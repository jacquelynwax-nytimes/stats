import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import moment from 'moment'
import { fetchUserStatsForYear, fetchPercentilesForYear } from '../store'
import { formatTime } from '../utils/stats'

// this is what the chart data looks like
// we can dynamically create rows for every date with the appropriate date
// const data = [{name: 'date', Your Time: 590, Bottom 10%: 800, Median: 1400, Top 10%: 800},
//               {name: 'date', Your Time: 868, Bottom 10%: 967, Median: 1506, Top 10%: 800},
//               {name: 'date', Your Time: 1397, Bottom 10%: 1098, Median: 989, Top 10%: 800},
//               {name: 'date', Your Time: 1480, Bottom 10%: 1200, Median: 1228, Top 10%: 800},
//               {name: 'date', Your Time: 1520, Bottom 10%: 1108, Median: 1100, Top 10%: 800},
//               {name: 'date', Your Time: 1400, Bottom 10%: 680, Median: 1700, Top 10%: 800}];

export class YearlyStats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDay: moment().format('dddd') // initializes activeDay to today
    }                                    // activeDay is used to set 'active' css
  }

  componentDidMount() {
    this.props.loadYearlyStats()
  }

  createChartData = () => { // this is where we'll create the data that goes in each chart
    const { percentilesThisYear, userStatsThisYear } = this.props
    const { activeDay } = this.state
    const dayKey = { 'Monday': 0, 'Tuesday': 1, 'Wednesday': 2, 'Thursday': 3, 'Friday': 4, 'Saturday': 5, 'Sunday': 6}
    const index = dayKey[activeDay]
    const dailyPercentiles = percentilesThisYear[index]
    const userPercentiles = userStatsThisYear[index]
    const data = []
    dailyPercentiles.map((dayOfData, i) => {
      let dataPoint = { name: dayOfData.PuzzelPrintDate, 'Bottom 10%': dayOfData.Percentiles[89], 'Median': dayOfData.Percentiles[50], 'Top 10%': dayOfData.Percentiles[9]}
      if (!!userPercentiles && !!userPercentiles[i] && !!userPercentiles[i].SecondsSpentSolving) {
        // fix this
        if (dayOfData.PuzzlePrintDate === userPercentiles[i].PuzzlePrintDate) {
          data.push(Object.assign({}, dataPoint, {'Your Time': userPercentiles[i].SecondsSpentSolving}))
        }
      } else {
        data.push(dataPoint)
      }
    })
    return data
  }

  isToday = (day) => {
    return day === this.state.activeDay
  }

  render() {
    const data = this.createChartData()
    console.log('data', data);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const divClass = this.isToday ? 'single-day active' : 'single-day '

    return (
      <section id='yearly-stats'>
        <div className='header'>
          <h1>Solve Times</h1>
          <p>This Year</p>
          <p>See This Weeks Stats Instead</p>
          <h1>{this.state.activeDay}</h1>
          <ComposedChart width={900} height={400} data={data}
          margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid stroke='#f5f5f5'/>
            <XAxis dataKey="name"/>
            <YAxis tickFormatter = {(seconds) => formatTime(seconds)} type='number'/>
            <Tooltip />
            <Legend />
            <Bar dataKey="Your Time" barSize={20} fill="#3E78CD" />
            <Line type='monotone' dataKey='Bottom 10%' stroke='#e44fa4' />
            <Line type='monotone' dataKey='Median' stroke='#f6c746' />
            <Line type='monotone' dataKey='Top 10%' stroke='#2eff41' />
          </ComposedChart>
          {
            days.map(day => (
              <div className={divClass} onClick={() => this.handleSingleDayDivClick(day)}>
                <p className="day-of-week">
                  <span className="day-first">{day.substring(0, 1)}</span><span className="day-tail">{day.substring(1)}</span>
                </p>
              </div>
            ))
          }
        </div>
      </section>
    )
  }

  handleSingleDayDivClick = (day) => {
    this.setState({
      activeDay: day
    })
  }
}

const mapState = state => {
  return {
    userStatsThisYear: state.user.userStatsThisYear,
    percentilesThisYear: state.percentiles.percentilesForYear
  }
}

// const mapDispatch = null;
const mapDispatch = dispatch => {
  return {
    loadYearlyStats() {
      fetchUserStatsForYear()
      // fetchPercentilesForYear()
    }
  }
}

export default connect(mapState, mapDispatch)(YearlyStats)
