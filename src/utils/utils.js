import { Message } from 'element-ui'
import AppUrlConfig from '@/api/config/app-url-config.js'
export default class Utils {
  /**
   * 获得唯一ID
   * @return {[type]} [description]
   */
  static getGuid() {
    let uuid = `${Utils.S4()}${Utils.S4()}-${Utils.S4()}-${Utils.S4()}-${Utils.S4()}-${Utils.S4()}${Utils.S4()}${Utils.S4()}`
    return uuid
  }
  static S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  /**
   * 数据不能为空!
   * **/
  static isNotNullORBlank = (...args) => {
    for (let i = 0; i < args.length; i++) {
      let argument = args[i]
      if (argument == null || argument === '' || argument === undefined) {
        return false
      }
    }
    return true
  }
  /**
   * [判断object/json 是否为]
   * @return {[type]} [description]
   */
  static isEmptyObject(obj) {
    for (let key in obj) {
      return true // 返回true，为空对象
    }
    return false // 返回false，不为空对象
  }
  /**
   * 数组去重
   * array : 需要去重的数组
   * newArray : 返回一个不重复的数据
   * */
  static _uniqArray(array) {
    let newArray = [] // 一个新的临时数组
    // 遍历当前数组
    for (let i = 0; i < array.length; i++) {
      // 如果当前数组的第i已经保存进了临时数组，那么跳过
      // 否则把当前项push到临时数组里面
      if (newArray.indexOf(array[i]) === -1) newArray.push(array[i])
    }
    return newArray
  }
  /**
   * 判断数组是否为空
   * 【不】为空 返回 true
   *       为空 返回 false
   * */
  static decideArrays(arrays) {
    if (arrays === undefined || arrays.length === 0) {
      return false
    } else {
      return true
    }
  }
  /**
   * 数组删除指定值元素
   * */
  static removeArraysByValue(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        arr.splice(i, 1)
        break
      }
    }
  }
  /**
   * [判断是否是IE浏览器]
   * @return {Boolean} [description]
   */
  static isIE() {
    if (window.ActiveObject || 'ActiveXObject' in window) {
      return true
    } else {
      return false
    }
  }
  /**
   * [判断浏览器是否支持webgl]
   * @return {[type]} [description]
   */
  static webglAvailable() {
    // webgl的绘图是建立在显卡的基础上的，如果这台计算机没有显卡，或者浏览器不支持和显卡的通信，webgl上下文的建立将会失败
    let canvas = document.createElement('canvas')
    try {
      let webglExist = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      )
      if (webglExist) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  /**
   * 递归查询子集ID  TYPE :ARRAY
   * **/
  static recursiveQueryData(data) {
    let itemArray = []
    if (data.children.length > 0) {
      let dataArray = data.children
      if (dataArray.length > 0) {
        dataArray.forEach((item, index) => {
          itemArray = itemArray.concat(this.recursiveQueryData(item))
        })
        return itemArray
      }
    } else {
      itemArray.push(data.id)
    }
    return itemArray
  }
  /**
   * 获取用户IP
   * */
  static getUserIP(onNewIP) {
    let MyPeerConnection =
      window.RTCPeerConnection ||
      window.mozRTCPeerConnection ||
      window.webkitRTCPeerConnection
    let pc = new MyPeerConnection({
      iceServers: []
    })
    let noop = () => {}
    let localIPs = {}
    let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
    let iterateIP = ip => {
      if (!localIPs[ip]) onNewIP(ip)
      localIPs[ip] = true
    }
    pc.createDataChannel('')
    pc.createOffer()
      .then(sdp => {
        sdp.sdp.split('\n').forEach(function (line) {
          if (line.indexOf('candidate') < 0) return
          line.match(ipRegex).forEach(iterateIP)
        })
        pc.setLocalDescription(sdp, noop, noop)
      })
      .catch(reason => {})
    pc.onicecandidate = ice => {
      if (
        !ice ||
        !ice.candidate ||
        !ice.candidate.candidate ||
        !ice.candidate.candidate.match(ipRegex)
      ) {
        return
      }
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
    }
  }
  // 登录
  static goLogin() {
    AppUrlConfig.configServer().then(res => {
      let href = window.location.href.split(':')
      let loginUrl = res.data.ConfigServer.loginUrl
      window.location.href = `${href[0]}:${href[1]}:${loginUrl}`
    })
  }
  static goPortal() {
    AppUrlConfig.configServer().then(res => {
      let href = window.location.href.split(':')
      let sendBack = res.data.ConfigServer.sendBack
      window.location.href = `${href[0]}:${href[1]}:${sendBack}`
    })
  }
}
