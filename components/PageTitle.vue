<template lang='pug'>

.display-2.mb-5(:class='color')
  slot

</template>

<script>

export default {
  props: {
    color: {
      type: String,
      default: 'blue darken-4'
    }
  }
}

</script>
