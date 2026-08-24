<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
})
useHead({
  title: 'Dashboard',
})

const { user, clear: clearSession } = useUserSession()

async function logout () {
  await clearSession()
  await navigateTo('/login')
}


useHead({
  title: 'Pricing',
})

</script>


<template>
  <div>
    <h1>Welcome {{ user?.name }}</h1>
    <button @click="logout">
      Logout
    </button>
  </div>
</template>
