
export function getCurrentTime(): string {
    const date = new Date(); // 创建一个新的Date对象，它会被设置为当前时间
    let hours: number | string = date.getHours(); // 获取小时
    let minutes: number | string = date.getMinutes(); // 获取分钟
    let seconds: number | string = date.getSeconds(); // 获取秒
    // 使用padStart方法确保数字总是两位数
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours + ':' + minutes + ':' + seconds; // 返回格式化后的时间
}
export const getTime = () => {
    let message = '' // 登录成功后提示信息
    const hours = new Date().getHours() // 获取当前小时
    if (hours >= 5 && hours <= 9) {
        message = '早上'
    } else if (hours <= 12) {
        message = '上午'
    } else if (hours <= 18) {
        message = '下午'
    } else {
        message = '晚上'
    }
    return message
}