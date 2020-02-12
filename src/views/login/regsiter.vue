<template>
    <el-form v-model="regForm" label-width="60px" style="margin-top:20px;">
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户名">
              <el-input v-model="regForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-form-item label="密码">
                <el-input v-model="regForm.password"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row class="opater-box" type="flex" justify="center">
            <el-button size="mini" @click="handleCancel">取消</el-button>
            <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
        </el-row>
      </el-form>
</template>
<script>
import { userAdmin } from '@/api'
export default {
    name:'regsiter',
    data() {
        return {
            regForm:{
                username: '',
                password: ''
            },
        }
    },
    methods:{
        handleCancel() {
            this.$emit('regsiter',false)
        },
        handleSubmit() {
            userAdmin.userRegsiter().then(res => {
                console.log(res)
                this.$message({
                    message:'注册成功',
                    type:'success'
                })
                this.$emit('regsiter',true)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.opater-box{
    padding-bottom:20px;
}
</style>
