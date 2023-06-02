<script>
export default {
  name: `Preloader`,
};
</script>

<template>
  <div id="preloader">
    <div class="loading">
      <lottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_yppp9lxb.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
    </div>
  </div>
</template>
