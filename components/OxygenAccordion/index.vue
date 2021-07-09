<template>
  <Accordion id="hospitalList" open>
    <template #header>
      <h2 class="text-2xl font-bold leading-tight">
        Lokasi Agen Tabung Oksigen
      </h2>
    </template>
    <template #description>
      <p class="mb-6 mt-2 text-base opacity-50 leading-tight">
        Berikut ini adalah daftar agen oksigen, baik agen isi ulang maupun tabung oksigen yang ada di Jawa Barat. Silakan gunakan fitur filter untuk mencari agen oksigen di daerah Anda.
      </p>
    </template>
    <br>
    <template #content>
      <div>
        <StringSearchQuery v-model="searchString" class="mb-4" @search="performFiltering" />
        <ContactList v-if="filteredOxygen && filteredOxygen.length" :items="filteredOxygen">
          <template v-slot:list-item="hospitalItem">
            <OxygenListItem v-bind="hospitalItem" />
          </template>
        </ContactList>
        <EmptyData v-else />
      </div>
    </template>
  </Accordion>
</template>

<script>
import { mapState } from 'vuex'
import StringSearchQuery from '../StringSearchQuery'
import EmptyData from '../ContactsAccordion/EmptyData'
import OxygenListItem from './OxygenListItem'
import ContactList from '~/components/ContactList'

export default {
  components: {
    Accordion: () => import('../ContactsAccordion/Accordion'),
    ContactList,
    OxygenListItem,
    StringSearchQuery,
    EmptyData
  },
  data () {
    return {
      filteredOxygen: null,
      searchString: ''
    }
  },
  computed: {
    ...mapState('oxygen', {
      oxygens: 'items'
    })
  },
  watch: {
    oxygens: {
      immediate: true,
      deep: true,
      handler (arr) {
        if (Array.isArray(arr)) {
          this.filteredOxygen = JSON.parse(JSON.stringify(arr))
        } else {
          this.filteredOxygen = []
        }
      }
    }
  },
  methods: {
    performFiltering (str) {
      if (!this.oxygens) {
        this.filteredOxygen = null
      }
      if (str) {
        const myArr = str.split(' ')
        this.filteredOxygen = this.oxygens.filter((cc) => {
          return myArr.every((word) => {
            return cc.address.toLowerCase().includes(word.toLowerCase()) ||
              cc.name.toLowerCase().includes(word.toLowerCase()) ||
              cc.itemType.toLowerCase().includes(word.toLowerCase())
          })
        })
      } else {
        this.filteredOxygen = this.oxygens
      }
    }
  }
}
</script>
