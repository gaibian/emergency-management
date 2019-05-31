<template>
  <div class="login-container">
    <div class="bottom-bg-png">
      <div class="png-box png1"></div>
      <div class="png-box png2"></div>
      <div class="png-box png3"></div>
    </div>
    <!-- <div class="mark-box"></div> -->
    <div class="login-form-box">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">急救车管理系统</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input 
            ref="password" 
            v-model="loginForm.password" 
            placeholder="请输入密码" 
            tabindex="2"
            :type="passwordType"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
            ></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

        <!-- <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        </el-tooltip> -->
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">立即登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur',message:'请输入用户名' }],
        password: [{ required: true, trigger: 'blur',message:'请输入密码' }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route)
        this.redirect = route.query && route.query.redirect
        // console.log(route)
        // const query = route.query
        // if (query) {
        //   this.redirect = query.redirect
        //   this.otherQuery = this.getOtherQuery(query)
        // }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    // if (this.loginForm.username === '') {
    //   this.$refs.username.focus()
    // } else if (this.loginForm.password === '') {
    //   this.$refs.password.focus()
    // }
  },
  // 解除事件绑定
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          //this.$router.push('/')
          //  vuex 存储用户名
          this.$store.dispatch('user/login',this.loginForm).then(() => {
            console.log(this.redirect)
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            console.log(this.oherQuery);
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          })
        } else {
          return false
        }
      })
    },
    // getOtherQuery(query) {
    //   return Object.keys(query).reduce((acc, cur) => {
    //     if (cur !== 'redirect') {
    //       acc[cur] = query[cur]
    //     }
    //     return acc
    //   }, {})
    // }
  }
}
</script>
<style lang="scss">
.login-form-box{
  .el-input {
    display: inline-block;
    //height: 47px;
    width: 85%;
    input{
      background:rgba(0,0,0,0);
      outline:none;
      border:0;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
      box-shadow:0 0 0 60px #e5e5e5 inset;
      -webkit-text-fill-color: #878787;
    }
    // input:-webkit-autofill {
    //     -webkit-box-shadow: 0 0 1000px rgba(232,240,254,1) inset !important;
    //     -webkit-text-fill-color: #606266 !important;
    // }
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background:#ecf5ff;
  overflow: hidden;
  .bottom-bg-png{
    width:100%;
    height:170px;
    position:absolute;
    left:0;
    bottom:0px;
    overflow:hidden;
    .png-box{
      position: absolute;
      top:0;
      width:4000px;
      height:170px;
      background:url('../../assets/login-png.png');
      &.png1{
        left:0;
        animation: walk 30s infinite;
        animation-timing-function: linear;
      }
      &.png2{
        left:0px;
        top:20px;
        animation: walk 20s infinite;
        animation-timing-function: linear;
      }
      &.png3{
        top:30px;
        // animation-delay: 2s;
      }
    }
  }
  .login-form {
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width: 80%;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    padding-top:24px;
    box-sizing:border-box;
    .title {
      font-size: 26px;
      color: #409EFF;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @keyframes walk{
    0%{
      position: absolute;
      left:0
    }
    60%{
      position: absolute;
      left:-2000px
    }
    100%{
      position: absolute;
      left:0px
    }
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }


}
.login-form-box{
    position:absolute;
    top:36%;
    left:50%;
    transform:translate(-50%,-36%);
    width:500px;
    height:300px;
    //background:$bg;
    background:#fff;
    border-radius:6px;
    z-index:3;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

</style>
