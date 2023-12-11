let IMAGE_URL = ''
if (process.env.NODE_ENV === 'production') {
  switch (process.env.VUE_APP_ENV) {
    case 'develop':
      IMAGE_URL = 'https://192.168.10.58:9880/'
      break
    case 'test':
      IMAGE_URL = 'https://192.168.10.58:9081/'
      break
    case 'production':
      IMAGE_URL = 'https://127.0.0.1:8081/'
      break
  }
} else {
  IMAGE_URL = 'https://192.168.10.58:9081/'
}

export {
  IMAGE_URL
}
