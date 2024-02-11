<template>
  <tr class="user-list-row">
    <td>{{ username }}</td>
    <td>{{ role }}</td>
    <td>{{ email }}</td>
    <td class="status">
      {{ status }}
      <span
        class="status-circle"
        :class="status === 'Active' ? 'active' : 'pending'"
      ></span>
    </td>
    <td>{{ bathCount }}</td>
    <td>{{ createdAt }}</td>
    <td>
      <button :disabled="true">Modifier</button>
      <button @click="emitDeleteUser">Supprimer</button>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps({
  _id: String,
  username: String,
  email: String,
  status: String,
  role: String,
  createdAt: String,
  bathCount: Number,
});

const emit = defineEmits(["deleteUser"]);
const emitDeleteUser = () => {
  emit("deleteUser", props._id);
};
</script>

<style lang="scss" scoped>
.user-list-row {
  td {
    padding: 0.5rem;
    border-bottom: 1px solid #f2f2f2;

    &.status {
      .status-circle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
        text-align: right;
        //margin-left: 0.5rem;
      }
      .active {
        background-color: rgb(61, 226, 61);
      }
      .pending {
        background-color: rgb(41, 96, 248);
      }
    }
    button {
      margin: 0.5rem;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}
</style>
