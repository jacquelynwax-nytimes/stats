import React, { Component } from 'react'
import { connect } from 'react-redux'
import { WeeklyStats, YearlyStats } from './'
import { fetchUserFromRequest, fetchUserStatsForWeek, fetchUserStatsForYear } from '../store'

export class Stats extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.loadUser();
  }

  componentDidUpdate(prevProps) { // ensures user's stats are loaded after user
    if (prevProps.user !== this.props.user) {
      this.props.loadUserStats(this.props.user.id);
    }
  }

  render() {
    const { stats, timeFilter } = this.props // stats is an {} with two {}'s: stats and streaks
    const { weeklyStats } = this.state

    return (
      <div class="page" id="page">
        <div class="main" id="main">
          <div id="main-container">
            <div className='container clearfix' id='stats-page'>
              <section id='stats-overview'>
                <h1>My Statistics</h1>
                <div className='container clearfix'>
                  <div className='single-stat'>
                    {!!stats.stats &&
                    <h2>{stats.stats.puzzles_solved}</h2>}
                    <p>Puzzles Solved</p>
                  </div>
                  <div className='single-stat'>
                    {!!stats.stats &&
                    <h2>{Math.round(stats.stats.solve_rate * 100 * 10) / 10}%</h2>}
                    <p>Solve Rate</p>
                  </div>
                  <div className='single-stat'>
                    <div className='icon-stats-streak'></div>
                    {!!stats.stats &&
                    <h2>{stats.streaks.current_streak}</h2>}
                    <p>Current Streak</p>
                  </div>
                  <div className='single-stat'>
                    <div className='icon-stats-streak'></div>
                    {!!stats.stats &&
                    <h2>{stats.streaks.longest_streak}</h2>}
                    <p>Longest Streak</p>
                  </div>
                </div>
              </section>
              {timeFilter === 'week' ?
              <WeeklyStats /> :
              <YearlyStats />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    stats: state.user.userStatsThisWeek,
    timeFilter: state.timeFilter
  }
}

const mapDispatch = dispatch => {
  return {
    loadUser() {
      dispatch(fetchUserFromRequest())
      dispatch(fetchUserStatsForYear())
    },
    loadUserStats(userId) {
      dispatch(fetchUserStatsForWeek(userId))
      // dispatch(fetchUserStatsForYear(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Stats)
