<template>
  <Accordion id="callCenterList">
    <template #header>
      <h2 class="text-2xl font-bold leading-tight">
        Hubungi Call Center
      </h2>
    </template>
    <template #content>
      <CallCenter />
    </template>
  </Accordion>
</template>

<script>
import CallCenter from '~/components/CallCenter'
export default {
  components: {
    Accordion: () => import('./Accordion'),
    CallCenter
  }
}
</script>

<style>

</style>
