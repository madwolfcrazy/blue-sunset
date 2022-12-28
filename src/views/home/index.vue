<template>
  <a-page-header
    title="Welcome"
    sub-title="This is a welcome subtitle"
    @back="() => null"
  />
  <a-steps :current="1">
    <a-step>
      <!-- <span slot="title">Finished</span> -->
      <template #title>Finished</template>
      <template #description>
        <span>This is a description.</span>
      </template>
    </a-step>
    <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
    <a-step title="Waiting" description="This is a description." />
  </a-steps>
  <a-space direction="vertical">
    <a-date-picker v-model:value="value1" />
    <a-month-picker v-model:value="value2" placeholder="Select month" />
    <a-range-picker v-model:value="value3" />
    <a-week-picker v-model:value="value4" placeholder="Select week" />
  </a-space>
</template>
<script setup>
import {ref, reactive} from 'vue'
const value1 = ref()
const value2 = ref()
const value3 = ref()
const value4 = ref()
</script>
