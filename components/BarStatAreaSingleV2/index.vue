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
        <div class="md:flex">
          <h4 class="p-5 text-xl md:w-2/3">
            <b>{{ judul }}</b>
          </h4>
          <div class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto;">
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
            <!-- <select
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
            </select> -->
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    righttoleft="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          type="ComboChart"
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
        <div class="md:flex">
          <h4 class="p-5 text-xl md:w-2/3">
            <b>{{ judul }}</b>
          </h4>
          <div class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto;">
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
            <!-- <select
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
            </select> -->
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    righttoleft="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          type="ComboChart"
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

export default {
  name: 'BarStatAreaSingleV2',
  components: {
    GChart,
    FontAwesomeIcon
    // DateRangePicker
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
          dataHarian: [
            [
              'Tanggal',
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
              'Harian',
              { type: 'string', role: 'tooltip', p: { html: true } },
              'Rata-rata 7 Hari',
              { type: 'string', role: 'tooltip', p: { html: true } }
            ],
            ['0', 0, '', 0, '']
          ],
          dataAkumulatif: [
            [
              'Tanggal',
              'Positif Aktif',
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
          'Harian',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '']
      ],
      ChartKumulatifData: [
        [
          'Tanggal',
          'Positif Aktif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      ChartHarianOptions: {
        height: 500,
        orientation: 'horizontal',
        colors: ['#5AB55B', '#EC5D5D', '#9C0000'],
        legend: {
          position: 'bottom'
        },
        // isStacked: true,
        // seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -90
        },
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
        chartArea: {
          width: '85%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      ChartKumulatifOptions: {
        height: 500,
        orientation: 'horizontal',
        colors: ['#FF4A4B', '#03B167', '#9C0000'],
        legend: {
          position: 'bottom'
        },
        // isStacked: true,
        // seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -90
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '85%',
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
      judul: 'Chart Harian Terkonfirmasi Jawa Barat',
      selectedDate: {
        start: '',
        end: ''
      },
      rangedate: {
        captions: {
          title: 'Pilih Tanggal',
          ok_button: 'Terapkan'
        },
        presetRanges: {
          all () {
            return {
              label: 'Semua Waktu',
              active: true,
              dateRange: {
                start: new Date('2020-03-01'),
                end: new Date()
              }
            }
          },
          seminggu () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 8, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Minggu Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          },
          sebulan () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 31, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Bulan Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          }
        }
      },
      isMobile: false
    }
  },
  watch: {
    propsDataNasionalHarianKumulatif () {
      // this.jsonDataNasionalHarianKumulatif = this.propsDataNasionalHarianKumulatif
      for (let i = 0; i < this.propsDataNasionalHarianKumulatif.length; i++) {
        const temp1 = this.propsDataNasionalHarianKumulatif[i]
        let jmlHarian = 0
        let jmlKumulatif = 0
        let ratarataHarian = 0
        let ratarataKumulatif = 0
        if (i === 0) {
          jmlHarian = this.propsDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari
          jmlKumulatif = this.propsDataNasionalHarianKumulatif[i].jumlahKasusKumulatif
          ratarataHarian = jmlHarian / 1
          ratarataKumulatif = jmlKumulatif / 1
        } else if (i === 1) {
          jmlHarian = this.propsDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusBaruperHari
          jmlKumulatif = this.propsDataNasionalHarianKumulatif[i].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusKumulatif
          ratarataHarian = jmlHarian / 2
          ratarataKumulatif = jmlKumulatif / 2
        } else if (i === 2) {
          jmlHarian = this.propsDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusBaruperHari
          jmlKumulatif = this.propsDataNasionalHarianKumulatif[i].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusKumulatif
          ratarataHarian = jmlHarian / 3
          ratarataKumulatif = jmlKumulatif / 3
        } else if (i === 3) {
          jmlHarian = this.propsDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusBaruperHari +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusBaruperHari
          jmlKumulatif = this.propsDataNasionalHarianKumulatif[i].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusKumulatif +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusKumulatif
          ratarataHarian = jmlHarian / 4
          ratarataKumulatif = jmlKumulatif / 4
        } else if (i === 4) {
          jmlHarian = this.propsDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusBaruperHari +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 4].jumlahKasusBaruperHari
          jmlKumulatif = this.propsDataNasionalHarianKumulatif[i].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusKumulatif +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 4].jumlahKasusKumulatif
          ratarataHarian = jmlHarian / 5
          ratarataKumulatif = jmlKumulatif / 5
        } else if (i === 5) {
          jmlHarian = this.propsDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusBaruperHari +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 4].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 5].jumlahKasusBaruperHari
          jmlKumulatif = this.propsDataNasionalHarianKumulatif[i].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusKumulatif +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 4].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 5].jumlahKasusKumulatif
          ratarataHarian = jmlHarian / 6
          ratarataKumulatif = jmlKumulatif / 6
        } else if (i > 6) {
          jmlHarian = this.propsDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusBaruperHari +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 4].jumlahKasusBaruperHari + this.propsDataNasionalHarianKumulatif[i - 5].jumlahKasusBaruperHari +
            this.propsDataNasionalHarianKumulatif[i - 6].jumlahKasusBaruperHari
          jmlKumulatif = this.propsDataNasionalHarianKumulatif[i].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 1].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 2].jumlahKasusKumulatif +
            this.propsDataNasionalHarianKumulatif[i - 3].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 4].jumlahKasusKumulatif + this.propsDataNasionalHarianKumulatif[i - 5].jumlahKasusKumulatif +
            this.propsDataNasionalHarianKumulatif[i - 6].jumlahKasusKumulatif
          ratarataHarian = jmlHarian / 7
          ratarataKumulatif = jmlKumulatif / 7
        } else {
          jmlHarian = 0
          jmlKumulatif = 0
          ratarataHarian = 0
          ratarataKumulatif = 0
        }
        const temp2 = { jumlahKasusBaruperHari_ratarata: parseInt(ratarataHarian.toFixed(2)), jumlahKasusKumulatif_ratarata: parseInt(ratarataKumulatif.toFixed(2)) }
        const temp3 = { ...temp1, ...temp2 }
        this.jsonDataNasionalHarianKumulatif.push(temp3)
      }
    },
    propsDataRekapitulasiJabarHarianProv () {
      // this.jsonDataProvinsiHarian = this.propsDataRekapitulasiJabarHarianProv
      for (let i = 0; i < this.propsDataRekapitulasiJabarHarianProv.length; i++) {
        const temp1 = this.propsDataRekapitulasiJabarHarianProv[i]
        let jml = 0
        let ratarata = 0
        if (i === 0) {
          jml = this.propsDataRekapitulasiJabarHarianProv[i].positif
          ratarata = jml / 1
        } else if (i === 1) {
          jml = this.propsDataRekapitulasiJabarHarianProv[i].positif + this.propsDataRekapitulasiJabarHarianProv[i - 1].positif
          ratarata = jml / 2
        } else if (i === 2) {
          jml = this.propsDataRekapitulasiJabarHarianProv[i].positif + this.propsDataRekapitulasiJabarHarianProv[i - 1].positif + this.propsDataRekapitulasiJabarHarianProv[i - 2].positif
          ratarata = jml / 3
        } else if (i === 3) {
          jml = this.propsDataRekapitulasiJabarHarianProv[i].positif + this.propsDataRekapitulasiJabarHarianProv[i - 1].positif + this.propsDataRekapitulasiJabarHarianProv[i - 2].positif +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].positif
          ratarata = jml / 4
        } else if (i === 4) {
          jml = this.propsDataRekapitulasiJabarHarianProv[i].positif + this.propsDataRekapitulasiJabarHarianProv[i - 1].positif + this.propsDataRekapitulasiJabarHarianProv[i - 2].positif +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].positif + this.propsDataRekapitulasiJabarHarianProv[i - 4].positif
          ratarata = jml / 5
        } else if (i === 5) {
          jml = this.propsDataRekapitulasiJabarHarianProv[i].positif + this.propsDataRekapitulasiJabarHarianProv[i - 1].positif + this.propsDataRekapitulasiJabarHarianProv[i - 2].positif +
          this.propsDataRekapitulasiJabarHarianProv[i - 3].positif + this.propsDataRekapitulasiJabarHarianProv[i - 4].positif + this.propsDataRekapitulasiJabarHarianProv[i - 5].positif
          ratarata = jml / 6
        } else if (i > 6) {
          jml = this.propsDataRekapitulasiJabarHarianProv[i].positif + this.propsDataRekapitulasiJabarHarianProv[i - 1].positif + this.propsDataRekapitulasiJabarHarianProv[i - 2].positif +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].positif + this.propsDataRekapitulasiJabarHarianProv[i - 4].positif + this.propsDataRekapitulasiJabarHarianProv[i - 5].positif +
            this.propsDataRekapitulasiJabarHarianProv[i - 6].positif
          ratarata = jml / 7
        } else {
          jml = 0
          ratarata = 0
        }
        const temp2 = { positif_ratarata: parseInt(ratarata.toFixed(2)) }
        const temp3 = { ...temp1, ...temp2 }
        this.jsonDataProvinsiHarian.push(temp3)
      }
      this.changeData()
    },
    propsDataRekapitulasiJabarKumulatifProv () {
      // this.jsonDataProvinsiKumulatif = this.propsDataRekapitulasiJabarKumulatifProv
      for (let i = 0; i < this.propsDataRekapitulasiJabarKumulatifProv.length; i++) {
        const temp1 = this.propsDataRekapitulasiJabarKumulatifProv[i]
        let jml = 0
        let ratarata = 0
        if (i === 0) {
          jml = this.propsDataRekapitulasiJabarKumulatifProv[i].positif
          ratarata = jml / 1
        } else if (i === 1) {
          jml = this.propsDataRekapitulasiJabarKumulatifProv[i].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 1].positif
          ratarata = jml / 2
        } else if (i === 2) {
          jml = this.propsDataRekapitulasiJabarKumulatifProv[i].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 1].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 2].positif
          ratarata = jml / 3
        } else if (i === 3) {
          jml = this.propsDataRekapitulasiJabarKumulatifProv[i].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 1].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 2].positif +
            this.propsDataRekapitulasiJabarKumulatifProv[i - 3].positif
          ratarata = jml / 4
        } else if (i === 4) {
          jml = this.propsDataRekapitulasiJabarKumulatifProv[i].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 1].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 2].positif +
            this.propsDataRekapitulasiJabarKumulatifProv[i - 3].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 4].positif
          ratarata = jml / 5
        } else if (i === 5) {
          jml = this.propsDataRekapitulasiJabarKumulatifProv[i].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 1].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 2].positif +
          this.propsDataRekapitulasiJabarKumulatifProv[i - 3].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 4].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 5].positif
          ratarata = jml / 6
        } else if (i > 6) {
          jml = this.propsDataRekapitulasiJabarKumulatifProv[i].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 1].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 2].positif +
            this.propsDataRekapitulasiJabarKumulatifProv[i - 3].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 4].positif + this.propsDataRekapitulasiJabarKumulatifProv[i - 5].positif +
            this.propsDataRekapitulasiJabarKumulatifProv[i - 6].positif
          ratarata = jml / 7
        } else {
          jml = 0
          ratarata = 0
        }
        const temp2 = { positif_ratarata: parseInt(ratarata.toFixed(2)) }
        const temp3 = { ...temp1, ...temp2 }
        this.jsonDataProvinsiKumulatif.push(temp3)
      }
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
    this.selectedDate.start = new Date('2020-03-01')
    this.selectedDate.end = new Date()
    this.checkIsMobile()
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
    formatDateNoYear (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short'
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
    // changeFilterWaktu (stat) {
    //   this.selectedListWaktu = stat
    //   this.changeData()
    // },
    changeData () {
      this.ChartHarianData = [
        [
          'Tanggal',
          'Harian',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '']
      ]
      this.ChartKumulatifData = [
        [
          'Tanggal',
          'Positif Aktif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ]
      if (this.stat.isActiveHarian === true) {
        this.judul = 'Chart Harian Terkonfirmasi ' + this.selectedListWilayah
        if (this.selectedListWilayah === 'Jawa Barat') {
          this.fetchDataProvinsiHarian()
        } else if (this.selectedListWilayah === 'Indonesia') {
          this.fetchDataNasionalHarian()
        } else {
          this.fetchDataKabupatenHarian()
        }
      } else if (this.stat.isActiveAkumulatif === true) {
        this.judul = 'Chart Kumulatif Terkonfirmasi ' + this.selectedListWilayah
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
            // self.jsonDataKota[j].dataHarian.push(self.jsonDataKabupatenHarian[i])
            const temp1 = self.jsonDataKabupatenHarian[i]
            let jml = 0
            let ratarata = 0
            if (i === 0) {
              jml = this.jsonDataKabupatenHarian[i].positif
              ratarata = jml / 1
            } else if (i === 1) {
              jml = this.jsonDataKabupatenHarian[i].positif + this.jsonDataKabupatenHarian[i - 1].positif
              ratarata = jml / 2
            } else if (i === 2) {
              jml = this.jsonDataKabupatenHarian[i].positif + this.jsonDataKabupatenHarian[i - 1].positif + this.jsonDataKabupatenHarian[i - 2].positif
              ratarata = jml / 3
            } else if (i === 3) {
              jml = this.jsonDataKabupatenHarian[i].positif + this.jsonDataKabupatenHarian[i - 1].positif + this.jsonDataKabupatenHarian[i - 2].positif +
                this.jsonDataKabupatenHarian[i - 3].positif
              ratarata = jml / 4
            } else if (i === 4) {
              jml = this.jsonDataKabupatenHarian[i].positif + this.jsonDataKabupatenHarian[i - 1].positif + this.jsonDataKabupatenHarian[i - 2].positif +
                this.jsonDataKabupatenHarian[i - 3].positif + this.jsonDataKabupatenHarian[i - 4].positif
              ratarata = jml / 5
            } else if (i === 5) {
              jml = this.jsonDataKabupatenHarian[i].positif + this.jsonDataKabupatenHarian[i - 1].positif + this.jsonDataKabupatenHarian[i - 2].positif +
              this.jsonDataKabupatenHarian[i - 3].positif + this.jsonDataKabupatenHarian[i - 4].positif + this.jsonDataKabupatenHarian[i - 5].positif
              ratarata = jml / 6
            } else if (i > 6) {
              jml = this.jsonDataKabupatenHarian[i].positif + this.jsonDataKabupatenHarian[i - 1].positif + this.jsonDataKabupatenHarian[i - 2].positif +
                this.jsonDataKabupatenHarian[i - 3].positif + this.jsonDataKabupatenHarian[i - 4].positif + this.jsonDataKabupatenHarian[i - 5].positif +
                this.jsonDataKabupatenHarian[i - 6].positif
              ratarata = jml / 7
            } else {
              jml = 0
              ratarata = 0
            }
            const temp2 = { positif_ratarata: parseInt(ratarata.toFixed(2)) }
            const temp3 = { ...temp1, ...temp2 }
            self.jsonDataKota[j].dataHarian.push(temp3)
          }
          if (i === self.jsonDataKabupatenHarian.length - 1) {
            self.jsonDataKota[j].dataHarian.splice(1, 1)
          }
          if (self.jsonDataKabupatenHarian[i].positif > max) {
            max = self.jsonDataKabupatenHarian[i].positif
          }
        }
      }
    },
    groupDataKabupatenKumulatif () {
      const self = this
      let max = 0
      for (let j = 0; j < self.jsonDataKota.length; j++) {
        for (let i = 0; i < self.jsonDataKabupatenKumulatif.length; i++) {
          if (self.jsonDataKabupatenKumulatif[i].kode_kab === self.jsonDataKota[j].kode) {
            // self.jsonDataKota[j].dataAkumulatif.push(self.jsonDataKabupatenKumulatif[i])
            const temp1 = self.jsonDataKabupatenKumulatif[i]
            let jml = 0
            let ratarata = 0
            if (i === 0) {
              jml = this.jsonDataKabupatenKumulatif[i].positif
              ratarata = jml / 1
            } else if (i === 1) {
              jml = this.jsonDataKabupatenKumulatif[i].positif + this.jsonDataKabupatenKumulatif[i - 1].positif
              ratarata = jml / 2
            } else if (i === 2) {
              jml = this.jsonDataKabupatenKumulatif[i].positif + this.jsonDataKabupatenKumulatif[i - 1].positif + this.jsonDataKabupatenKumulatif[i - 2].positif
              ratarata = jml / 3
            } else if (i === 3) {
              jml = this.jsonDataKabupatenKumulatif[i].positif + this.jsonDataKabupatenKumulatif[i - 1].positif + this.jsonDataKabupatenKumulatif[i - 2].positif +
                this.jsonDataKabupatenKumulatif[i - 3].positif
              ratarata = jml / 4
            } else if (i === 4) {
              jml = this.jsonDataKabupatenKumulatif[i].positif + this.jsonDataKabupatenKumulatif[i - 1].positif + this.jsonDataKabupatenKumulatif[i - 2].positif +
                this.jsonDataKabupatenKumulatif[i - 3].positif + this.jsonDataKabupatenKumulatif[i - 4].positif
              ratarata = jml / 5
            } else if (i === 5) {
              jml = this.jsonDataKabupatenKumulatif[i].positif + this.jsonDataKabupatenKumulatif[i - 1].positif + this.jsonDataKabupatenKumulatif[i - 2].positif +
              this.jsonDataKabupatenKumulatif[i - 3].positif + this.jsonDataKabupatenKumulatif[i - 4].positif + this.jsonDataKabupatenKumulatif[i - 5].positif
              ratarata = jml / 6
            } else if (i > 6) {
              jml = this.jsonDataKabupatenKumulatif[i].positif + this.jsonDataKabupatenKumulatif[i - 1].positif + this.jsonDataKabupatenKumulatif[i - 2].positif +
                this.jsonDataKabupatenKumulatif[i - 3].positif + this.jsonDataKabupatenKumulatif[i - 4].positif + this.jsonDataKabupatenKumulatif[i - 5].positif +
                this.jsonDataKabupatenKumulatif[i - 6].positif
              ratarata = jml / 7
            } else {
              jml = 0
              ratarata = 0
            }
            const temp2 = { positif_ratarata: parseInt(ratarata.toFixed(2)) }
            const temp3 = { ...temp1, ...temp2 }
            self.jsonDataKota[j].dataAkumulatif.push(temp3)
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
      this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataNasionalHarianKumulatif.length - 1
      }

      // get data
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
        // by Harian
        let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipHarian += '<tr><td>Terkonfirmasi </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + '</b></td></tr>'
        tooltipHarian += '<tr><td>Rata-rata 7 Hari </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari_ratarata + '</b></td></tr>'
        tooltipHarian += '</table>'
        self.ChartHarianData.push([
          self.formatDateNoYear(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari, tooltipHarian,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari_ratarata, tooltipHarian
        ])
      }
      self.ChartHarianData.splice(1, 1)
    },
    fetchDataNasionalKumulatif () {
      const self = this
      let startNum = 0
      let endNum = 0

      // filter date
      this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataNasionalHarianKumulatif.length - 1
      }

      // get data
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
        // by Akumulatif
        let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipKumulatif += '<tr><td>Terkonfirmasi </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusKumulatif + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Positif Aktif </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahpasiendalamperawatan + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahPasienSembuh + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahPasienMeninggal + '</b></td></tr>'
        tooltipKumulatif += '</table>'
        self.ChartKumulatifData.push([
          self.formatDateNoYear(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahpasiendalamperawatan, tooltipKumulatif,
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
      this.jsonDataProvinsiHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiHarian.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Terkonfirmasi </td><td><b style="margin-left: 10px;">: ' + self.jsonDataProvinsiHarian[i].positif + '</b></td></tr>'
          tooltipHarian += '<tr><td>Rata-rata 7 Hari </td><td><b style="margin-left: 10px;">: ' + self.jsonDataProvinsiHarian[i].positif_ratarata + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartHarianData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiHarian[i].positif, tooltipHarian,
            self.jsonDataProvinsiHarian[i].positif_ratarata, tooltipHarian
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
      this.jsonDataProvinsiKumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiKumulatif.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        const positifAktif = self.jsonDataProvinsiKumulatif[i].positif - self.jsonDataProvinsiKumulatif[i].sembuh - self.jsonDataProvinsiKumulatif[i].meninggal
        if (stop === false) {
          let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipKumulatif += '<tr><td>Terkonfirmasi </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].positif + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Positif Aktif </td><td><b style="margin-left: 10px;">' + positifAktif + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].sembuh + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].meninggal + '</b></td></tr>'
          tooltipKumulatif += '</table>'
          self.ChartKumulatifData.push([
            self.formatDateNoYear(date),
            positifAktif, tooltipKumulatif,
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
      self.jsonDataKota[0].dataHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = self.jsonDataKota[0].dataHarian.length - 1
      }

      // find kota
      this.jsonDataKota.forEach((element, index) => {
        if (element.nama === this.selectedListWilayah) {
          indexKota = index
        }
      })
      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataKota[indexKota].dataHarian[i].tanggal)
        if (stop === false) {
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Terkonfirmasi </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataHarian[i].positif + '</b></td></tr>'
          tooltipHarian += '<tr><td>Rata-rata 7 Hari </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataHarian[i].positif_ratarata + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartHarianData.push([
            self.formatDateNoYear(date),
            self.jsonDataKota[indexKota].dataHarian[i].positif, tooltipHarian,
            self.jsonDataKota[indexKota].dataHarian[i].positif_ratarata, tooltipHarian
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.ChartHarianData.splice(1, 1)
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
      self.jsonDataKota[0].dataAkumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = self.jsonDataKota[0].dataAkumulatif.length - 1
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
        const positifAktif = self.jsonDataKota[indexKota].dataAkumulatif[i].positif - self.jsonDataKota[indexKota].dataAkumulatif[i].sembuh - self.jsonDataKota[indexKota].dataAkumulatif[i].meninggal
        if (stop === false) {
          let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipKumulatif += '<tr><td>Terkonfirmasi </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataAkumulatif[i].positif + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Positif Aktif </td><td><b style="margin-left: 10px;">' + positifAktif + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataAkumulatif[i].sembuh + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataKota[indexKota].dataAkumulatif[i].meninggal + '</b></td></tr>'
          tooltipKumulatif += '</table>'
          self.ChartKumulatifData.push([
            self.formatDateNoYear(date),
            positifAktif, tooltipKumulatif,
            self.jsonDataKota[indexKota].dataAkumulatif[i].sembuh, tooltipKumulatif,
            self.jsonDataKota[indexKota].dataAkumulatif[i].meninggal, tooltipKumulatif
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.ChartHarianData.splice(1, 1)
      self.ChartHarianData.splice(1, 1)
    },
    onDateSelected (daterange) {
      this.selectedDate = daterange
      this.changeData()
    },
    checkIsMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    }
  }
}

</script>

<style lang="scss" scoped>

.select-option-selector {
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
