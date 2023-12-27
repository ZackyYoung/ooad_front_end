<template>
  <div class="page-content-card create-dom-container">
    <va-card class="create-dom-card">
      <div class="upload-file">
        <p class="my-title">
          通过文件批量导入
        </p>
        <va-file-upload
            v-model="info_file"
            style="margin:1rem;"
            dropzone
            file-types="xlsx"
            dropZoneText="上传宿舍信息文件（.xlsx）"
        />
        <div style="text-align: center">
          <va-button @click="file_import(info_file[0])">
            确认提交
          </va-button>
        </div>
      </div>
      <div class="input-info">
        <p class="my-title">
          新建宿舍
        </p>

        <va-form class="my-form flex flex-col items-baseline gap-6" ref="formRef">
          <va-select
              v-model="form.district"
              :options="district_options"
              :rules="[(v) => Boolean(v)|| '区域不能为空！']"
              label="区域"
              placeholder="请选择宿舍区域"
          />
          <va-select
              v-model="form.building"
              label="楼栋号"
              placeholder="请选择楼栋号"
              :options="building_options"
          />
          <va-input
              v-model="form.floor"
              label="楼层"
              :rules="[(v) => floorValidator(v)]"
              placeholder="请输入楼层（整数数字）"
          />
          <va-input
              v-model="form.roomNumber"
              label="房间号"
              :rules="[(v) => roomNumberValidator(v)]"
              placeholder="请输入房间号（整数数字）"
          />
          <va-select
              v-model="form.roomType"
              class="mb-6"
              label="户型"
              :rules="[(v) => Boolean(v)|| '户型不能为空！']"
              placeholder="选择户型"
              :options="type_options"
              value-by="value"
          />
          <va-select
              v-model="form.gender"
              class="mb-6"
              label="宿舍性别"
              :rules="[(v) => Boolean(v)|| '性别不能为空！']"
              placeholder="选择宿舍性别"
              :options="gender_options"
              value-by="value"
          />
          <va-textarea
              v-model="form.description"
              label="简介"
              placeholder="请给出宿舍简介"
              autosize
          />
        </va-form>
        <div class="form_b">
          <va-button class="save-button" :disabled="!isValid" @click="validate() && createRoom(form)">
            提交信息
          </va-button>
        </div>
      </div>
      <va-modal
          v-model="dialogVisible"
          :message="roomStore.msg"
          ok-text="Confirm"
          size="small"
      />
    </va-card>
  </div>
</template>


<script setup>

import {computed, defineComponent, reactive, readonly, ref, toRef} from "vue";
import {useForm} from "vuestic-ui";
import {
  gender_options,
  type_options,
  district_options,
  hupan_options,
  liyuan_options,
  erqi_options, xinyuan_options
} from "@/utils/DomOptions.js";
import {useRoomStore} from "@/store/room";
import * as XLSX from "xlsx";


const {isValid, validate, reset, resetValidation} = useForm('formRef')

const roomStore = useRoomStore()

const dialogVisible = ref(false)

const info_file = ref([])

const formRef = ref(null)

const form = reactive({
  district: '',
  building: '',
  roomNumber: '',
  floor: '',
  gender: '',
  roomType: '',
  description: ''
})

const building_options = computed(() => {
  if(form.district === '湖畔')
    return hupan_options;
  if(form.district === '荔园')
    return liyuan_options;
  if(form.district === '二期')
    return erqi_options;
  if(form.district === '欣园')
    return xinyuan_options;
})

const buildingIdValidator = (value) => {
  const re = /^\d+$/;
  if (!value) {
    return '楼栋号不能为空！';
  }
  if (!re.test(value)) {
    return '楼栋号必须为整数数字！'
  }
  if (Number(value) > 50) {
    return '楼栋号过大！'
  }
}

const floorValidator = (value) => {
  const re = /^\d+$/;
  if (!value) {
    return '楼层不能为空！';
  }
  if (!re.test(value)) {
    return '楼层必须为整数数字！'
  }
  if (Number(value) > 20) {
    return '层数值过大！'
  }
}

const roomNumberValidator = (value) =>{
  const re = /^\d+$/;
  if (!value) {
    return '房间不能为空！';
  }
  if (!re.test(value)) {
    return '房间号必须为整数数字！'
  }
}
async function createRoom(item) {
  await roomStore.addRoom(item)
  dialogVisible.value = true
  formRef.value.reset()
}

async function file_import(file)
{
  const fileReader = new FileReader();

  fileReader.onload = async (event) => {
    const arrayBuffer = event.target.result;

    // 将 Array Buffer 转换为工作簿对象
    const workbook = XLSX.read(arrayBuffer, {type: 'array'});

    // 获取第一个工作表
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // 将工作表转换为 JSON 数据
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

    const headers = jsonData[0];

    // 构建带属性的 JSON
    const result = jsonData.slice(1).map((row) => {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || null
      })
      return obj
    });
    for (const item of result) {
      await createRoom(item)
    }

  };

  fileReader.readAsArrayBuffer(file);
}
</script>

<style lang="scss" scoped>
.create-dom-container {
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
}

.create-dom-card {
  display: flex;
  justify-content: center;
  //align-items: center;
  flex-direction: column;

  .my-title {
    font-size: 1.5rem;
    text-align: left;
    padding: 1rem;
  }

  .my-form {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 1rem;
    padding: 1.5rem;
  }

  .save-button {
    margin: 1.5rem;
  }
}


</style>
