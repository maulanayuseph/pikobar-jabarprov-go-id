import axios from 'axios'

function ifNegatifReturnZero (number) {
  if (number < 0) {
    return 0
  } else {
    return number
  }
}

export const state = () => ({
  items: null
})

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  changePositifAktifUsia (state, items) {
    items.positif_per_usia.anak.laki_laki.bawah_1 = ifNegatifReturnZero(items.positif_per_usia.anak.laki_laki.bawah_1 - items.sembuh_per_usia.anak.laki_laki.bawah_1 - items.meninggal_per_usia.anak.laki_laki.bawah_1)
    items.positif_per_usia.anak.laki_laki['1_5'] = ifNegatifReturnZero(items.positif_per_usia.anak.laki_laki['1_5'] - items.sembuh_per_usia.anak.laki_laki['1_5'] - items.meninggal_per_usia.anak.laki_laki['1_5'])
    items.positif_per_usia.anak.laki_laki['5_6'] = ifNegatifReturnZero(items.positif_per_usia.anak.laki_laki['5_6'] - items.sembuh_per_usia.anak.laki_laki['5_6'] - items.meninggal_per_usia.anak.laki_laki['5_6'])
    items.positif_per_usia.anak.laki_laki['6_18'] = ifNegatifReturnZero(items.positif_per_usia.anak.laki_laki['6_18'] - items.sembuh_per_usia.anak.laki_laki['6_18'] - items.meninggal_per_usia.anak.laki_laki['6_18'])

    items.positif_per_usia.anak.perempuan.bawah_1 = ifNegatifReturnZero(items.positif_per_usia.anak.perempuan.bawah_1 - items.sembuh_per_usia.anak.perempuan.bawah_1 - items.meninggal_per_usia.anak.perempuan.bawah_1)
    items.positif_per_usia.anak.perempuan['1_5'] = ifNegatifReturnZero(items.positif_per_usia.anak.perempuan['1_5'] - items.sembuh_per_usia.anak.perempuan['1_5'] - items.meninggal_per_usia.anak.perempuan['1_5'])
    items.positif_per_usia.anak.perempuan['5_6'] = ifNegatifReturnZero(items.positif_per_usia.anak.perempuan['5_6'] - items.sembuh_per_usia.anak.perempuan['5_6'] - items.meninggal_per_usia.anak.perempuan['5_6'])
    items.positif_per_usia.anak.perempuan['6_18'] = ifNegatifReturnZero(items.positif_per_usia.anak.perempuan['6_18'] - items.sembuh_per_usia.anak.perempuan['6_18'] - items.meninggal_per_usia.anak.perempuan['6_18'])

    items.positif_per_usia.semua.laki_laki.bawah_5 = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki.bawah_5 - items.sembuh_per_usia.semua.laki_laki.bawah_5 - items.meninggal_per_usia.semua.laki_laki.bawah_5)
    items.positif_per_usia.semua.laki_laki['6_19'] = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki['6_19'] - items.sembuh_per_usia.semua.laki_laki['6_19'] - items.meninggal_per_usia.semua.laki_laki['6_19'])
    items.positif_per_usia.semua.laki_laki['20_29'] = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki['20_29'] - items.sembuh_per_usia.semua.laki_laki['20_29'] - items.meninggal_per_usia.semua.laki_laki['20_29'])
    items.positif_per_usia.semua.laki_laki['30_39'] = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki['30_39'] - items.sembuh_per_usia.semua.laki_laki['30_39'] - items.meninggal_per_usia.semua.laki_laki['30_39'])
    items.positif_per_usia.semua.laki_laki['40_49'] = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki['40_49'] - items.sembuh_per_usia.semua.laki_laki['40_49'] - items.meninggal_per_usia.semua.laki_laki['40_49'])
    items.positif_per_usia.semua.laki_laki['50_59'] = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki['50_59'] - items.sembuh_per_usia.semua.laki_laki['50_59'] - items.meninggal_per_usia.semua.laki_laki['50_59'])
    items.positif_per_usia.semua.laki_laki['60_69'] = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki['60_69'] - items.sembuh_per_usia.semua.laki_laki['60_69'] - items.meninggal_per_usia.semua.laki_laki['60_69'])
    items.positif_per_usia.semua.laki_laki['70_79'] = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki['70_79'] - items.sembuh_per_usia.semua.laki_laki['70_79'] - items.meninggal_per_usia.semua.laki_laki['70_79'])
    items.positif_per_usia.semua.laki_laki.atas_80 = ifNegatifReturnZero(items.positif_per_usia.semua.laki_laki.atas_80 - items.sembuh_per_usia.semua.laki_laki.atas_80 - items.meninggal_per_usia.semua.laki_laki.atas_80)

    items.positif_per_usia.semua.perempuan.bawah_5 = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan.bawah_5 - items.sembuh_per_usia.semua.perempuan.bawah_5 - items.meninggal_per_usia.semua.perempuan.bawah_5)
    items.positif_per_usia.semua.perempuan['6_19'] = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan['6_19'] - items.sembuh_per_usia.semua.perempuan['6_19'] - items.meninggal_per_usia.semua.perempuan['6_19'])
    items.positif_per_usia.semua.perempuan['20_29'] = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan['20_29'] - items.sembuh_per_usia.semua.perempuan['20_29'] - items.meninggal_per_usia.semua.perempuan['20_29'])
    items.positif_per_usia.semua.perempuan['30_39'] = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan['30_39'] - items.sembuh_per_usia.semua.perempuan['30_39'] - items.meninggal_per_usia.semua.perempuan['30_39'])
    items.positif_per_usia.semua.perempuan['40_49'] = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan['40_49'] - items.sembuh_per_usia.semua.perempuan['40_49'] - items.meninggal_per_usia.semua.perempuan['40_49'])
    items.positif_per_usia.semua.perempuan['50_59'] = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan['50_59'] - items.sembuh_per_usia.semua.perempuan['50_59'] - items.meninggal_per_usia.semua.perempuan['50_59'])
    items.positif_per_usia.semua.perempuan['60_69'] = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan['60_69'] - items.sembuh_per_usia.semua.perempuan['60_69'] - items.meninggal_per_usia.semua.perempuan['60_69'])
    items.positif_per_usia.semua.perempuan['70_79'] = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan['70_79'] - items.sembuh_per_usia.semua.perempuan['70_79'] - items.meninggal_per_usia.semua.perempuan['70_79'])
    items.positif_per_usia.semua.perempuan.atas_80 = ifNegatifReturnZero(items.positif_per_usia.semua.perempuan.atas_80 - items.sembuh_per_usia.semua.perempuan.atas_80 - items.meninggal_per_usia.semua.perempuan.atas_80)
    state.items = items
  }
}

export const actions = {
  async getItems ({ commit }, options) {
    const { data } = await axios.get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar?level=prov')
    commit('setItems', data.data.content)
    commit('changePositifAktifUsia', data.data.content)
  }
}

export const getters = {
  itemsMap (state) {
    return state.items
  }
}
