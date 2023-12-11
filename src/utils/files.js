const networkSpeed = () => {
  const startTime = Date.now()
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Snake_River_%285mb%29.jpg')

  xhr.onload = function () {
    const duration = (Date.now() - startTime) / 1000
    const size = xhr.getResponseHeader('Content-Length') / 1024 / 1024 //  图片大小5M
    const speed = (size / duration).toFixed(2)
    console.log(speed + 'mb/s当前网速 ')
  }
  xhr.send()
  console.log(navigator.hardwareConcurrency, 123)
}

export default networkSpeed
