<template>
  <div class="elevation-5">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        text: "Dashboard",
        disabled: false
      },
      {
        text: "Link 1",
        disabled: false
      },
      {
        text: "Link 2",
        disabled: true
      }
    ]
  })
};
</script>
