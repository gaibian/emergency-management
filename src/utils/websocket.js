
// 需要用promise来封装
class webSocket {
  constructor(url) {
    this.webSocket = null
    this.webSocketInit(url)
  }
  webSocketInit() {
    // 初始化webSocket,并开始监听回调消息 =>开始建立连接 => 由后端来实时推送消息
    if ('WebSocket' in window) { // 判断当前浏览器是否支持websocket
      // eslint-disable-next-line no-undef
      this.webSocket = new WebSocket(url)
      // 接收到消息
      this.webSocket.onmessage = this.webSocketMessage
      // 连接成功的回调
      this.webSocket.onopen = () => {
        console.log('websocket 连接成功')
      }
      // 监听窗口关闭
      window.onbeforeunload = () => {
        this.closeWebsocket()
      }
    }
  }
  closeWebsocket() {
    this.webSocket.close()
  }
  webSocketMessage(res) {
    // 接收消息
    console.log(res.data)
    console.log(JSON.parse(res.data))
  }
  webSocketSend(data) {
    // 发送消息
    this.webSocket.send(JSON.stringify(data))
  }
  readyChat(data) {
    if (this.webSocket.readyState === 1) { // 连接成功,可以立即发送消息
    } else if (this.webSocket.readyState === 0) { // 表示正在连接

    } else { // 连接失败或是未连接
      console.warn('连接失败或是未连接')
    }
  }
}

export default webSocket
