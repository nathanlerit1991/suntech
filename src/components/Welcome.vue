<template>
  <div id="welcome">
    <div class="title">
      <h1>Welcome</h1>
      <small>Suntech</small>
    </div>
    <div class="profile_info">
      <p>{{ props_first_name }} {{ props_last_name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    props_first_name: {
      type: String,
    },
    props_last_name: {
      type: String,
    }
  }
}
</script>