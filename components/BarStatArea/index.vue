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
      <div style="overflow-x: auto; width: 100%; height: 100%; display: flex;">
        <div class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md">
          <div class="flex flex-row justify-between items-center">
            <h4 style="color: #828282; font-weight: bolder;">
              Indonesia
            </h4>
            <span style="width: 40%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                [{{ dataTotalPositifAll[0] }}]
              </h4>
            </span>
          </div>
          <GChart
            type="LineChart"
            :data="ChartNasionalDataHarian"
            :options="barChartNasionalOptions"
          />
        </div>
        <div class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md">
          <div class="flex flex-row justify-between items-center">
            <h4 style="color: #828282; font-weight: bolder;">
              Jawa Barat
            </h4>
            <span style="width: 40%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                [{{ dataTotalPositifAll[1] }}]
              </h4>
            </span>
          </div>
          <GChart
            type="LineChart"
            :data="ChartJawaBaratDataHarian"
            :options="barChartNasionalOptions"
          />
        </div>
        <div
          v-for="(item, index) in jsonDataKota"
          :key="item.kode"
          class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md"
        >
          <div class="flex flex-row justify-between items-center">
            <div style="width: 50%">
              <h4 style="color: #828282; font-weight: bolder;">
                {{ item.nama }}
              </h4>
            </div>
            <div style="width: 50%">
              <h4 style="text-align: right; margin-right: 20px;">
                <span style="color: #4FB769; font-weight: bolder;">{{ item.positif_persentase }} %</span>
                <span style="color: #000000; font-weight: bolder;">[{{ item.positif }}]</span>
              </h4>
            </div>
          </div>
          <GChart
            type="LineChart"
            :data="jsonDataKota[index].dataHarian"
            :options="barChartKotaOptions"
          />
        </div>
      </div>
    </section>

    <section
      v-if="stat.isActiveAkumulatif"
    >
      <div style="overflow-x: auto; width: 100%; height: 100%; display: flex;">
        <div class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md">
          <div class="flex flex-row justify-between items-center">
            <h4 style="color: #828282; font-weight: bolder;">
              Indonesia
            </h4>
            <span style="width: 40%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                [{{ dataTotalPositifAll[0] }}]
              </h4>
            </span>
          </div>
          <GChart
            type="LineChart"
            :data="ChartNasionalDataAkumulatif"
            :options="lineChartNasionalOptions"
          />
        </div>
        <div class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md">
          <div class="flex flex-row justify-between items-center">
            <h4 style="color: #828282; font-weight: bolder;">
              Jawa Barat
            </h4>
            <span style="width: 40%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                [{{ dataTotalPositifAll[1] }}]
              </h4>
            </span>
          </div>
          <GChart
            type="LineChart"
            :data="ChartJawaBaratDataAkumulatif"
            :options="lineChartNasionalOptions"
          />
        </div>
        <div
          v-for="(item, index) in jsonDataKota"
          :key="item.kode"
          class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md"
        >
          <div class="flex flex-row justify-between items-center">
            <div style="width: 60%">
              <h4 style="color: #828282; font-weight: bolder;">
                {{ item.nama }}
              </h4>
            </div>
            <div style="width: 40%">
              <h4 style="text-align: right; margin-right: 20px;">
                <span style="color: #4FB769; font-weight: bolder;">{{ item.positif_persentase }} %</span>
                <span style="color: #000000; font-weight: bolder;">[{{ item.positif }}]</span>
              </h4>
            </div>
          </div>
          <GChart
            type="LineChart"
            :data="jsonDataKota[index].dataAkumulatif"
            :options="lineChartKotaOptions"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatArea',
  components: {
    GChart,
    FontAwesomeIcon
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
      jsonDataProvinsi: [],
      jsonDataProvinsiHarian: [],
      jsonDataProvinsiKumulatif: [],
      jsonDataKabupaten: [],
      jsonDataKabupatenHarian: [],
      jsonDataKabupatenKumulatif: [],
      jsonDataResult: {
        odp_total: 0,
        odp_proses: 0,
        odp_proses_persen: 0,
        odp_selesai: 0,
        odp_selesai_persen: 0,
        pdp_total: 0,
        pdp_proses: 0,
        pdp_proses_persen: 0,
        pdp_selesai: 0,
        pdp_selesai_persen: 0,
        positif: 0,
        sembuh: 0,
        meninggal: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
      },
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
      dataTotalPositifAll: [
        0, 0
      ],
      ChartNasionalDataHarian: [
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
      ChartNasionalDataAkumulatif: [
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
      ChartJawaBaratDataHarian: [
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
      ChartJawaBaratDataAkumulatif: [
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
      barChartNasionalOptions: {
        height: 200,
        width: 300,
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
          width: '80%',
          bottom: 50
        },
        tooltip: { isHtml: true }
      },
      lineChartNasionalOptions: {
        height: 200,
        width: 300,
        orientation: 'horizontal',
        colors: ['#FF4A4B', '#03B167', '#9C0000'],
        legend: {
          position: 'none',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
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
          width: '80%',
          bottom: 50
        },
        tooltip: { isHtml: true }
      },
      barChartKotaOptions: {
        height: 200,
        width: 300,
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
          width: '80%',
          bottom: 50
        },
        tooltip: { isHtml: true }
      },
      lineChartKotaOptions: {
        height: 200,
        width: 300,
        orientation: 'horizontal',
        colors: ['#FF4A4B', '#03B167', '#9C0000'],
        legend: {
          position: 'none',
          alignment: 'center'
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 50
        },
        tooltip: { isHtml: true }
      }
    }
  },
  watch: {
    propsDataNasionalHarianKumulatif () {
      this.jsonDataNasionalHarianKumulatif = this.propsDataNasionalHarianKumulatif
      this.fetchDataNasionalHarianKumulatif()
    },
    propsDataRekapitulasiJabarProv () {
      this.jsonDataProvinsi = this.propsDataRekapitulasiJabarProv
      this.fetchDataProvinsi()
    },
    propsDataRekapitulasiJabarKab () {
      this.jsonDataKabupaten = this.propsDataRekapitulasiJabarKab
      setTimeout(() => {
        this.fetchDataKabupaten()
      }, 2000)
    },
    propsDataRekapitulasiJabarHarianProv () {
      this.jsonDataProvinsiHarian = this.propsDataRekapitulasiJabarHarianProv
      this.fetchDataProvinsiHarian()
    },
    propsDataRekapitulasiJabarKumulatifProv () {
      this.jsonDataProvinsiKumulatif = this.propsDataRekapitulasiJabarKumulatifProv
      this.fetchDataProvinsiKumulatif()
    },
    propsDataRekapitulasiJabarHarianKab () {
      this.jsonDataKabupatenHarian = this.propsDataRekapitulasiJabarHarianKab
      this.fetchDataKabupatenHarian()
    },
    propsDataRekapitulasiJabarKumulatifKab () {
      this.jsonDataKabupatenKumulatif = this.propsDataRekapitulasiJabarKumulatifKab
      this.fetchDataKabupatenKumulatif()
    }
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
      // const year = d.getFullYear()
      // let month = '' + (d.getMonth() + 1)
      // let day = '' + d.getDate()
      // if (month.length < 2) {
      //   month = '0' + month
      // }
      // if (day.length < 2) {
      //   day = '0' + day
      // }
      // return [day, month, year].join('-')
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
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
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
    },
    fetchDataNasionalHarianKumulatif () {
      const self = this
      for (let i = 0; i < self.jsonDataNasionalHarianKumulatif.length; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
        // by Harian
        let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipHarian += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + '</b></td></tr>'
        tooltipHarian += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusSembuhperHari + '</b></td></tr>'
        tooltipHarian += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusMeninggalperHari + '</b></td></tr>'
        tooltipHarian += '</table>'
        self.ChartNasionalDataHarian.push([
          self.formatDate(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari, tooltipHarian,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusSembuhperHari, tooltipHarian,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusMeninggalperHari, tooltipHarian
        ])
        // by Akumulatif
        let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipKumulatif += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusSembuhperHari + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataNasionalHarianKumulatif[i].jumlahKasusMeninggalperHari + '</b></td></tr>'
        tooltipKumulatif += '</table>'
        self.ChartNasionalDataAkumulatif.push([
          self.formatDate(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusKumulatif, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlahPasienSembuh, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlahPasienMeninggal, tooltipKumulatif
        ])
      }
      if (self.jsonDataNasionalHarianKumulatif[self.jsonDataNasionalHarianKumulatif.length - 1].jumlahKasusKumulatif === null) {
        self.dataTotalPositifAll[0] = self.jsonDataNasionalHarianKumulatif[self.jsonDataNasionalHarianKumulatif.length - 2].jumlahKasusKumulatif
      } else {
        self.dataTotalPositifAll[0] = self.jsonDataNasionalHarianKumulatif[self.jsonDataNasionalHarianKumulatif.length - 1].jumlahKasusKumulatif
      }
      self.ChartNasionalDataHarian.splice(1, 1)
      self.ChartNasionalDataAkumulatif.splice(1, 1)
    },
    fetchDataProvinsi () {
      const self = this
      self.jsonDataResult.odp_total = self.jsonDataProvinsi.odp_total
      self.jsonDataResult.odp_proses = self.jsonDataProvinsi.odp_proses
      self.jsonDataResult.odp_proses_persen = ((self.jsonDataResult.odp_proses / self.jsonDataResult.odp_total) * 100).toFixed(2)
      self.jsonDataResult.odp_selesai = self.jsonDataProvinsi.odp_selesai
      self.jsonDataResult.odp_selesai_persen = ((self.jsonDataResult.odp_selesai / self.jsonDataResult.odp_total) * 100).toFixed(2)
      self.jsonDataResult.pdp_total = self.jsonDataProvinsi.pdp_total
      self.jsonDataResult.pdp_proses = self.jsonDataProvinsi.pdp_proses
      self.jsonDataResult.pdp_proses_persen = ((self.jsonDataResult.pdp_proses / self.jsonDataResult.pdp_total) * 100).toFixed(2)
      self.jsonDataResult.pdp_selesai = self.jsonDataProvinsi.pdp_selesai
      self.jsonDataResult.pdp_selesai_persen = ((self.jsonDataResult.pdp_selesai / self.jsonDataResult.pdp_total) * 100).toFixed(2)
      self.jsonDataResult.positif = self.jsonDataProvinsi.positif
      self.jsonDataResult.sembuh = self.jsonDataProvinsi.sembuh
      self.jsonDataResult.meninggal = self.jsonDataProvinsi.meninggal
      self.dataTotalPositifAll[1] = self.jsonDataProvinsi.positif
    },
    fetchDataProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let stop = false
      for (let i = 0; i < self.jsonDataProvinsiHarian.length; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].positif + '</b></td></tr>'
          tooltipHarian += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].sembuh + '</b></td></tr>'
          tooltipHarian += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].meninggal + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartJawaBaratDataHarian.push([
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
      self.ChartJawaBaratDataHarian.splice(1, 1)
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let stop = false
      for (let i = 0; i < self.jsonDataProvinsiKumulatif.length; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipKumulatif += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].positif + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].sembuh + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].meninggal + '</b></td></tr>'
          tooltipKumulatif += '</table>'
          self.ChartJawaBaratDataAkumulatif.push([
            self.formatDate(date),
            self.jsonDataProvinsiKumulatif[i].positif, tooltipKumulatif,
            self.jsonDataProvinsiKumulatif[i].sembuh, tooltipKumulatif,
            self.jsonDataProvinsiKumulatif[i].meninggal, tooltipKumulatif
          ])
        }
        if (self.jsonDataProvinsiKumulatif[self.jsonDataProvinsiKumulatif.length - 1].positif === null) {
          self.dataTotalPositifAll[1] = self.jsonDataProvinsiKumulatif[self.jsonDataProvinsiKumulatif.length - 2].positif
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.ChartJawaBaratDataAkumulatif.splice(1, 1)
    },
    fetchDataKabupaten () {
      const self = this
      for (let j = 0; j < self.jsonDataKota.length; j++) {
        for (let i = 0; i < self.jsonDataKabupaten.length; i++) {
          if (self.jsonDataKabupaten[i].kode_kab === self.jsonDataKota[j].kode) {
            self.jsonDataKota[j].odp_proses = self.jsonDataKabupaten[i].odp_proses
            self.jsonDataKota[j].odp_selesai = self.jsonDataKabupaten[i].odp_selesai
            self.jsonDataKota[j].odp_total = self.jsonDataKabupaten[i].odp_total
            self.jsonDataKota[j].pdp_proses = self.jsonDataKabupaten[i].pdp_proses
            self.jsonDataKota[j].pdp_selesai = self.jsonDataKabupaten[i].pdp_selesai
            self.jsonDataKota[j].pdp_total = self.jsonDataKabupaten[i].pdp_total
            self.jsonDataKota[j].positif = self.jsonDataKabupaten[i].positif
            self.jsonDataKota[j].positif_persentase = ((parseInt(self.jsonDataKota[j].positif) / parseInt(self.jsonDataResult.positif)) * 100).toFixed(2)
            self.jsonDataKota[j].sembuh = self.jsonDataKabupaten[i].sembuh
            self.jsonDataKota[j].meninggal = self.jsonDataKabupaten[i].meninggal
          }
        }
      }
      self.jsonDataKota.sort(self.compareValues('positif', 'asc'))
    },
    fetchDataKabupatenHarian () {
      const self = this
      let max = 0
      for (let j = 0; j < self.jsonDataKota.length; j++) {
        for (let i = 0; i < self.jsonDataKabupatenHarian.length; i++) {
          if (self.jsonDataKabupatenHarian[i].kode_kab === self.jsonDataKota[j].kode) {
            const date = new Date(self.jsonDataKabupatenHarian[i].tanggal)
            let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
            tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
            tooltipHarian += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataKabupatenHarian[i].positif + '</b></td></tr>'
            tooltipHarian += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataKabupatenHarian[i].sembuh + '</b></td></tr>'
            tooltipHarian += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataKabupatenHarian[i].meninggal + '</b></td></tr>'
            tooltipHarian += '</table>'
            self.jsonDataKota[j].dataHarian.push([
              self.formatDate(date),
              self.jsonDataKabupatenHarian[i].positif, tooltipHarian,
              self.jsonDataKabupatenHarian[i].sembuh, tooltipHarian,
              self.jsonDataKabupatenHarian[i].meninggal, tooltipHarian
            ])
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
    fetchDataKabupatenKumulatif () {
      const self = this
      let max = 0
      for (let j = 0; j < self.jsonDataKota.length; j++) {
        for (let i = 0; i < self.jsonDataKabupatenKumulatif.length; i++) {
          if (self.jsonDataKabupatenKumulatif[i].kode_kab === self.jsonDataKota[j].kode) {
            const date = new Date(self.jsonDataKabupatenKumulatif[i].tanggal)
            let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
            tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
            tooltipKumulatif += '<tr><td>Positif </td><td><b style="margin-left: 10px;">' + self.jsonDataKabupatenKumulatif[i].positif + '</b></td></tr>'
            tooltipKumulatif += '<tr><td>Sembuh </td><td><b style="margin-left: 10px;">' + self.jsonDataKabupatenKumulatif[i].sembuh + '</b></td></tr>'
            tooltipKumulatif += '<tr><td>Meninggal </td><td><b style="margin-left: 10px;">' + self.jsonDataKabupatenKumulatif[i].meninggal + '</b></td></tr>'
            tooltipKumulatif += '</table>'
            self.jsonDataKota[j].dataAkumulatif.push([
              self.formatDate(date),
              self.jsonDataKabupatenKumulatif[i].positif, tooltipKumulatif,
              self.jsonDataKabupatenKumulatif[i].sembuh, tooltipKumulatif,
              self.jsonDataKabupatenKumulatif[i].meninggal, tooltipKumulatif
            ])
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
    }
  }
}

</script>

<style lang="scss" scoped>

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
