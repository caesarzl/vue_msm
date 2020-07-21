<template>
  <div>
    <el-form :inline="true" ref="searchForm" :model="searchMap">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option v-for="item in payTypeOptions" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
         <el-date-picker
            v-model="searchMap.birthday"
            type="date"
            placeholder="出生日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
        <el-button class="addBtn" type="primary" @click="dialogFormVisible = true">添加</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="添加会员" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm">
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="addForm.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="addForm.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员手机" prop="phone">
          <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input v-model="addForm.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户余额" prop="money">
          <el-input v-model="addForm.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model="addForm.birthday"
            type="date"
            placeholder="出生日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="addForm.payType" placeholder="支付类型">
          <el-option v-for="item in payTypeOptions" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
     <el-table :data="memberList" height="380" border style="width: 100%" >
       <template slot="empty">
         <span>请稍后，正在加载数据</span>
       </template>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="cardNum" label="会员卡号" width="150"></el-table-column>
        <el-table-column prop="name" label="会员姓名"></el-table-column>
        <el-table-column prop="birthday" label="会员生日" width="150"></el-table-column>
        <el-table-column prop="phone" label="会员手机" width="150"></el-table-column>
        <el-table-column prop="integral" label="可用积分"></el-table-column>
        <el-table-column prop="money" label="账户余额"></el-table-column>
        <el-table-column prop="payType" label="支付类型">
          <template slot-scope="scope">
            <span>{{scope.row.payType | payTypeFliter}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
        <el-table-column prop="address" label="会员地址" width="150">
           <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>


<script>
import getMemberApi from '@/api/member.js'
const payTypeOptions = [
  {type: '1', name: '现金'},
  {type: '2', name: '微信'},
  {type: '3', name: '支付宝'},
  {type: '4', name: '银行卡'}
]
export default {
  data() {
    return {
      payTypeOptions,
      memberList: null,
      total: 0, //总记录数
      currentPage: 1,//当前页码
      pageSize: 10, //每页显示10条数据
      searchMap: {
        cardNum: '',
        name: '',
        birthday: '',
        payType: '',

      },//查询条件
      dialogFormVisible: false,
      addForm: {
        cardNum: '',
        name: '',
        birthday: '',
        phone: '',
        integral: '',
        money: '',
        payType: '',
        address: ''
      },
      addFormRules: {
        cardNum: [
          { required: true, message: '请输入会员卡号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入会员姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请选择会员生日', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入会员手机号', trigger: 'blur' },
          { min: 8, max: 11, message: '长度在 8 到 11 个字符', trigger: 'blur' }
        ],
        integral: [
          { required: true, message: '请输入会员积分', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '请输入会员余额', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请选择支付类型', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入会员地址', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.fetchData()
  },
  filters: {
    payTypeFliter(type) {
      const payObj = payTypeOptions.find(obj => {
        return obj.type === type
      }) 
      return  payObj ? payObj.name : null
    }
  },
  methods: {
    async fetchData() {
      // const {data: res} = await getMemberApi.getMemberList()
      const {data:res} = await getMemberApi.search(this.currentPage, this.pageSize, this.searchMap)
      console.log(res);
      if(res.flag) {
        this.total = res.data.total
        this.memberList = res.data.rows
      }
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.fetchData()

    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.fetchData()
    },
    resetForm() {
      this.$refs.searchForm.resetFields()
    }
  },
}
</script>


<style scoped>
  .el-pagination {
    margin-top: 10px;
  }
  .addBtn {

  }
</style>