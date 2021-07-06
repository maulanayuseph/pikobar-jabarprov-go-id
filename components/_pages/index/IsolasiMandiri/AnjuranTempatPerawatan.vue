<template>
  <div
    class="table-ap"
    :style="{
      gridTemplateColumns: `repeat(${numOfColumns}, 1fr)`
    }"
  >
    <template v-for="i in repeatCount">
      <template v-for="colIndex in numOfColumns">
        <div
          :key="`table:${getTableIndex(i, colIndex)}:title`"
          class="table-ap__col-header"
        >
          <strong>
            {{ getTableTitle(i, colIndex) }}
          </strong>
        </div>
      </template>
      <template v-for="rowIndex in maxRows">
        <template v-for="colIndex in numOfColumns">
          <div
            :key="`table:${getTableIndex(i, colIndex)}:row:${rowIndex}`"
            class="table-ap__col-body"
          >
            <p
              :class="{
                'table-ap__col-sect': true,
                'table-ap__col-sect--last': rowIndex === maxRows
              }"
            >
              <strong class="table-ap__col-sect__title">
                {{ getTableSectionTitle(i, colIndex, rowIndex) }}
              </strong>
              <ul class="table-ap__col-sect__list">
                <li
                  v-for="(listItem, listItemIndex) in getTableSectionBody(i, colIndex, rowIndex)"
                  :key="listItemIndex"
                >
                  <p v-html="listItem" />
                </li>
              </ul>
            </p>
            <br>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import contentTables from './anjuran-tempat-perawatan'
export default {
  data: () => ({
    numOfColumns: 1,
    contentTables
  }),
  computed: {
    repeatCount () {
      if (this.numOfColumns <= 0) {
        return 0
      }
      return Math.ceil(this.contentTables.length / this.numOfColumns)
    },
    readyToRender () {
      return this.numOfColumns > 0
    },
    contentTitles () {
      return this.contentTables.map(c => c.title)
    },
    maxRows () {
      return this.contentTables.reduce((count, c) => {
        if (c.sections.length > count) {
          count = c.sections.length
        }
        return count
      }, 0)
    },
    contentSections () {
      const sections = []
      let i = 0
      while (i < this.maxRows) {
        this.contentTables.forEach((c) => {
          const sect = c.sections[i]
          sect && sections.push(sect)
        })
        i++
      }
      return sections
    }
  },
  mounted () {
    this.onWindowResize()
    window.removeEventListener('resize', this.onWindowResize)
    setTimeout(() => {
      window.addEventListener('resize', this.onWindowResize)
    }, 50)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  },
  methods: {
    onWindowResize () {
      if (window.innerWidth < 640) {
        this.numOfColumns = 1
      } else if (window.innerWidth < 1024) {
        this.numOfColumns = 2
      } else {
        this.numOfColumns = 4
      }
    },
    getTableIndex (i, columnIndex) {
      return (columnIndex - 1) + (this.numOfColumns * (i - 1))
    },
    getTableTitle (i, columnIndex) {
      const j = this.getTableIndex(i, columnIndex)
      return this.contentTables[j]?.title || ''
    },
    getTableSectionTitle (i, columnIndex, sectionIndex) {
      const j = this.getTableIndex(i, columnIndex)
      return this.contentTables[j]?.sections[sectionIndex - 1]?.title || ''
    },
    getTableSectionBody (i, columnIndex, sectionIndex) {
      const j = this.getTableIndex(i, columnIndex)
      return this.contentTables[j]?.sections[sectionIndex - 1]?.body || []
    }
  }
}
</script>

<style lang="scss" scoped>
.table-ap {
  display: grid;
  gap: 0 1rem;
  @apply -mt-4;

  &__col-header {
    @apply px-4 py-2 mt-4
    bg-green-600
    text-lg text-white;
  }

  &__col-header,
  &__col-body {
    @apply block
    border border-solid border-green-600;
  }

  &__col-body {
    @apply border-t-0 border-b-0;
  }

  &__col-sect {
    @apply h-full px-4 py-2
    border-b border-solid border-gray-400;

    &--last {
      @apply border-b border-solid border-green-600;
    }

    &__title {
      @apply block text-green-600;
    }

    &__divider {
      @apply -mx-4;
    }

    ul {
      @apply mt-4
      text-gray-800 leading-normal;
    }

    ul > li + li {
      @apply mt-4;
    }
  }
}
</style>
