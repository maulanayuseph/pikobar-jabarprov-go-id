<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  functional: true,
  props: ['size', 'isPending', 'label'],
  render (h, context) {
    const staticClass = context.data.staticClass || ''
    const staticStyle = context.data.staticStyle || {}
    const containerProps = {
      class: ['p-5 rounded-lg border border-solid border-gray-300 bg-white shadow-md', staticClass],
      style: staticStyle
    }
    return (
      <div {...containerProps}>
        <div
          style={`display: ${context.props.isPending ? 'block' : 'none'}`}>
          <ContentLoader
            speed={2}
            width={400}
            height={80}
            primaryColor="rgba(214, 210, 210,0.6)"
            secondaryColor="rgba(214, 210, 210,1)"
            style="max-width: 400px;">
            <rect x={0} y={0} rx={8} ry={6} width="50%" height="16"></rect>
            <rect x={0} y={30} rx={8} ry={6} width="66%" height="16"></rect>
            <rect x={0} y={64} rx={8} ry={6} width="20%" height="16"></rect>
          </ContentLoader>
        </div>
        <div
          style={`display: ${context.props.isPending ? 'none' : 'block'}`}>
          <h4 class="text-gray-500 text-center">
            <b class="uppercase">{ context.props.label }</b>
          </h4>
          { context.children }
        </div>
      </div>
    )
  }
}
</script>
