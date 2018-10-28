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
        text: "Documentos",
        disabled: false
      },
      {
        text: "Nuevo",
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
