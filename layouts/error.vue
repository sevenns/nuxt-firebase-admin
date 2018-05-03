<template lang='pug'>

.error-block
  .error-block__item(v-if='error.statusCode === 404')
    .error-block__status 404
    .error-block__text Page not found
    v-btn.mt-5(flat, color='indigo', nuxt, to='/') Home
  .error-block__status(v-else) An error occurred

</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },

  layout: 'index'
}
</script>

<style lang='sass' scoped>

.error-block
  text-align: center

.error-block__status
  font-weight: 300
  font-size: 48px

</style>

