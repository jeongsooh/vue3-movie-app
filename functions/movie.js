const axios = require('axios')    // node js에서 import 하는 방법

exports.handler = async function (event) {
  const payload = JSON.parse(event.body)   // 네트워크 환경에선 문자만으로 주고 받으므로.. 받았을 때, 객체로 만드는 과정이 필요
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  try {
    const { data } = await axios.get(url)
    if (data.Error) {
      return {
        statusCode: 400,
        body: data.Error
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }
  } catch(error) {
    return {
      statusCode: error.response.status,
      body: error.message
    }
  }
}