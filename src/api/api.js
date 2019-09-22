import axios from './axios'
import qs from 'qs'

export function GetWinsdomAnalysisData(params) {
  return axios.get('/FiveWisdom/GetWinsdomAnalysisData', {params})
}

export function GetUnitPartyLatAndLngs(params) {
  return axios.get('/FiveWisdom/GetUnitPartyLatAndLngs', {params})
}

export function GetSmartServiceData(params) {
  return axios.get('/FiveWisdom/GetSmartServiceData', {params})
}

export function GetUnits(params) {
  return axios.post('/FiveWisdom/GetUnits', qs.stringify(params))
}

export function GetUnitIntegralChart(params) {
  return axios.get('/FiveWisdom/GetUnitIntegralChart', { params })
}

export function GetCurrentMonthUserActive(params) {
  return axios.get('/FiveWisdom/GetCurrentMonthUserActive', {params})
}

export function GetUnitScoreRanking(params) {
  return axios.get('/FiveWisdom/GetUnitScoreRanking', {params})
}

export function GetKeywordCrawling(params) {
  return axios.get('/FiveWisdom/GetKeywordCrawling', {params})
}

export function GetPointScore(params) {
  return axios.get('/FiveWisdom/GetPointScore', {params})
}

export function GetNewsCommentRanking(params) {
  return axios.get('/FiveWisdom/GetNewsCommentRanking', {params})
}

export function GetNewsAndCourseCommentRanking(params) {
  return axios.get('/FiveWisdom/GetNewsAndCourseCommentRanking', {params})
}

export function GetKeywordStatistics(params) {
  return axios.get('/FiveWisdom/GetKeywordStatistics', {params})
}

export function GetCourseViewCountAndPeriod(params) {
  return axios.get('/FiveWisdom/GetCourseViewCountAndPeriod', {params})
}

export function GetCurrentMonthAnswerScoreAndNum(params) {
  return axios.get('/FiveWisdom/GetCurrentMonthAnswerScoreAndNum', {params})
}

export function GetUnitLearningScoreAndVideoTime(params) {
  return axios.get('/FiveWisdom/GetUnitLearningScoreAndVideoTime', {params})
}

export function GetUserLearningScore(params) {
  return axios.get('/FiveWisdom/GetUserLearningScore', {params})
}

export function GetJiguangStatistics(params) {
  return axios.get('/FiveWisdom/GetJiguangStatistics', {params})
}