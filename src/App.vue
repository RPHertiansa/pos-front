<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@font-face {
  font-family: "AirbnbCerealBook";
  src: url('./assets/font/AirbnbCerealBook.woff') format("woff");
}
#app {
  font-family: 'AirbnbCerealBook', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
