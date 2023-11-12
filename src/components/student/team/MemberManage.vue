<script setup lang="ts">
import {computed, defineComponent, reactive, ref} from "vue";
import {TeamInfo} from "@/utils/types/type";

const defaultItem = {
  name: "",
  username: "",
  email: "",
};

const props = defineProps<{
  teamInfo: TeamInfo
}>()


//TODO:
const user = 12110000
const teamInfo = reactive(props.teamInfo)

const creator = ref(teamInfo.creator_id)
const members = teamInfo.members.map(member => ({
  sid: member.sid,
  name: member.name
}));

const columns = [
  {key: "姓名"},
  {key: "学号"},
  {key: "操作"},
];


let editedItemId = ref(-1);
let editedItem = ref(-1);
let createdItem = reactive({...defaultItem});

// const
//     isNewData = computed(() => {
//       return Object.keys(createdItem).every(
//           (key) => !!createdItem[key]
//       );
//     })
//
// function resetEditedItem() {
//   editedItem.value = -1;
//   editedItemId.value = -1;
// }
//
// function resetCreatedItem() {
//   createdItem = reactive({...defaultItem});
// }
//
//
// function deleteItemById(id: number) {
//   items = [...items.slice(0, id), ...items.slice(id + 1)];
// }
//
// function addNewItem() {
//   items = [...items, {...createdItem}];
//   resetCreatedItem();
// }
//
// function editItem() {
//   items = [
//     ...items.slice(0, editedItemId.value),
//     {...editedItem},
//     ...items.slice(editedItemId.value + 1),
//   ];
//   resetEditedItem();
// }
//
// function openModalToEditItemById(id: number) {
//   editedItemId.value = id;
//   editedItem.value = {...items[id]};
// }
</script>

<template>
  <div class="va-table-responsive">
    <table class="va-table va-table--clickable va-table--striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Sid</th>
        <th v-if="teamInfo.creator_id===user">Option</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="member in members"
          :key="member.sid"
      >
        <td>{{ member.name }}</td>
        <td>{{ member.sid }}</td>
        <td v-if="teamInfo.creator_id===user">
          <va-button
              class="mr-3 mb-2"
              color="danger"
          >
            移除
          </va-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>


<!--  <va-modal-->
<!--      class="modal-crud"-->
<!--      :model-value="editedItem!==-1"-->
<!--      title="Edit item"-->
<!--      size="small"-->
<!--      @ok="editItem"-->
<!--      @cancel="resetEditedItem"-->
<!--  >-->
<!--  </va-modal>-->
</template>

<style lang="scss" scoped>
.va-table-responsive {
  overflow: auto;
}

.modal-crud {
  .va-input {
    display: block;
  }
}
</style>