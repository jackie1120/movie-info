import Vue from 'vue'

const requireContext = require.context(
  './global',
  true,
  /\.vue$/
)

requireContext.keys().forEach(fileName => {
  const componentConfig = requireContext(fileName)
  Vue.component(
    componentConfig.name || componentConfig.default.name,
    componentConfig.default || componentConfig
  )
})
