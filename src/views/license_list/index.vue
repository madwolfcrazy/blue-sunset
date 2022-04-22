<template>
  <a-table :dataSource="dataSource" :columns="columns" :row-selection="rowSelection">
  <template #customTitle>
      <span>
        客户名称
        <a-tooltip title="这是一个图标，鼠标移到这里显示该提示">
          <QuestionCircleOutlined />
        </a-tooltip>
      </span>
    </template>
  </a-table>
</template>
<script setup>
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
const dataSource = []
const columns = [
  {
    dataIndex: 'client_name',
    key: 'client_name',
    slots: {
            title: 'customTitle',
        },
  },
  {
    title: 'SN',
    dataIndex: 'sn',
    key: 'sn',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: 'port',
    dataIndex: 'port',
    key: 'port',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '调速比率',
    dataIndex: 'rate',
    key: 'rate',
  }
]
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
</script>
