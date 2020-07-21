<template>
  <div class="login-container">
    
    <el-form class="loginform" :model="loginForm" :rules="loginRuleForm" ref="loginFormRef" label-width="80px">
      <h2>会员管理系统</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-mima"></el-input>
      </el-form-item>
      <el-form-item class="loginBtn">
        <el-button  type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {login, getUserInfo} from '@/api/login'
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRuleForm: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if(valid) {
          // console.log('ok');
          const {data} = await login(this.loginForm.username, this.loginForm.password)
          // console.log(data);
          if(data.flag) {
            const {data: res} = await getUserInfo(data.data.token)
            console.log(res);
            if(res.flag) {
              window.localStorage.setItem("msm-user", JSON.stringify(res.data))
              window.localStorage.setItem("msm-token", JSON.stringify(data.data.token))
              this.$router.push('/') 
            }else {
              this.$message({
              message: res.message,
              type: 'warning'
              })
            }
          } else {
            this.$message.error('账号或密码错误');
          }
        }else {
          this.$message({
          message: '请输入账号和密码再登录',
          type: 'warning'
        }); 
        }
      })
    }
  },
}
</script>


<style scoped>
  .login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/login-background.webp') round;
  }
  .loginform {
    width: 350px;
    margin: 200px auto;
    background:rgba(255, 255, 255, 0.7);
    padding: 30px;
    border-radius: 20px;
  }
  .loginform /deep/ .el-form-item__label {
    text-align: justify !important;
    color: black !important;
  }
  .loginBtn /deep/ .el-form-item__content{
    margin-left: 0!important;
  }
</style>