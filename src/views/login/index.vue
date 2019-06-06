<template>
  <div class="login-container">
    <div class="bottom-bg-png">
      <div class="png-box png1"></div>
      <div class="png-box png2"></div>
      <div class="png-box png3"></div>
    </div>
    <el-row class="login-form-box" type="flex">
      <el-col :span="12" class="login-bg">
      </el-col>
      <el-col :span="12" style="position:relative">
        <div class="login-form" v-show="!loginFlag">
          <el-form ref="loginForm" :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left">
            <div class="title-container">
              <h3 class="title">欢迎登陆</h3>
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
            <el-form-item prop="password" style="margin-bottom:0px">
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
          </el-form>
          <el-row type="flex" class="operate-box">
            <el-col>
              <span class="forget-password">记住账号</span>
            </el-col>
            <el-col style="text-align:right">
              <span class="forget-password">忘记密码?</span>
            </el-col>
          </el-row>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">立即登录</el-button>
        </div>
        <!--登陆加载动画-->
        <div class="login-loading" v-show="loginFlag">
          <div id="loading">
            <div id="loading-center">
              <div id="loading-center-absolute">
                <div class="object object_one"></div>
                <div class="object object_two"></div>
                <div class="object object_three"></div>
                <div class="object object_four"></div>
              </div>
            </div>
            <div class="text">正在登录中...</div>
          </div>
          
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { getToken, setToken } from '@/utils/auth' // get token from cookie
import { setTimeout } from 'timers';

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
      loginFlag:false,
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
          this.loginFlag = true;
          this.loading = true
          //this.$router.push('/')
          //  vuex 存储用户名
          setTimeout(() => {
            this.$store.dispatch('user/login',this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false;
              this.loginFlag = false;
            }).catch(() => {
              this.loading = false;
              this.loginFlag = false;
            })
          },2000)
          
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
    width: 70%;
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
  background:#e6e8eb;
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
    width: 75%;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .login-loading{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width: 100%;
    height:100%;
    max-width: 100%;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
    .text{
      position: absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:100%;
      margin-top:50px;
      text-align:center;
      font-size:14px;
      color:#909399
    }
  }
  #loading{
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 1;
    margin-top: 0px;
    top: 0px;
  }
  #loading-center{
    width: 100%;
    height: 100%;
    position: relative;
  }
  #loading-center-absolute {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 60px;
    width: 60px;
    margin-top: -30px;
    margin-left: -30px;
    -webkit-animation: loading-center-absolute 1s infinite;
    animation: loading-center-absolute 1s infinite;
  }
  .object{
    width: 20px;
    height: 20px;
    background:linear-gradient(to top,#3b9ffc,#1890ff);
    float:left;
    -moz-border-radius: 50% 50% 50% 50%;
    -webkit-border-radius: 50% 50% 50% 50%;
    border-radius: 50% 50% 50% 50%;
    margin-right: 20px;
    margin-bottom: 20px;	
    &:nth-child(2n+0) {
      margin-right: 0px;
    }
  }
  .object_one{
    -webkit-animation: object_one 2s infinite;
    animation: object_one 2s infinite;
  }
  .object_two{
    -webkit-animation: object_two 2s infinite;
    animation: object_two 2s infinite;
  }	
  .object_three{
    -webkit-animation: object_three 2s infinite;
    animation: object_three 2s infinite;
  }		
  .object_four{
    -webkit-animation: object_four 2s infinite;
    animation: object_four 2s infinite;
  }		
    
  @-webkit-keyframes loading-center-absolute{
    100% {
        -ms-transform: rotate(360deg); 
        -webkit-transform: rotate(360deg); 
        transform: rotate(360deg); 
      }			
  }		
  @keyframes loading-center-absolute{
    100% {
        -ms-transform: rotate(360deg); 
        -webkit-transform: rotate(360deg); 
        transform: rotate(360deg); 
      }
  }
  @-webkit-keyframes object_one{
    50% {
        -ms-transform: translate(20px,20px); 
        -webkit-transform: translate(20px,20px);
        transform: translate(20px,20px);
      }
    }		
    @keyframes object_one{
    50% {
        -ms-transform: translate(20px,20px); 
        -webkit-transform: translate(20px,20px);
        transform: translate(20px,20px);
      }
    }
    @-webkit-keyframes object_two{
    50% {
        -ms-transform: translate(-20px,20px); 
        -webkit-transform: translate(-20px,20px);
        transform: translate(-20px,20px);
      }
    }		
    @keyframes object_two{
    50% {
        -ms-transform: translate(-20px,20px); 
        -webkit-transform: translate(-20px,20px);
        transform: translate(-20px,20px);
      }
    }
    @-webkit-keyframes object_three{
    50% {
        -ms-transform: translate(20px,-20px); 
        -webkit-transform: translate(20px,-20px);
        transform: translate(20px,-20px);
      }
    }		
    @keyframes object_three{
    50% {
        -ms-transform: translate(20px,-20px); 
        -webkit-transform: translate(20px,-20px);
        transform: translate(20px,-20px);
      }
    }
    @-webkit-keyframes object_four{
    50% {
        -ms-transform: translate(-20px,-20px); 
        -webkit-transform: translate(-20px,-20px);
        transform: translate(-20px,-20px);
      }
    }		
    @keyframes object_four{
    50% {
        -ms-transform: translate(-20px,-20px); 
        -webkit-transform: translate(-20px,-20px);
        transform: translate(-20px,-20px);
      }
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
      color: #909399;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight:normal;
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
    top:34%;
    left:50%;
    transform:translate(-50%,-36%);
    width:800px;
    height:500px;
    //background:$bg;
    //border:#fff 2px solid;
    overflow:hidden;
    background:#fff;
    border-radius:6px;
    z-index:3;
    .login-bg{
      height:100%;
      background:url('../../assets/login-bg.jpg');
      background-position: center center;
      overflow:hidden;
    }
    .forget-password{
      font-size:14px;
      color:#409EFF;
    }
    .operate-box{
      width:100%;
      margin:12px 0;
      span{
        cursor: pointer;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

</style>
