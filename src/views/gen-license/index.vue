<template>
  <div>
    <h2>生成license</h2>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="IP">
        <a-input v-model:value="formState.ip" placeholder="IP" />
      </a-form-item>
      <a-form-item label="端口">
        <a-input-number v-model:value="formState.port" placeholder="连接端口" />
      </a-form-item>
      <a-form-item label="用户">
        <a-input v-model:value="formState.user" placeholder="用户" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="formState.pwd" placeholder="密码" />
      </a-form-item>
      <a-form-item label="SN">
        <a-input v-model:value="formState.sn" placeholder="SN" />
      </a-form-item>
      <a-form-item label="版本">
        <a-select
          ref="select"
          v-model:value="formState.ver"
          :options="verList"
        >
        </a-select>
      </a-form-item>
      <a-form-item label="调控比例">
        <a-input-number v-model:value="formState.rate" :min="1" :max="99" :step="0.1" :formatter="value => `${value}%`"
        :parser="value => value.replace('%', '')" />
      </a-form-item>
      <a-form-item label="客户名称">
        <a-input v-model:value="formState.client" placeholder="" />
      </a-form-item>
      <a-form-item label="到期时间">
        <a-date-picker v-model:value="formState.expire_time" placeholder="" />
      </a-form-item>
      <a-form-item :wrapper-col="btnWrapper">
        <a-button type="primary" @click="btnClick">生成</a-button>
      </a-form-item>
    </a-form>
</div>
</template>

<script setup>
import {ref, reactive} from 'vue'
import FileSaver from 'file-saver'
import {genLicense} from '@/api/license.js'

const formState = reactive({
  ip: '',
  user: '',
  pwd: '',
  port: 22,
  ver: '',
  sn: '',
  rate: 96.0,
  client: ''
})
const verList = ref([
  {value: "v1.4", label: "v1.4"},
  {value: "v2.0", label: "v2.0"}
])
const labelCol =  {
        span: 4
      }
const  wrapperCol = {
        span: 14
      }
const btnWrapper = {span: 14, offset: 4}

//
const btnClick = () => {
  genLicense(formState).then(resp => {
    if(resp.code === 0) {
      let blob = new Blob([resp.data], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, formState.client + "_"+ formState.sn + ".license");
    } else {
      // baocuo
    }
  })
}
</script>
