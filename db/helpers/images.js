// loads random image from images array into each pin


const img = (arr) => {
  let random = Math.floor(Math.random() * arr.length);
  return arr[random];
}
const images = [
  'http://localhost:8080/static/bigfoot_1.jpeg',
  'http://localhost:8080/static/bigfoot_2.jpeg',
  'http://localhost:8080/static/bigfoot_3.jpeg',
  'http://localhost:8080/static/bigfoot_4.jpeg',
  'http://localhost:8080/static/bigfoot_5.jpeg',
  'http://localhost:8080/static/bigfoot_6.jpg',
  'http://localhost:8080/static/bigfoot_7.jpg',
  'http://localhost:8080/static/bigfoot_9.jpeg',
  'http://localhost:8080/static/bigfoot_10.jpeg',
  'http://localhost:8080/static/bigfoot_codes.jpeg',
  'http://localhost:8080/static/bigfoot_insurance.jpg',
  'http://localhost:8080/static/bigfoot_gardening.jpeg',
  'http://localhost:8080/static/bigfoot_interview.png',
  'http://localhost:8080/static/bigfoot_mask.jpeg',
  'http://localhost:8080/static/bigfoot_reading.jpeg',
  'http://localhost:8080/static/bigfoot_selfie.png',
  'http://localhost:8080/static/bigfoot_snacks.jpeg',
  'http://localhost:8080/static/bigfoot_ukulele.jpeg'
]

module.exports = {
  images,
  img
}
