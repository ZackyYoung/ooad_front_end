<script setup lang="ts">
import {StudentInfo} from '@/utils/types/type'
import {computed, ref} from "vue";
import {reactive} from "vue";

const props = defineProps<{
  studentInfo: StudentInfo
}>()
const studentInfo = reactive(props.studentInfo)

</script>

<template>
  <div class="info-container">
    <va-card class="info-card">
      <va-card-title class="info-card__title">{{ studentInfo.name }}的个人简介</va-card-title>
      <va-card-content class="info-card__content">
        <div class="info-card__content__sid">
          学号：{{ studentInfo.sid }}
        </div>
        <div class="info-card__content__gender">
          性别：{{ studentInfo.gender === 1 ? '男' : '女' }}
        </div>
        <div class="info-card__content__major">
          专业：{{ studentInfo.major }}
        </div>
        <div class="info-card__content__degree">
          学级：{{ studentInfo.degree }}级
        </div>
        <div class="info-card__content__intro">
          个人简介:<br>
          {{ studentInfo.intro ? studentInfo.intro : '尚未填写简介~' }}
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<style scoped lang="scss">
.info-container {
  flex: content;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;

  .info-card {
    text-align: left;
    grid-gap: 10px;

    &__content {
      padding-left: 3rem;
      padding-right: 3rem;
      display: grid;
      grid-gap: 1rem;
      grid-template-areas:"sid gender"
                        "major degree"
                        "intro intro";
      grid-template-columns: 1fr 1fr;

      .content-basic {
        font-family: HGY3, serif;
        line-height: 2
      }

      &__sid {
        grid-area: sid;
        @extend .content-basic
      }

      &__gender {
        grid-area: gender;
        @extend .content-basic
      }

      &__major {
        grid-area: major;
        @extend .content-basic
      }

      &__degree {
        grid-area: degree;
        @extend .content-basic
      }

      &__intro {
        grid-area: intro;
        @extend .content-basic
      }
    }

    &__title {
      font-size: 1rem;
    }

  }
}
</style>