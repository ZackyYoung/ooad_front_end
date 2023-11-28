<template>
  <va-card class="my_card">
    <va-card-title>
      选房时间
    </va-card-title>
    <va-card-content>
      <p class="my_para">选房起始时间：
        <span> {{ timeData[0] }}</span>
      </p>
      <p class="my_para">选房结束时间：
        <span> {{ timeData[1] }}</span>
      </p>
    </va-card-content>
  </va-card>

  <va-card class="my_card">
    <va-card-title>
      编辑时间
    </va-card-title>
    <va-card-content>
      <el-date-picker
          style="margin: 0.5rem"
          v-model="timeForm"
          :disabled-date="disabledDateFn"
          type="datetimerange"
          :value-format="'YYYY/MM/DD HH:mm:ss'"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
      />
      <div>
        <va-button
            icon="save"
            @click="submitTime"
            style="margin-left: 1rem;margin-top: 0.5rem"
        >
          保存新时间
        </va-button>
      </div>
    </va-card-content>
  </va-card>
  <va-card class="my_card">
    <va-card-title>
      选房结果
    </va-card-title>
    <va-card-content>
      <va-button
      >
        下载选房结果
        <va-icon
            name="download"
        />
      </va-button>
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
import {ref} from "vue";


const timeData = ref<string[]>([
  "2023/12/10 08:00:00",
  "2023/12/25 23:59:59"
]);
const timeForm = ref<string[]>(timeData.value);
const disabledDateFn = (time: Date) => {
  return time.getTime() < Date.now() - 8.64e7;
};

async function submitTime() {
  console.log('current form:' + timeForm)

}

</script>

<style scoped>
.my_card {
  margin: 0.2rem;
  padding: 0.5rem;

  .my_para {
    font-size: 1rem;
    margin: 0.3rem;
  }
}

.icon_button {
  margin-left: 0.2rem;
}
</style>