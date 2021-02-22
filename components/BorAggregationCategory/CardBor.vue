<template>
  <div class="md:flex-1 mx-2 my-3">
    <div class=" rounded-lg p-6 shadow-lg bg-white">
      <div class="text-center">
        <div class="font-bold">
          {{ bor.name.toUpperCase() }}
          <div class="tooltip pl-1">
            <FontAwesomeIcon class="inline-block mr-2 cursor-pointer text-gray-500" :icon="icons.faInfoCircle" />
            <span class="tooltiptext text-xs">
              {{ bor.tooltip }}
            </span>
          </div>
        </div>
      </div>
      <div class="charts-container flex flex-wrap md:flex-row md:flex-nowrap">
        <div class="set-size pie-wrapper style-2">
          <div class="label">
            <div class="text-3xl">
              {{ bor.bor }}<span class="smaller">%</span>
            </div>
            <div class="growth flex flex-row align-items-center justify-center" :class="[bor.growth <= 0 ? 'down' : 'up']">
              <div class="growth-icon rounded-full mt-1">
                <FontAwesomeIcon class="inline-block text-white mb-1 cursor-pointer text-gray-500" :icon="bor.growth <= 0 ? icons.faAngleDoubleDown : icons.faAngleDoubleUp" />
              </div>
              <div class="growth-label ml-1" style="font-size: 16px;">
                {{ Math.abs(bor.growth) }}%
              </div>
            </div>
            <div class="font-normal mt-2" style="font-size: 14px;">
              TT {{ bor.name }} Terisi
            </div>
          </div>

          <div class="pie" style="transform: rotate(90deg);" :style="[bor.bor <= 50 ? {} : {'clip': 'rect(auto, auto, auto, auto)'}]">
            <div class="left-side half-circle" :style="{ transform: 'rotate(' + bor.bor * 3.6 + 'deg)', 'border-color': bor.color } " />
            <div class="right-side half-circle" :style="[bor.bor <= 50 ? {'display': 'none'} : {'transform': 'rotate(180deg)', 'border-color': bor.color}]" />
          </div>
          <div class="shadow" />
        </div>
        <div class="bed my-auto mx-auto">
          <FontAwesomeIcon class="inline-block mr-2 cursor-pointer text-gray-500" :icon="icons.faBed" />
          <div class="text-3xl font-bold">
            {{ bor.available.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") }}
          </div>
          <div style="font-size: 14px;">
            TT Tersedia
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faPlayCircle, faAngleDoubleUp, faInfoCircle, faAngleDoubleDown, faBed } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'CardBor',
  components: {
    // CardLoader: () => import('./CardLoader')
  },
  props: {
    bor: {
      type: Object,
      default: () => {
        return {
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#ffffff',
          tooltip: ''
        }
      }
    },
    totalBed: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      isOpenTooltip: false,
      isLoading: true,
      icons: {
        faPlayCircle,
        faAngleDoubleUp,
        faAngleDoubleDown,
        faInfoCircle,
        faBed
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 .growth .growth-icon {
   height: 12.5px;
   width: 12.5px;
   color: white;
 }

 .growth .growth-icon svg {
   margin-bottom: 22px;
   font-size: 10px;
 }

 .growth.up .growth-icon {
   background-color: #a82020;
 }

 .growth.up .growth-label {
   color: #a82020;
 }

 .growth.down .growth-icon {
   background-color: #33ad3f;
 }

 .growth.down .growth-label {
   color: #33ad3f;
 }

 .bed {
   font-size: 22px;
 }

 .bed svg {
   font-size: 24px;
   margin-top: 20px;
 }

  // -- vars
  $bg-color: #34495e;
  $default-size: 1.3em;
  $label-font-size: $default-size / 7;
  $label-font-size-redo: $default-size * 4;

  // -- mixins
  @mixin size($width, $height) {
      height: $height;
      width: $width;
  }

  @mixin draw-progress($progress, $color) {
      .pie {
          .half-circle {
              border-color: $color;
          }

          .left-side {
              transform: rotate($progress * 3.6deg);
          }

          @if $progress <=50 {
              .right-side {
                  display: none;
              }
          }

          @else {
              clip: rect(auto, auto, auto, auto);

              .right-side {
                  transform: rotate(180deg);
              }
          }
      }
  }

  @mixin draw-progress--solid($progress, $color, $bg-color) {
      background: linear-gradient(to right, $color 50%, $bg-color 50%);

      &:before {
          @if $progress <=50 {
              background: $bg-color;
              transform: rotate((100 - (50 - $progress)) / 100 * 360deg * -1);
          }

          @else {
              background: $color;
              transform: rotate((100 - $progress) / 100 * 360deg);
          }
      }
  }

  .set-size {
      font-size: 10em;
  }

  .charts-container {
      &:after {
          clear: both;
          content: '';
          display: table;
      }
  }

  .pie-wrapper {
      @include size($default-size, $default-size);
      margin: 15px;
      position: relative;

      &:nth-child(3n + 1) {
          clear: both;
      }

      .pie {
          @include size(100%, 100%);
          clip: rect(0, $default-size, $default-size, $default-size / 2);
          left: 0;
          position: absolute;
          top: 0;

          .half-circle {
              @include size(100%, 100%);
              border: ($default-size / 13) solid #3498db;
              border-radius: 50%;
              clip: rect(0, $default-size / 2, $default-size, 0);
              left: 0;
              position: absolute;
              top: 0;
          }
      }

      .label {
          background: $bg-color;
          border-radius: 50%;
          bottom: $label-font-size-redo / 10;
          color: #000000;
          cursor: default;
          display: block;
          font-weight: bold;
          font-size: $label-font-size;
          left: $label-font-size-redo / 10;
          // line-height: $label-font-size-redo * .70;
          position: absolute;
          right: $label-font-size-redo / 10;
          text-align: center;
          top: $label-font-size-redo / 3;

          .smaller {
              color: #bdc3c7;
              font-size: .45em;
              padding-bottom: 20px;
              vertical-align: super;
          }
      }

      .shadow {
          @include size(100%, 100%);
          border: $default-size / 13 solid #bdc3c7;
          border-radius: 50%;
      }

      &.style-2 {
          .label {
              background: none;
              color: #000000;

              .smaller {
                  color: #000000;
              }
          }
      }
  }

  /* Tooltip container */
  .tooltip {
    position: absolute;
    display: inline-block;
    font-weight: normal !important;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 280px;
    background-color: #ffffff;
    color:#000;
    text-align: left;
    padding: 10px;
    border-radius: 6px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -230px; /* Use half of the width (120/2 = 60), to center the tooltip */
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.14);
    font-weight: normal;
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    right: 47px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #f5f8fa transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

</style>
