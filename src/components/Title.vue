<script setup>

import { NButton } from 'naive-ui'

defineProps({
  text: {
    type: String,
    required: true,
  },
})

</script>

<template>
  <header>
    <h1>{{ text }}
      <n-button type="tertiary" class="add-button" @click="$emit('addButton')">+</n-button>
    </h1>
  </header>
</template>

<style scoped>

.add-button {
  margin-left: 1em;
}

</style>