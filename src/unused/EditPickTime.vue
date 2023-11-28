<script setup lang="ts">
import {computed, reactive, ref} from "vue";

const startTime = ref(new Date(2023, 11, 20, 8, 0, 0));
const endTime = ref(new Date(2023, 11, 25, 17, 30, 0));
let formTime = ref(new Date());
let save_time = new Date();
const isEditStart = ref<boolean>(false);
const isEditEnd = ref<boolean>(false);

function format(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function editStart() {
  save_time = new Date(startTime.value.getTime())
  isEditStart.value = true;
}

function cancelStart() {
  startTime.value = new Date(save_time.getTime())
  isEditStart.value = false;
}

function editEnd() {
  save_time = new Date(endTime.value.getTime())
  isEditEnd.value = true;
}

function cancelEnd() {
  endTime.value = new Date(save_time.getTime());
  isEditEnd.value = false;
}


async function submitStart() {
  console.log('current Start:' + startTime.value)
  isEditStart.value = false;
}

async function submitEnd() {
  console.log('current end:' + startTime.value)
  isEditEnd.value = false;
}
</script>

<template>
  <va-card class="my_card">
    <va-card-title>
      选房开始时间
    </va-card-title>
    <div style="flex: auto">
      <va-date-input v-model="startTime" :disabled="!isEditStart"/>
      <va-time-input v-model="startTime" :disabled="!isEditStart"/>
      <va-button
          v-if="!isEditStart"
          icon="edit"
          :disabled="isEditEnd"
          class="icon_button"
          @click="editStart"
      />
      <span v-if="isEditStart">
        <va-button
            class="icon_button"
            icon="save"
            @click="submitStart"
        />
        <va-button
            class="icon_button"
            icon="cancel"
            @click="cancelStart"
        />
      </span>
    </div>
  </va-card>

  <va-card class="my_card">
    <va-card-title>
      选房结束时间
    </va-card-title>
    <div>
      <va-date-input v-model="endTime" :disabled="!isEditEnd"/>
      <va-time-input v-model="endTime" :disabled="!isEditEnd"/>
      <va-button
          class="icon_button"
          v-if="!isEditEnd"
          :disabled="isEditStart"
          icon="edit"
          @click="editEnd"
      />
      <span v-if="isEditEnd">
        <va-button
            class="icon_button"
            icon="save"
            @click="submitEnd"
        />
        <va-button
            class="icon_button"
            icon="cancel"
            @click="cancelEnd"
        />
      </span>
    </div>
  </va-card>


</template>

<style scoped>
.my_card {
  margin: 0.2rem;
  padding: 0.5rem;
}

.icon_button {
  margin-left: 0.2rem;
}
</style>