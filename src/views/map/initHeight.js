function resizeMap(el) {
    const boxHeight = document.body.clientHeight
    el.style.height = boxHeight + 'px'
  }
export default {
    inserted(el, binding) {
        let resizeObj = null
        let resizeTime = 1000
        resizeMap(el)
        window.onresize = function (params) {
            if (resizeObj) {return}
            resizeObj = setTimeout(() => {
                resizeObj = null
                resizeMap(el)
            }, resizeTime);
        }
    }
}
