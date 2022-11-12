<template>
  <div class="divImg">
    <p class="left-top">経験値</p>
    <v-icon class="left-bottom">mdi-chevron-triple-up</v-icon>
    <img src="@/assets/img/sword.svg" alt="剣士" />
    <p class="right-top">獲得</p>
    <v-icon class="right-bottom">mdi-chevron-triple-up</v-icon>
  </div>
</template>

<script>
  export default {
    name: "ClassAnime",
  };
</script>

<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css2?family=Overpass:wght@100&family=Rampart+One&display=swap");
  .divImg {
    position: relative;
    width: 100%;
    height: 200px;
    background-color: white;
    font-size: 36px;
    font-weight: bold;
    font-family: "Overpass", sans-serif;
    font-family: "Rampart One", cursive;
  }

  img {
    display: block;
    margin: -85px auto auto -85px;
    position: absolute;
    top: 55%;
    left: 50%;
    width: 170px;
    height: 170px;
    background-color: white;
    border-style: none;
    background-clip: padding-box;
    z-index: 1;
    animation: come-big-anim 3s linear;
  }

  .left-top {
    position: absolute;
    top: 10%;
    left: 5%;
    z-index: 2;
    animation: come-down-anim 3s linear;
  }
  .right-top {
    position: absolute;
    top: 10%;
    right: 10%;
    z-index: 2;
    animation: come-down-anim 3s linear;
  }

  .left-bottom {
    position: absolute;
    bottom: 20%;
    left: 6%;
    z-index: 2;
    animation: come-up-anim 3s linear infinite;
    font-size: 80px;
    color: skyblue;
    font-weight: normal;
  }

  .right-bottom {
    position: absolute;
    bottom: 20%;
    right: 6%;
    z-index: 2;
    animation: come-up-anim 3s linear infinite;
    font-size: 80px;
    color: skyblue;
    font-weight: normal;
  }

  @keyframes come-down-anim {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(8%);
    }
  }

  @keyframes come-up-anim {
    0% {
      opacity: 0.3;
      transform: translateY(70%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes come-big-anim {
    0% {
      transform: scale(0.4, 0.4);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
