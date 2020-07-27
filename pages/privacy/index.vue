<template>
  <div class="mb-16 m-4 md:m-8">
    <header class="text-center">
      <h1 class="text-2xl font-bold">
        {{ TAC.title }}
      </h1>
      <span class="opacity-75">
        {{ TAC.date }}
      </span>
    </header>
    <div class="mt-10 html-content">
      <strong>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="TAC.agreement" />
      </strong>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="TAC.description" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    TAC () {
      const config = this.$store.state['remote-config'].config
      return config ? config.termsAndCondition : {}
    }
  }
}
</script>

<style>

</style>
