<script setup lang="ts">
import { useAuth, useFetch } from '#imports'

const { token } = useAuth()
const { data, pending } = useFetch('/api/v1/shop/counterparties', {
  headers: {
    Authorization: token.value
  },
  immediate: true
})
</script>

<template>
  <div>
    <div v-if="!pending">
      {{ data }}
    </div>
    <br>
    I'm a secret! My protection works via a global middleware. If you turned off
    the global middleware, then I'll also be visible without authentication :(
  </div>
</template>
