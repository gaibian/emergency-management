<template>
  <section class="app-main" ref="appMain">
    <el-row class="page-loading" v-loading="pageLoading" v-show="pageLoading" element-loading-text="数据正在加载中..."></el-row>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  data() {
    return {

    }
  },
  mounted() {
    let appMainHeight = this.$refs.appMain.offsetHeight;
    console.log(appMainHeight)
    this.$store.dispatch('setAppMainHeight',appMainHeight)
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    pageLoading() {
      return this.$store.state.global.pageLoading
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  //background:#e5e5e5;
}
.page-loading{
  position: absolute;
  top:0px;
  left:0;
  width:100%;
  height:100%;
}
.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
