<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <el-row class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="require('@/assets/admin-header-img.jpg')" class="user-avatar">
          <span class="name-title">管理员</span>
        </div>
      </el-row>
      <!-- <div class="right-menu-item yc-text">
        <i class="el-icon-warning"></i>
        <span>共有<em>100</em>辆车异常</span>
      </div> -->
      <div class="right-menu-item">
        <el-badge :value="12" class="badge-item">
          <svg-icon :icon-class="'car-admin'"></svg-icon>
        </el-badge>
      </div>
      <screenfull id="screenfull" class="right-menu-item hover-effect" style="font-size:16px;" />
      <div class="right-menu-item" style="font-size:20px">
        <i class="el-icon-s-tools"></i>
      </div>
      <div class="right-menu-item logout-box">
        <svg-icon :icon-class="'logout'" @click.native="logout"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import screenfull from '@/components/screenfull'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      //this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss">
.badge-item{
  font-size:22px;
  cursor: pointer;
  .el-badge__content.is-fixed{
    top:14px !important;
  }
}
</style>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom:#e5e5e5 1px solid;
  //box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .logout-box{
    cursor: pointer;
    margin-right:12px;
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 14px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
    .avatar-container {
      //margin-right: 12px;
      .avatar-wrapper {
        position: relative;
        height:100%;
        padding-left:40px;
        box-sizing:border-box;
        font-size:0;
        .name-title{
          font-size:16px;
          border-right:1px #e5e5e5 solid;
          padding-right:14px;
        }
        .user-avatar {
          position: absolute;
          top:50%;
          left:0;
          transform:translate(0,-50%);
          display:inline-block;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 0px;
          top: 50%;
          transform:translate(0,-50%);
          font-size: 12px;
        }
      }
    }
  }
}
</style>
