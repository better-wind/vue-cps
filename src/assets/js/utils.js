export default {
  params: (data) => {
    let arr = []
    for (let i in data) {
      arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
    }
    return arr.join('&')
  },
  fetch: (opts) => {
    const promise = new Promise((resolve, reject) => {
      const client = new XMLHttpRequest()
      opts.data = params(opts.data)
      if (opts.type === 'GET') {
        opts.url = opts.url + '?' + opts.data
      }
      client.open(opts.type, opts.url)
      client.onreadystatechange = handler
      client.responseType = 'json'
      client.setRequestHeader('Accept', 'application/json')
      if (opts.type === 'POST') {
        client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        client.send(opts.data)
      } else {
        client.send()
      }
      function params (data) {
        let arr = []
        for (let i in data) {
          arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
        }
        return arr.join('&')
      }
      function handler () {
        if (this.readyState !== 4) {
          return
        }
        if (this.status === 200) {
          resolve(this.response)
        } else if (this.status === 999) {
          location.href = '/login.html?redirectUrl=' + location.href
          return false
        } else {
          reject(new Error(this.statusText))
        }
      }
    })
    return promise
  }
}
