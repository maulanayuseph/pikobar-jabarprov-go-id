<template>
  <Accordion id="taskForceList">
    <template #header>
      <h2 class="text-2xl font-bold leading-tight">
        Website Gugus Tugas Kota/Kabupaten Jawa Barat
      </h2>
    </template>
    <template #content>
      <TaskForce />
    </template>
  </Accordion>
</template>

<script>

import TaskForce from '~/components/TaskForce'
export default {
  components: {
    Accordion: () => import('./Accordion'),
    TaskForce
  }
}
</script>

<style>

</style>
