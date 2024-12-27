<script setup lang="ts">

import { NInput, NSelect, NIcon, SelectOption } from 'naive-ui'
import { type PropType, ref, computed } from 'vue'
import { useUserStore } from '@/store/userStore'
import IUserAccount from '@/interface/IUserAccount'
import { UserAccountType } from '@/enum/UserAccountType'
import { Delete48Regular } from "@vicons/fluent";

const emit = defineEmits(['saveNewUser', 'updateUser', 'deleteUser'])

// const store = useUserStore()

const props = defineProps({
  user: Object as PropType<IUserAccount>,
  index: Number,
  isNewUser: Boolean
})
const labels = ref(props.user.labels.join(';'))
const options = [{
  label: 'Локальная',
  value: UserAccountType.LocalAccount
},
{
  label: "LDAP",
  value: UserAccountType.LdapAccount
}];

const isValidLogin = computed(() => {
  return props.user.login.trim() !== ''
})

const isValidPassword = computed(() => {
  if (props.user.password === '' && props.user.accountType === UserAccountType.LdapAccount) {
    return true;
  }
  return props.user.password.trim() !== ''
})

const isValid = computed(() => {
  return isValidLogin.value && isValidPassword.value
})

const isExists = computed(() => {
  return !props.isNewUser
})

const updateUser = () => {
  if (isValid.value) {
    if (isExists.value) {
      console.log('emit updateUser');
      emit('updateUser');
    }
    else {
      let array: string[] = labels.value.split(';')
      props.user.labels = array;
      console.log('emit saveNewUser');
      emit('saveNewUser');
    }
  }
};

function handleUpdateValue(value: UserAccountType, option: SelectOption) {
  if (value === UserAccountType.LdapAccount) {
    props.user.password = '';
  }
  props.user.accountType = value;
  updateUser();
}

const onUserDelete = () => {
  console.log('emit deleteUser');
  emit('deleteUser')
}

const onLabelsChange = () => {
  if (isExists.value && isValid.value) {
    let array: string[] = labels.value.split(';')
    props.user.labels = array;
    console.log('emit updateUser');
    emit('updateUser');
  }
}

</script>
<template>
  <div class="line">
    <div>
      <input class="input--label" v-model="labels" type="text" placeholder="Метки" v-on:blur="onLabelsChange" />
    </div>
    <div>
      <n-select v-model:value="props.user.accountType" placeholder="Тип записи" :options="options"
        @update:value="handleUpdateValue" />
    </div>
    <div :class="{ 'field--double': props.user.accountType === UserAccountType.LdapAccount }">
      <n-input v-model:value="props.user.login" type="text" :maxlength="100" placeholder="Логин" @blur="updateUser"
        :class="{ 'invalid': !isValidLogin }" />
    </div>
    <div v-if="props.user.accountType === UserAccountType.LocalAccount">
      <n-input v-model:value="props.user.password" type="password" :maxlength="100" placeholder="Пароль"
        @blur="updateUser" :class="{ 'invalid': !isValidPassword }" />
    </div>
    <div>
      <n-icon size="30" color="#4d4c4b" @click="onUserDelete">
        <Delete48Regular />
      </n-icon>
    </div>
  </div>

</template>

<style>
.invalid {
  border: 1px solid red;
}

.input--label {
  height: 30px;
  border-radius: 3px;
  border: 1px solid lightgrey;
  width: 100%;
}
</style>