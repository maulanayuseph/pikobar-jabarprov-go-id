<template>
  <div />
</template>

<script>
export default {
  validate ({ route, redirect }) {
    redirect(`${process.env.URL}/info/infographics`)
    return false
  }
}
</script>
