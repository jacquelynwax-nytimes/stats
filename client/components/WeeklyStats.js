import React, { Component } from 'react'
import { connect } from 'react-redux'
import { calculateBarHeight, formatTime } from '../utils/stats'
import moment from 'moment'
import { setTimeFilter } from '../store'

export class WeeklyStats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeDay: moment().format('dddd') // initializes activeDay to today
    }                                    // activeDay is used to set 'active' css
  }

  render() {
    const { stats } = this.props // stats is an {} that includes to {}'s: stats and streaks
    const today = moment().format('dddd')
    const statsByDay = !!stats.stats ? stats.stats.stats_by_day : []
    const bestTimes = !!statsByDay ? statsByDay.map(d => d.best_time) : []
    const shortestTime = !!bestTimes ? Math.min(...bestTimes) : ''
    const longestTime = !!stats.stats ? Math.max(stats.stats.longest_avg_time, stats.stats.longest_latest_time) : ''

    return (
      <section id='weekly-stats'>
        <div className='header'>
          <h1>Solve Times</h1>
          <p>This Week</p>
        </div>
        {
          !!stats && statsByDay.map(day => this.renderSingleDayStats(day, shortestTime, longestTime, today))
        }
      </section>
    )
  }

  renderSingleDayStats = (day, shortestTime, longestTime, today) => {
    const dayOfWeek = day.label
    const latest = day.this_weeks_time
    const best = day.best_time
    const bestDate = moment(day.best_date)
    const average = day.avg_time
    const isToday = dayOfWeek === this.state.activeDay

    const latestBarSize = calculateBarHeight(latest, shortestTime, longestTime)
    const height = latestBarSize.height
    const width = latestBarSize.width
    const bestBarSize = calculateBarHeight(best, shortestTime, longestTime)
    const heightBest = bestBarSize.height
    const widthBest = bestBarSize.width
    const averageBarSize = calculateBarHeight(average, shortestTime, longestTime)
    const heightAv = averageBarSize.height
    const widthAv = averageBarSize.width
    const dayOrWeek = isToday ? 'Today' : 'This Week'
    const bestBottom = bestBarSize.height + 8
    const bestLeft = bestBarSize.width + 40
    const latestTimeFormatted = latest !== 0 ? formatTime(latest) : '--:--'
    const bestTimeFormatted = formatTime(best)
    const averageTimeFormatted = formatTime(average)
    const divClass = isToday ? 'single-day active' : 'single-day '
    const { handleViewMoreSpanClick } = this.props

    return (
      <div className={divClass} onClick={() => this.handleSingleDayDivClick(dayOfWeek)}>
        <p className="day-of-week">
          <span className="day-first">{dayOfWeek.substring(0, 1)}</span><span className="day-tail">{dayOfWeek.substring(1)}</span>
        </p>
        <p className="day-of-week">
          <span className="day-tail" onClick={() => handleViewMoreSpanClick()}>View more</span>
        </p>
          <div>
            <div className="time-bar today"
              style={{height: {height}, width: {width}}}>
              <p className="time">{latestTimeFormatted}</p>
              <p>${dayOrWeek}</p>
            </div>
            <p
              className="best-date"
              style={{bottom: {bestBottom}, left: {bestLeft}}}>
              {bestDate.format('MM-DD-YYYY')}
            </p>
            <div
              className="time-bar best"
              style={{height: {heightBest}, width: {widthBest}}}>
              <p className="time">{bestTimeFormatted}</p>
              <p>Best</p>
              <p>Percentile</p>
            </div>
            <div
              className="time-bar average"
              style={{height: {heightAv}, width: {widthAv}}}>
              <div className="condensed">
                <p>T <span className="time">{latestTimeFormatted}</span></p>
                <p>B <span className="time">{bestTimeFormatted}</span></p>
                <p>A <span className="time">{averageTimeFormatted}</span></p>
              </div>
              <div className="expanded">
                <p className="time">{averageTimeFormatted}</p>
                <p>Average</p>
                <p>Percentile</p>
              </div>
            </div>
          </div>
      </div>
    )
  }

  handleSingleDayDivClick = (dayOfWeek) => {
    this.setState({
      activeDay: dayOfWeek
    })
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    stats: state.user.userStatsThisWeek
  }
}

const mapDispatch = dispatch => {
  return {
    handleViewMoreSpanClick() {
      dispatch(setTimeFilter('year'))
    }
  }
}

export default connect(mapState, mapDispatch)(WeeklyStats)
