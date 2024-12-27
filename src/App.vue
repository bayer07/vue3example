<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from './store/userStore.ts'
import Title from './components/Title.vue'
import Table from './components/Table.vue'
import TableRow from './components/TableRow.vue'
import TheInformation from './components/Information.vue'
import { UserAccountType } from '@/enum/UserAccountType'

const store = useUserStore();
const users = ref(store.users);
const newUserVisible = ref(false);
const newUser = ref({
  id: store.userId,
  labels: [],
  accountType: UserAccountType.LocalAccount,
  login: '',
  password: ''
});

function saveNewUser() {
  if (newUser.value) {
    store.addUser(newUser.value);
    newUser.value = {
      id: store.userId,
      labels: [],
      accountType: UserAccountType.LocalAccount,
      login: '',
      password: ''
    };
    newUserVisible.value = false;
  }
}

function updateUser(user, index) {
  console.log(user, index);
  store.updateUser(user, index);
}

function addButton() {
  newUserVisible.value = true;
}

function deleteUser(index) {
  store.deleteUser(index)
}
</script>

<template>

  <Title text="Учетные записи" @add-button="addButton" />
  <TheInformation text="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;" />
  <main>
    <Table>
      <TableRow v-for="(user, index) in users" :key="user.id" :user="user" :index="index" :isNewUser="false"
        @update-user="updateUser(user, index)" @delete-user="deleteUser(index)" />
      <TableRow v-if="newUserVisible" :user="newUser" :index="users.length" @save-new-user="saveNewUser"
        :isNewUser="true" />
    </Table>
  </main>

</template>