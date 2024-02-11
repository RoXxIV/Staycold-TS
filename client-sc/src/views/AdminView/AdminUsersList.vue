<template>
  <section class="admin-users-section">
    <h1>Liste des utilisateurs</h1>
    <ul class="statistics">
      <li>Utilisateurs en attente: {{ isPending }}</li>
      <li>|</li>
      <li>Utilisateurs actifs: {{ isActive }}</li>
    </ul>
    <!-- Table of users -->
    <table>
      <thead>
        <th>Username</th>
        <th>Role</th>
        <th>Email</th>
        <th>Status</th>
        <th>Nb baignades</th>
        <th>Depuis le</th>
        <th>Actions</th>
      </thead>
      <tbody>
        <TableUserRow
          v-for="user in Users"
          :key="user._id"
          :_id="user._id"
          :username="user.username"
          :email="user.email"
          :status="user.status"
          :role="user.roles[0].name"
          :bathCount="user.bathCount"
          :createdAt="user.createdAt"
          @deleteUser="(showModal = true), (selectedUserId = user._id)"
          :class="
            user.status === 'Pending' && isOverAMonthOld(user.createdAt)
              ? 'isOverAMonthOld'
              : ''
          "
        />
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="all-users-pagination">
      <button
        @click="changePage(-1)"
        :disabled="page === 1"
        aria-label="Afficher les baignades précedentes"
      >
        Précédent
      </button>
      <button
        @click="changePage(1)"
        :disabled="isNextDisabled"
        aria-label="Afficher les baignades suivantes"
      >
        Suivant
      </button>
    </div>

    <!-- Modal to confirm user deletion -->
    <PopupModal
      :isdisplayed="showModal"
      @close="showModal = false"
      class="modal-content"
    >
      <template v-slot:default="{ close }"
        ><p>Cette action est irréversible</p>
        <p>êtes vous sur ?</p>
        <div>
          <!-- cancel button -->
          <button @click="close">Annuler</button>
          <!-- delete button -->
          <button @click="deleteUser(selectedUserId)">
            Supprimer
            <font-awesome-icon :icon="['far', 'trash-can']" aria-label="true" />
          </button></div
      ></template>
    </PopupModal>
  </section>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";
import UserService from "@/services/user-service";
import TableUserRow from "@/components/Admin/TableUserRow.vue";
import renderBathData from "@/helpers/renderBathData";
import PopupModal from "@/components/Common/PopupModal.vue";
import type { IUserProfile } from "@/types/user";

const Users = ref<IUserProfile[]>([]);
const showModal = ref(false);
const selectedUserId = ref("");
const isPending = ref<number>(0);
const isActive = ref<number>(0);
const page = ref<number>(1);
const limit = ref<number>(10);
const total = ref<number>(0);

// Fetch users and format their creation date
const fetchUsers = async () => {
  try {
    const response = await UserService.getAll(page.value, limit.value);
    Users.value = response.data;
    Users.value.forEach((user) => {
      user.createdAt = renderBathData.editDateFormat(user.createdAt);
      user.status === "Pending" ? isPending.value++ : isActive.value++;
    });
    console.log(Users.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
  }
};

// Delete user and close modal
const deleteUser = async (userId: string) => {
  try {
    await UserService.delete(userId);
    showModal.value = false;
    fetchUsers();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
  }
};

/**
 * Updates the current page number for pagination.
 * @param {number} increment - The value to add to the current page number.
 */
const changePage = (increment: number) => {
  page.value += increment;
};

// check if next button is disabled
const isNextDisabled = computed(() => Users.value.length < limit.value);

// Fetch users on component mount
watchEffect(() => {
  fetchUsers();
});

// Check if user pending account is over a month old
const isOverAMonthOld = (
  registrationdate: string,
  atcualDate = new Date().getTime()
) => {
  let dateToCheck = new Date(
    registrationdate.split("/").reverse().join("-")
  ).getTime();

  let differenceInDays =
    Math.abs(dateToCheck - atcualDate) / (1000 * 60 * 60 * 24);

  if (differenceInDays > 30) {
    return true;
  }
  return false;
};
</script>

<style lang="scss" scoped>
/**scss here */
.admin-users-section {
  margin: auto;
  h1 {
    text-align: center;
  }
  .statistics {
    display: flex;
    justify-content: center;
    margin: 1rem;
    li:nth-child(2) {
      margin: 0 1rem;
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      background-color: var(--secondary-background);
      th {
        padding: 0.5rem;
        text-align: left;
      }
    }
    tbody {
      tr {
        td {
          padding: 0.5rem;
        }
        button {
          margin: 0.5rem;
        }
        &.isOverAMonthOld {
          border-right: 5px solid #bf7272;
        }
      }
    }
  }

  .all-users-pagination {
    text-align: center;
    margin-top: 50px;
    button {
      margin: 10px;
    }
  }

  .modal-content {
    text-align: center;
    p {
      margin: 0.5rem;
    }
    button {
      margin: 0.5rem;
    }
  }
}
</style>
