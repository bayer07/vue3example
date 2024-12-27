<template>
  <form class="form">
    <div class="line">
      <div>Метки</div>
      <div>Тип записи</div>
      <div>Логин</div>
      <div>Пароль</div>
      <div></div>
    </div>
    <slot>
    </slot>
  </form>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.line {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 68px;
  gap: 10px;
}

.field--double {
  grid-column: 3 / 5;
}
</style>