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

    <section v-show="stat.isActiveHarian">
      <div style="overflow-x: auto; width: 100%; height: 100%; display: flex;">
        <div class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md">
          <div class="flex flex-row justify-between items-center">
            <h4 style="color: #828282; font-weight: bolder;">
              Indonesia
            </h4>
            <span style="width: 40%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                ({{ dataTotalPositifAll[0] }})
              </h4>
            </span>
          </div>
          <GChart
            type="BarChart"
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
                ({{ dataTotalPositifAll[1] }})
              </h4>
            </span>
          </div>
          <GChart
            type="BarChart"
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
            <div style="width: 60%">
              <h4 style="color: #828282; font-weight: bolder;">
                {{ item.nama }}
              </h4>
            </div>
            <div style="width: 40%">
              <h4 style="text-align: right; margin-right: 20px;">
                <span style="color: #4FB769; font-weight: bolder;">{{ item.positif_persentase }} %</span>
                <span style="color: #000000; font-weight: bolder;">({{ item.positif }})</span>
              </h4>
            </div>
          </div>
          <GChart
            type="BarChart"
            :data="jsonDataKota[index].dataHarian"
            :options="barChartNasionalOptions"
          />
        </div>
      </div>
    </section>

    <section
      v-show="stat.isActiveAkumulatif"
    >
      <div style="overflow-x: auto; width: 100%; height: 100%; display: flex;">
        <div class="bg-white p-3 mr-4 mb-4 rounded-lg shadow-md">
          <div class="flex flex-row justify-between items-center">
            <h4 style="color: #828282; font-weight: bolder;">
              Indonesia
            </h4>
            <span style="width: 40%">
              <h4 style="color: #000000; font-weight: bolder; text-align: right; margin-right: 20px;">
                ({{ dataTotalPositifAll[0] }})
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
                ({{ dataTotalPositifAll[1] }})
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
                <span style="color: #000000; font-weight: bolder;">({{ item.positif }})</span>
              </h4>
            </div>
          </div>
          <GChart
            type="LineChart"
            :data="jsonDataKota[index].dataAkumulatif"
            :options="lineChartNasionalOptions"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatArea',
  components: {
    GChart,
    FontAwesomeIcon
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
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
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ],
          dataAkumulatif: [
            ['Tanggal', 'Kasus Positif'],
            ['0', 0]
          ]
        }
      ],
      dataTotalPositifAll: [
        0, 0
      ],
      ChartNasionalDataHarian: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      ChartNasionalDataAkumulatif: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      ChartJawaBaratDataHarian: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      ChartJawaBaratDataAkumulatif: [
        ['Tanggal', 'Kasus Positif'],
        ['0', 0]
      ],
      barChartNasionalOptions: {
        height: 200,
        width: 300,
        orientation: 'horizontal',
        colors: ['#6DD274'],
        legend: {
          position: 'none'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 50
        }
      },
      lineChartNasionalOptions: {
        height: 200,
        width: 300,
        orientation: 'horizontal',
        colors: ['#6DD274'],
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
        }
      }
    }
  },
  created () {
    this.fetchDataNasionalHarianKumulatif()
    this.fetchDataProvinsi()
    setTimeout(() => {
      this.fetchDataKabupaten()
    }, 2000)
    this.fetchDataProvinsiHarian()
    this.fetchDataProvinsiKumulatif()
    this.fetchDataKabupatenHarian()
    this.fetchDataKabupatenKumulatif()
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
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [day, month, year].join('-')
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
      axios
        .get('https://indonesia-covid-19.mathdro.id/api/harian')
        .then(function (response) {
          self.jsonDataNasionalHarianKumulatif = response.data.data

          for (let i = 0; i < self.jsonDataNasionalHarianKumulatif.length; i++) {
            const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
            // by Harian
            self.ChartNasionalDataHarian.push([self.formatDate(date), self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari])
            // by Akumulatif
            self.ChartNasionalDataAkumulatif.push([self.formatDate(date), self.jsonDataNasionalHarianKumulatif[i].jumlahKasusKumulatif])
          }
          if (self.jsonDataNasionalHarianKumulatif[self.jsonDataNasionalHarianKumulatif.length - 1].jumlahKasusKumulatif === null) {
            self.dataTotalPositifAll[0] = self.jsonDataNasionalHarianKumulatif[self.jsonDataNasionalHarianKumulatif.length - 2].jumlahKasusKumulatif
          } else {
            self.dataTotalPositifAll[0] = self.jsonDataNasionalHarianKumulatif[self.jsonDataNasionalHarianKumulatif.length - 1].jumlahKasusKumulatif
          }
          self.ChartNasionalDataHarian.splice(1, 1)
          self.ChartNasionalDataAkumulatif.splice(1, 1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataProvinsi () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar?level=prov')
        .then(function (response) {
          self.jsonDataProvinsi = response.data.data.content

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
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/harian?level=prov')
        .then(function (response) {
          self.jsonDataProvinsiHarian = response.data.data.content

          let stop = false
          for (let i = 0; i < self.jsonDataProvinsiHarian.length; i++) {
            const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
            if (stop === false) {
              self.ChartJawaBaratDataHarian.push([self.formatDate(date), self.jsonDataProvinsiHarian[i].positif])
            }
            if (self.formatDate(date) === strToday) {
              stop = true
            }
          }
          self.ChartJawaBaratDataHarian.splice(1, 1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=prov')
        .then(function (response) {
          self.jsonDataProvinsiKumulatif = response.data.data.content

          let stop = false
          for (let i = 0; i < self.jsonDataProvinsiKumulatif.length; i++) {
            const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
            if (stop === false) {
              self.ChartJawaBaratDataAkumulatif.push([self.formatDate(date), self.jsonDataProvinsiKumulatif[i].positif])
            }
            if (self.jsonDataProvinsiKumulatif[self.jsonDataProvinsiKumulatif.length - 1].positif === null) {
              self.dataTotalPositifAll[1] = self.jsonDataProvinsiKumulatif[self.jsonDataProvinsiKumulatif.length - 2].positif
            }
            if (self.formatDate(date) === strToday) {
              stop = true
            }
          }
          self.ChartJawaBaratDataAkumulatif.splice(1, 1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataKabupaten () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar?level=kab')
        .then(function (response) {
          self.jsonDataKabupaten = response.data.data.content
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
                self.jsonDataKota[j].positif_persentase = ((self.jsonDataKota[j].positif / self.jsonDataResult.positif) * 100).toFixed(2)
                self.jsonDataKota[j].sembuh = self.jsonDataKabupaten[i].sembuh
                self.jsonDataKota[j].meninggal = self.jsonDataKabupaten[i].meninggal
              }
            }
          }
          self.jsonDataKota.sort(self.compareValues('positif', 'desc'))
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataKabupatenHarian () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/harian?level=kab')
        .then(function (response) {
          self.jsonDataKabupatenHarian = response.data.data.content
          for (let j = 0; j < self.jsonDataKota.length; j++) {
            for (let i = 0; i < self.jsonDataKabupatenHarian.length; i++) {
              if (self.jsonDataKabupatenHarian[i].kode_kab === self.jsonDataKota[j].kode) {
                const date = new Date(self.jsonDataKabupatenHarian[i].tanggal)
                self.jsonDataKota[j].dataHarian.push([self.formatDate(date), self.jsonDataKabupatenHarian[i].positif]
                )
              }
              if (i === self.jsonDataKabupatenHarian.length - 1) {
                self.jsonDataKota[j].dataHarian.splice(1, 1)
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataKabupatenKumulatif () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=kab')
        .then(function (response) {
          self.jsonDataKabupatenKumulatif = response.data.data.content
          for (let j = 0; j < self.jsonDataKota.length; j++) {
            for (let i = 0; i < self.jsonDataKabupatenKumulatif.length; i++) {
              if (self.jsonDataKabupatenKumulatif[i].kode_kab === self.jsonDataKota[j].kode) {
                const date = new Date(self.jsonDataKabupatenKumulatif[i].tanggal)
                self.jsonDataKota[j].dataAkumulatif.push([self.formatDate(date), self.jsonDataKabupatenKumulatif[i].positif]
                )
              }
              if (i === self.jsonDataKabupatenKumulatif.length - 1) {
                self.jsonDataKota[j].dataAkumulatif.splice(1, 1)
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  head () {
    return {
      link: [
        /* { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' } */
      ]
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
