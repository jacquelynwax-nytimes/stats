// actions
const SET_TIME_FILTER = 'SET_TIME_FILTER'

// initialState
const initialState = "week"

// action creators
export const setTimeFilter = timeFilter => ({type: SET_TIME_FILTER, timeFilter})

// reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TIME_FILTER:
      return action.timeFilter
    default:
      return state
  }
}
