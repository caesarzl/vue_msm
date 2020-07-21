<template>
  <div class="layout">
    <el-container>
      <el-header>会员管理系统
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            router
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/">
                <template slot="title"> <i class="iconfont icon-shouye"></i>首页</template>
            </el-menu-item>
            <el-menu-item index="/member/">
                <template slot="title"> <i class="iconfont icon-VIP"></i>会员管理</template>
            </el-menu-item>
            <el-menu-item index="/supplier/">
                <template slot="title"> <i class="iconfont icon-supplier"></i>供应商管理</template>
            </el-menu-item>
            <el-menu-item index="/goods/">
                <template slot="title"> <i class="iconfont icon-shangpinguanli"></i>商品管理</template>
            </el-menu-item>
            <el-menu-item index="/staff/">
                <template slot="title"> <i class="iconfont icon-yuangongguanli"></i>员工管理</template>
            </el-menu-item>
            
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb v-show="$route.path !== '/'" separator="/">
            <el-breadcrumb-item class="line" :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import {logout} from '@/api/logout.js'
export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('msm-user'))
    
  },
  methods: {
    async handleCommand(command) {
     
     switch(command) {
       case 'a':
         this.$message('click on item ' + command);
         break;
       case 'logout':
         const {data: res} = await logout(localStorage.getItem('msm-token'))
        //  console.log(res);
          if(res.flag) {
            this.$router.push('/login')
            localStorage.clear()
          }
         
         break;
         default:
           break;
     }
    }
  },
}
</script>


<style  scoped>
.layout,.el-container,.el-aside,.el-main{
  height: 100%;
}
.el-menu {
  border-right: 0;
  overflow: hidden;
}
.el-header {
  font-size: 20px;
  text-align: center;
  color: #fff;
  line-height: 60px;
  background-color: #2d3a4b;
}
.el-dropdown {
  color: #fff;
  float: right;
  margin-right: 100px;
  font-size: 15px;
  cursor: pointer;
}
.el-aside {
  background-color: #545c64;
}
.el-main {
  background-color: #fff;
  overflow: hidden;
}
.iconfont {
  font-size: 20px;
  margin-right: 15px;
}
.el-breadcrumb {
  height: 10px;
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.line {
  border-left: 3px solid #31c17b;
  padding-left: 10px;
}
</style>