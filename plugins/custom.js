import Vue from 'vue'

Vue.prototype.$FieldNumberOnly = function (e) {
  const key = e.keyCode ? e.keyCode : e.which
  if (isNaN(String.fromCharCode(key)) && key !== 8 && key !== 46 && key !== 37 && key !== 39) {
    e.preventDefault()
    return false
  }
}

Vue.prototype.$FieldClearNumber = (no) => {
  return no ? parseInt(no.split(',').join('')
    .split('.').join('')) : 0
}
