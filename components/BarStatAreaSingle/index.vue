<template>
  <div>
    <div class="flex flex-row items-stretch mb-4">
      <button
        class="button-selector mr-2"
        :active="stat.isActiveHarian"
        @click="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" /> Angka Harian
      </button>
      <button
        class="button-selector"
        :active="stat.isActiveAkumulatif"
        @click="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" /> Kumulatif
      </button>
    </div>

    <section v-if="stat.isActiveHarian">
      <div
        class="bg-white overflow-hidden rounded-lg shadow-md"
      >
        <div class="flex">
          <h4 class="p-5 text-xl w-2/3">
            <b>Angka Harian Penambahan Kasus COVID-19</b>
          </h4>
          <div class="flex flex-row items-stretch mb-4 w-1/3 pr-2" style="margin: auto;">
            <select
              v-model="selectedListWilayah"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div>&nbsp;</div>
            <!-- <div class="card-content">
              <div class="daterange-wrapper">
                <vue-rangedate-picker
                  righttoleft="true"
                />
              </div>
            </div> -->
            <select
              v-model="selectedListWaktu"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWaktu($event.target.value)"
            >
              <option
                v-for="list in optionListWaktu"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
          </div>
        </div>
        <hr>
        <GChart
          type="LineChart"
          class="mb-4"
          :data="ChartHarianData"
          :options="ChartHarianOptions"
        />
      </div>
    </section>

    <section v-if="stat.isActiveAkumulatif">
      <div
        class="bg-white overflow-hidden rounded-lg shadow-md"
      >
        <div class="flex">
          <h4 class="p-5 text-xl w-1/2">
            <b>Angka Kumulatif Penambahan Kasus COVID-19</b>
          </h4>
          <div class="flex flex-row items-stretch mb-4 w-1/3 pr-2" style="margin: auto;">
            <select
              v-model="selectedListWilayah"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div>&nbsp;</div>
            <!-- <div class="card-content">
              <div class="daterange-wrapper">
                <vue-rangedate-picker
                  righttoleft="true"
                />
              </div>
            </div> -->
            <select
              v-model="selectedListWaktu"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWaktu($event.target.value)"
            >
              <option
                v-for="list in optionListWaktu"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
          </div>
        </div>
        <hr>
        <GChart
          type="LineChart"
          class="mb-4"
          :data="ChartKumulatifData"
          :options="ChartKumulatifOptions"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'
// import VueRangedatePicker from 'vue-rangedate-picker'
// import moment from 'moment'

export default {
  name: 'BarStatAreaSingle',
  components: {
    GChart,
    FontAwesomeIcon
    // VueRangedatePicker
  },
  props: {
    propsDataNasionalHarianKumulatif: {
      type: Array,
      default: () => ([])
    },
    propsDataRekapitulasiJabarProv: {
      type: Object,
      default: () => ({})
    },
    propsDataRekapitulasiJabarKab: {
      type: Array,
      default: () => ([])
    },
    propsDataRekapitulasiJabarHarianProv: {
      type: Array,
      default: () => ([])
    },
    propsDataRekapitulasiJabarKumulatifProv: {
      type: Array,
      default: () => ([])
    },
    propsDataRekapitulasiJabarHarianKab: {
      type: Array,
      default: () => ([])
    },
    propsDataRekapitulasiJabarKumulatifKab: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      stat: {
        isActiveHarian: true,
        isActiveAkumulatif: false
      },
      fontChartBar: faChartBar,
      fontChartLine: faChartLine,
      jsonDataNasionalHarianKumulatif: [],
      jsonDataProvinsiHarian: [],
      jsonDataProvinsiKumulatif: [],
      jsonDataKabupatenHarian: [],
      jsonDataKabupatenKumulatif: [],
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kab. Bandung',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3207',
          nama: 'Kab. Ciamis',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3203',
          nama: 'Kab. Cianjur',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3209',
          nama: 'Kab. Cirebon',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3205',
          nama: 'Kab. Garut',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3212',
          nama: 'Kab. Indramayu',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3215',
          nama: 'Kab. Karawang',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3208',
          nama: 'Kab. Kuningan',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3210',
          nama: 'Kab. Majalengka',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3218',
          nama: 'Kab. Pangandaran',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3214',
          nama: 'Kab. Purwarkarta',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3213',
          nama: 'Kab. Subang',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3202',
          nama: 'Kab. Sukabumi',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3211',
          nama: 'Kab. Sumedang',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3206',
          nama: 'Kab. Tasikmalaya',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3273',
          nama: 'Kota Bandung',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3279',
          nama: 'Kota Banjar',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3271',
          nama: 'Kota Bogor',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3276',
          nama: 'Kota Depok',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya',
          odp_proses: 0,
          odp_selesai: 0,
          odp_total: 0,
          pdp_proses: 0,
          pdp_selesai: 0,
          pdp_total: 0,
          positif: 0,
          positif_persentase: 0,
          sembuh: 0,
          meninggal: 0,
          dataHarian: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Kasus Positif',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Sembuh',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Meninggal',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '', 0, '']
          ]
        }
      ],
      ChartHarianData: [
        [
          'Tanggal',
          'Kasus Positif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      ChartKumulatifData: [
        [
          'Tanggal',
          'Kasus Positif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      ChartHarianOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#FF4A4B', '#03B167', '#9C0000'],
        legend: {
          position: 'none'
        },
        // isStacked: true,
        // seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '90%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      ChartKumulatifOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#FF4A4B', '#03B167', '#9C0000'],
        legend: {
          position: 'none'
        },
        // isStacked: true,
        // seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '90%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      optionListWilayah: [
        'Indonesia',
        'Jawa Barat',
        'Kab. Bandung',
        'Kab. Bandung Barat',
        'Kab. Bekasi',
        'Kab. Bogor',
        'Kab. Ciamis',
        'Kab. Cianjur',
        'Kab. Cirebon',
        'Kab. Garut',
        'Kab. Indramayu',
        'Kab. Karawang',
        'Kab. Kuningan',
        'Kab. Majalengka',
        'Kab. Pangandaran',
        'Kab. Purwakarta',
        'Kab. Subang',
        'Kab. Sukabumi',
        'Kab. Sumedang',
        'Kab. Tasikmalaya',
        'Kota Bandung',
        'Kota Banjar',
        'Kota Bekasi',
        'Kota Bogor',
        'Kota Cimahi',
        'Kota Cirebon',
        'Kota Depok',
        'Kota Sukabumi',
        'Kota Tasikmalaya'
      ],
      optionListWaktu: [
        '1 Minggu Terakhir',
        '1 Bulan Terakhir',
        'Seluruh Waktu'
        // 'Pilih Rentan Waktu'
      ],
      selectedListWilayah: 'Jawa Barat',
      selectedListWaktu: 'Seluruh Waktu',
      startDate: new Date(),
      endDate: new Date()
      // daterange: {
      //   startDate: '2017-09-05',
      //   endDate: '2017-09-15',
      //   locale: {
      //     direction: 'ltr',
      //     format: 'DD-MM-YYYY',
      //     separator: ' - ',
      //     applyLabel: 'Apply',
      //     cancelLabel: 'Cancel',
      //     weekLabel: 'W',
      //     customRangeLabel: 'Custom Range',
      //     daysOfWeek: moment.weekdaysMin(),
      //     monthNames: moment.monthsShort(),
      //     firstDay: 1
      //   }
      // }
    }
  },
  watch: {
    propsDataNasionalHarianKumulatif () {
      this.jsonDataNasionalHarianKumulatif = this.propsDataNasionalHarianKumulatif
    },
    propsDataRekapitulasiJabarHarianProv () {
      this.jsonDataProvinsiHarian = this.propsDataRekapitulasiJabarHarianProv
      this.changeData()
    },
    propsDataRekapitulasiJabarKumulatifProv () {
      this.jsonDataProvinsiKumulatif = this.propsDataRekapitulasiJabarKumulatifProv
    },
    propsDataRekapitulasiJabarHarianKab () {
      this.jsonDataKabupatenHarian = this.propsDataRekapitulasiJabarHarianKab
      this.groupDataKabupatenHarian()
    },
    propsDataRekapitulasiJabarKumulatifKab () {
      this.jsonDataKabupatenKumulatif = this.propsDataRekapitulasiJabarKumulatifKab
      this.groupDataKabupatenKumulatif()
    }
  },
  mounted () {
    this.startDate = this.startDate.setDate(this.endDate.getDate() - 14)
    this.endDate = this.endDate.setDate(this.endDate.getDate() - 0)
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else if (str === '') {
        return 0
      } else {
        return str
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
    },
    formatDateYMD (date) {
      const d = new Date(date)
      let currDate = d.getDate()
      let currMonth = d.getMonth() + 1
      const currYear = d.getFullYear()
      if (currMonth < 10) {
        currMonth = '0' + currMonth
      }
      if (currDate < 10) {
        currDate = '0' + currDate
      }
      return currYear + '-' + currMonth + '-' + currDate
    },
    compareValues (key, order = 'asc') {
      return function innerSort (a, b) {
        // eslint-disable-next-line no-prototype-builtins
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    },
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
      this.changeData()
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
      this.changeData()
    },
    changeFilterWilayah (stat) {
      this.selectedListWilayah = stat
      this.changeData()
    },
    changeFilterWaktu (stat) {
      this.selectedListWaktu = stat
      this.changeData()
    },
    changeData () {
      this.ChartHarianData = [
        [
          'Tanggal',
          'Kasus Positif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ]
      this.ChartKumulatifData = [
        [
          'Tanggal',
          'Kasus Positif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ]
      if (this.stat.isActiveHarian === true) {
        if (this.selectedListWilayah === 'Jawa Barat') {
          this.fetchDataProvinsiHarian()
        } else if (this.selectedListWilayah === 'Indonesia') {
          this.fetchDataNasionalHarian()
        } else {
          this.fetchDataKabupatenHarian()
        }
      } else if (this.stat.isActiveAkumulatif === true) {
        if (this.selectedListWilayah === 'Jawa Barat') {
          this.fetchDataProvinsiKumulatif()
        } else if (this.selectedListWilayah === 'Indonesia') {
          this.fetchDataNasionalKumulatif()
        } else {
          this.fetchDataKabupatenKumulatif()
        }
      }
    },
    groupDataKabupatenHarian () {
      const self = this
      let max = 0
      for (let j = 0; j < self.jsonDataKota.length; j++) {
        for (let i = 0; i < self.jsonDataKabupatenHarian.length; i++) {
          if (self.jsonDataKabupatenHarian[i].kode_kab === self.jsonDataKota[j].kode) {
            self.jsonDataKota[j].dataHarian.push(self.jsonDataKabupatenHarian[i])
          }
          if (i === self.jsonDataKabupatenHarian.length - 1) {
            self.jsonDataKota[j].dataHarian.splice(1, 1)
          }
          if (self.jsonDataKabupatenHarian[i].positif > max) {
            max = self.jsonDataKabupatenHarian[i].positif
          }
        }
      }
      // self.barChartKotaOptions.vAxis.viewWindow.max = max + (Math.ceil(max / 5))
    },
    groupDataKabupatenKumulatif () {
      const self = this
      let max = 0
      for (let j = 0; j < self.jsonDataKota.length; j++) {
        for (let i = 0; i < self.jsonDataKabupatenKumulatif.length; i++) {
          if (self.jsonDataKabupatenKumulatif[i].kode_kab === self.jsonDataKota[j].kode) {
            self.jsonDataKota[j].dataAkumulatif.push(self.jsonDataKabupatenKumulatif[i])
          }
          if (i === self.jsonDataKabupatenKumulatif.length - 1) {
            self.jsonDataKota[j].dataAkumulatif.splice(1, 1)
          }
          if (self.jsonDataKabupatenKumulatif[i].positif > max) {
            max = self.jsonDataKabupatenKumulatif[i].positif
          }
        }
      }
      // self.lineChartKotaOptions.vAxis.viewWindow.max = max + (Math.ceil(max / 5))
    },
    fetchDataNasionalHarian () {
      const self = this
      let startNum = 0
      let endNum = 0

      // filter date
      if (this.selectedListWaktu === 'Seluruh Waktu') {
        startNum = 0
        endNum = self.jsonDataNasionalHarianKumulatif.length
      } else if (this.selectedListWaktu === '1 Minggu Terakhir') {
        startNum = self.jsonDataNasionalHarianKumulatif.length - 8
        endNum = self.jsonDataNasionalHarianKumulatif.length
      } else if (this.selectedListWaktu === '1 Bulan Terakhir') {
        startNum = self.jsonDataNasionalHarianKumulatif.length - 31
        endNum = self.jsonDataNasionalHarianKumulatif.length
      } else if (this.selectedListWaktu === 'Pilih Rentan Waktu') {
        this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
          if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.startDate)) {
            startNum = index
          }
          if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.endDate)) {
            endNum = index
          }
        })
        if (endNum === 0) {
          endNum = this.jsonDataNasionalHarianKumulatif.length - 1
        }
      }

      // get data
      for (let i = startNum; i < endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
        // by Harian
        let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipHarian += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + '</b></td></tr>'
        tooltipHarian += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusSembuhperHari + '</b></td></tr>'
        tooltipHarian += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusMeninggalperHari + '</b></td></tr>'
        tooltipHarian += '</table>'
        self.ChartHarianData.push([
          self.formatDate(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari, tooltipHarian,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusSembuhperHari, tooltipHarian,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusMeninggalperHari, tooltipHarian
        ])
      }
      self.ChartHarianData.splice(1, 1)
    },
    fetchDataNasionalKumulatif () {
      const self = this
      let startNum = 0
      let endNum = 0

      // filter date
      if (this.selectedListWaktu === 'Seluruh Waktu') {
        startNum = 0
        endNum = self.jsonDataNasionalHarianKumulatif.length
      } else if (this.selectedListWaktu === '1 Minggu Terakhir') {
        startNum = self.jsonDataNasionalHarianKumulatif.length - 8
        endNum = self.jsonDataNasionalHarianKumulatif.length
      } else if (this.selectedListWaktu === '1 Bulan Terakhir') {
        startNum = self.jsonDataNasionalHarianKumulatif.length - 31
        endNum = self.jsonDataNasionalHarianKumulatif.length
      } else if (this.selectedListWaktu === 'Pilih Rentan Waktu') {
        this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
          if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.startDate)) {
            startNum = index
          }
          if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.endDate)) {
            endNum = index
          }
        })
        if (endNum === 0) {
          endNum = this.jsonDataNasionalHarianKumulatif.length - 1
        }
      }

      // get data
      for (let i = startNum; i < endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
        // by Akumulatif
        let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipKumulatif += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusSembuhperHari + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusMeninggalperHari + '</b></td></tr>'
        tooltipKumulatif += '</table>'
        self.ChartKumulatifData.push([
          self.formatDate(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusKumulatif, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlahPasienSembuh, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlahPasienMeninggal, tooltipKumulatif
        ])
      }
      self.ChartKumulatifData.splice(1, 1)
    },
    fetchDataProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // filter date
      if (this.selectedListWaktu === 'Seluruh Waktu') {
        startNum = 0
        endNum = self.jsonDataProvinsiHarian.length
      } else if (this.selectedListWaktu === '1 Minggu Terakhir') {
        startNum = self.jsonDataProvinsiHarian.length - 8
        endNum = self.jsonDataProvinsiHarian.length
      } else if (this.selectedListWaktu === '1 Bulan Terakhir') {
        startNum = self.jsonDataProvinsiHarian.length - 31
        endNum = self.jsonDataProvinsiHarian.length
      } else if (this.selectedListWaktu === 'Pilih Rentan Waktu') {
        this.jsonDataProvinsiHarian.forEach((element, index) => {
          if (element.tanggal === this.formatDateYMD(this.startDate)) {
            startNum = index
          }
          if (element.tanggal === this.formatDateYMD(this.endDate)) {
            endNum = index
          }
        })
        if (endNum === 0) {
          endNum = this.jsonDataProvinsiHarian.length - 1
        }
      }

      // get data
      let stop = false
      for (let i = startNum; i < endNum; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].positif + '</b></td></tr>'
          tooltipHarian += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].sembuh + '</b></td></tr>'
          tooltipHarian += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].meninggal + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartHarianData.push([
            self.formatDate(date),
            self.jsonDataProvinsiHarian[i].positif, tooltipHarian,
            self.jsonDataProvinsiHarian[i].sembuh, tooltipHarian,
            self.jsonDataProvinsiHarian[i].meninggal, tooltipHarian
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.ChartHarianData.splice(1, 1)
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // filter date
      if (this.selectedListWaktu === 'Seluruh Waktu') {
        startNum = 0
        endNum = self.jsonDataProvinsiKumulatif.length
      } else if (this.selectedListWaktu === '1 Minggu Terakhir') {
        startNum = self.jsonDataProvinsiKumulatif.length - 8
        endNum = self.jsonDataProvinsiKumulatif.length
      } else if (this.selectedListWaktu === '1 Bulan Terakhir') {
        startNum = self.jsonDataProvinsiKumulatif.length - 31
        endNum = self.jsonDataProvinsiKumulatif.length
      } else if (this.selectedListWaktu === 'Pilih Rentan Waktu') {
        this.jsonDataProvinsiKumulatif.forEach((element, index) => {
          if (element.tanggal === this.formatDateYMD(this.startDate)) {
            startNum = index
          }
          if (element.tanggal === this.formatDateYMD(this.endDate)) {
            endNum = index
          }
        })
        if (endNum === 0) {
          endNum = this.jsonDataProvinsiKumulatif.length - 1
        }
      }

      // get data
      let stop = false
      for (let i = startNum; i < endNum; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipKumulatif += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].positif + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].sembuh + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].meninggal + '</b></td></tr>'
          tooltipKumulatif += '</table>'
          self.ChartKumulatifData.push([
            self.formatDate(date),
            self.jsonDataProvinsiKumulatif[i].positif, tooltipKumulatif,
            self.jsonDataProvinsiKumulatif[i].sembuh, tooltipKumulatif,
            self.jsonDataProvinsiKumulatif[i].meninggal, tooltipKumulatif
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.ChartKumulatifData.splice(1, 1)
    },
    fetchDataKabupatenHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0
      let indexKota = 0

      // filter date
      if (this.selectedListWaktu === 'Seluruh Waktu') {
        startNum = 0
        endNum = self.jsonDataKota[0].dataHarian.length
      } else if (this.selectedListWaktu === '1 Minggu Terakhir') {
        startNum = self.jsonDataKota[0].dataHarian.length - 8
        endNum = self.jsonDataKota[0].dataHarian.length
      } else if (this.selectedListWaktu === '1 Bulan Terakhir') {
        startNum = self.jsonDataKota[0].dataHarian.length - 31
        endNum = self.jsonDataKota[0].dataHarian.length
      } else if (this.selectedListWaktu === 'Pilih Rentan Waktu') {
        self.jsonDataKota[0].dataHarian.forEach((element, index) => {
          if (element.tanggal === this.formatDateYMD(this.startDate)) {
            startNum = index
          }
          if (element.tanggal === this.formatDateYMD(this.endDate)) {
            endNum = index
          }
        })
        if (endNum === 0) {
          endNum = self.jsonDataKota[0].dataHarian.length - 1
        }
      }

      // find kota
      this.jsonDataKota.forEach((element, index) => {
        if (element.nama === this.selectedListWilayah) {
          indexKota = index
        }
      })
      // get data
      let stop = false
      for (let i = startNum; i < endNum; i++) {
        const date = new Date(self.jsonDataKota[indexKota].dataHarian[i].tanggal)
        if (stop === false) {
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataHarian[i].positif + '</b></td></tr>'
          tooltipHarian += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataHarian[i].sembuh + '</b></td></tr>'
          tooltipHarian += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataHarian[i].meninggal + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartHarianData.push([
            self.formatDate(date),
            self.jsonDataKota[indexKota].dataHarian[i].positif, tooltipHarian,
            self.jsonDataKota[indexKota].dataHarian[i].sembuh, tooltipHarian,
            self.jsonDataKota[indexKota].dataHarian[i].meninggal, tooltipHarian
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.ChartHarianData.splice(1, 1)
    },
    fetchDataKabupatenKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0
      let indexKota = 0

      // filter date
      if (this.selectedListWaktu === 'Seluruh Waktu') {
        startNum = 0
        endNum = self.jsonDataKota[0].dataAkumulatif.length
      } else if (this.selectedListWaktu === '1 Minggu Terakhir') {
        startNum = self.jsonDataKota[0].dataAkumulatif.length - 8
        endNum = self.jsonDataKota[0].dataAkumulatif.length
      } else if (this.selectedListWaktu === '1 Bulan Terakhir') {
        startNum = self.jsonDataKota[0].dataAkumulatif.length - 31
        endNum = self.jsonDataKota[0].dataAkumulatif.length
      } else if (this.selectedListWaktu === 'Pilih Rentan Waktu') {
        self.jsonDataKota[0].dataAkumulatif.forEach((element, index) => {
          if (element.tanggal === this.formatDateYMD(this.startDate)) {
            startNum = index
          }
          if (element.tanggal === this.formatDateYMD(this.endDate)) {
            endNum = index
          }
        })
        if (endNum === 0) {
          endNum = self.jsonDataKota[0].dataAkumulatif.length - 1
        }
      }

      // find kota
      this.jsonDataKota.forEach((element, index) => {
        if (element.nama === this.selectedListWilayah) {
          indexKota = index
        }
      })
      // get data
      let stop = false
      for (let i = startNum; i < endNum; i++) {
        const date = new Date(self.jsonDataKota[indexKota].dataAkumulatif[i].tanggal)
        if (stop === false) {
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataAkumulatif[i].positif + '</b></td></tr>'
          tooltipHarian += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataAkumulatif[i].sembuh + '</b></td></tr>'
          tooltipHarian += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataAkumulatif[i].meninggal + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartKumulatifData.push([
            self.formatDate(date),
            self.jsonDataKota[indexKota].dataAkumulatif[i].positif, tooltipHarian,
            self.jsonDataKota[indexKota].dataAkumulatif[i].sembuh, tooltipHarian,
            self.jsonDataKota[indexKota].dataAkumulatif[i].meninggal, tooltipHarian
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.ChartHarianData.splice(1, 1)
    },
    onDateSelected () {
      console.log('on selected')
    }
  }
}

</script>

<style lang="scss" scoped>

.select-option-selector {
  // border-radius: 0.2rem;
  // border-width: 1px;
  // border-style: solid;
  // border-color: #555;
  // color: #555;
  // background-color: #fff;
  // height: 30px;
  // width: 160px;
  // margin: auto;
  // padding: 0px;
  display: block;
  border: 1px solid #ccc;
  padding: 6.4px;
  font-size: 14px;
  width: 230px;
  cursor: pointer;
}

.div-only-mobile {
    display: none !important;
}
.div-no-mobile {
    display: flex !important;
}
@media screen and (max-width: 549px) {

  .div-no-mobile {
      display:none !important;
  }

  .div-only-mobile {
      display: flex !important;
  }

}
.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
</style>

<style lang="scss" scoped>
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}
</style>
