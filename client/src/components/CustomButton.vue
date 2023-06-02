<script>
export default {
  name: `CustomButton`,
  props: ["name", "type", "displayClass", "iconClass"],
};
</script>

<template>
  <button :type="type" :class="displayClass">
    <i :class="iconClass"></i>
    {{ name }}
  </button>
</template>
