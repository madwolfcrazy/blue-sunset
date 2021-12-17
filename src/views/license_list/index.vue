<template>
  <a-table :dataSource="dataSource" :columns="columns" :row-selection="rowSelection" />
</template>
<script setup>
const dataSource = []
const columns = [
  {
    title: '客户名称',
    dataIndex: 'client_name',
    key: 'client_name',
  },
  {
    title: 'D15 SN',
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
