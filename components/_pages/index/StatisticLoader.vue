<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  functional: true,
  props: [
    'label',
    'size',
    'isPending',
    'processed',
    'processedPercentage',
    'finished',
    'finishedPercentage',
    'total',
    'processedLabel',
    'finishedLabel',
    'totalLabel'
  ],
  render (h, context) {
    const staticClass = context.data.staticClass || ''
    const staticStyle = context.data.staticStyle || {}
    const containerProps = {
      class: ['bg-white rounded-lg mb-8 xl:mb-0 xl:w-1/2 lg:shadow-md lg:border-none border border-solid border-gray-300', staticClass],
      style: staticStyle
    }
    return (
      <div {...containerProps}>
        <div style={`display: ${context.props.isPending ? 'block' : 'none'}`} class="p-5">
          <ContentLoader
            speed={2}
            width={400}
            height={80}
            primaryColor="rgba(0,0,0,0.075)"
            secondaryColor="rgba(0,0,0,0.025)"
            style="max-width: 400px;">
            <rect x={0} y={0} rx={8} ry={6} width="50%" height="16"></rect>
            <rect x={0} y={30} rx={8} ry={6} width="66%" height="16"></rect>
            <rect x={0} y={64} rx={8} ry={6} width="20%" height="16"></rect>
          </ContentLoader></div>
        <div style={`display: ${context.props.isPending ? 'none' : 'block'}`}>
          <h3 class="p-5" style="font-size: 23px !important;">
            <b>
              { context.props.label }
            </b>
          </h3>
          <hr />
          <div class="p-5 flex flex-col md:flex-row md:justify-start md:items-end leading-none">
            <div class="mr-8 mb-4 md:mb-0">
              <span
                class="text-4xl font-bold inline-block"
                style="color: #2DAC55; min-width: 2ch;">
                { context.props.processed }
              </span>
              <span
                class="text-sm font-bold ml-2"
                style="color: #000000;">
                { `(${context.props.processedPercentage}% )` }
              </span>
              <p
                class="mt-2 text-base whitespace-no-wrap"
                style="color: #8A8A8A;">
                { context.props.processedLabel }
              </p>
            </div>
            <div class="mr-8 mb-4 md:mb-0">
              <span
                class="text-2xl font-bold inline-block"
                style="color: #2DAC55; min-width: 2ch;">
                { context.props.finished }
              </span>
              <span
                class="text-sm font-bold ml-2"
                style="color: #000000;">
                { `(${context.props.finishedPercentage}%)` }
              </span>
              <p
                class="mt-2 text-base whitespace-no-wrap "
                style="color: #8A8A8A;">
                { context.props.finishedLabel }
              </p>
            </div>
            <div class="mr-8 mb-4 md:mb-0">
              <span
                class="text-2xl font-bold inline-block"
                style="color: #2DAC55; min-width: 2ch;">
                { context.props.total }
              </span>
              <p
                class="mt-2 text-base whitespace-no-wrap"
                style="color: #8A8A8A;">
                { context.props.totalLabel }
              </p>
            </div>
          </div>
          { /* context.slots().footnote */ }
        </div>
      </div>
    )
  }
}
</script>
