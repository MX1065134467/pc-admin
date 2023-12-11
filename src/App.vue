<template>
  <div id="app">
   <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  padding-right: 0 !important;
}
// ::-webkit-scrollbar{
//   display: none;
// }
p {
  margin: 0;
  padding: 0;
}

i {
  font-style: normal;
}

ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.search_warp {
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 20px 0 20px;
  margin-bottom: 24px;
  .search_content_wrap {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    .search_content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .search-item {
        margin-right: 20px;
        margin-top: 10px;
        .search {
          width: 63%;
        }
      }
    }
    .btn {
      display: flex;
      margin-top: 10px;
      .clear {
        margin-left: 20px;
      }
    }
  }
}
.tabs {
  span {
    display: inline-block;
    padding: 10px 25px;
    border: 1px solid #e6e6e6;
    cursor: pointer;
    &:first-child {
      border-radius: 5px 0 0 5px;
    }
    &:last-child {
      border-radius: 0px 5px 5px 0;
    }
  }
  .active {
    color: #4791ff;
    border: 1px solid #4791ff;
  }
}
.el-tooltip__popper.is-dark {
  margin: 0 30px 0 40px;
}
</style>
