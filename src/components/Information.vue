<script setup>

import { NIcon } from 'naive-ui';
import { QuestionCircle48Regular } from "@vicons/fluent";

defineProps({
  text: {
    type: String,
    required: true,
  },
})

</script>

<template>
    
<div class="information-block">

    <n-icon size="30" color="#4d4c4b">
        <QuestionCircle48Regular/>
    </n-icon>

    <span class="information-text">
        {{ text }}
    </span>
</div>
    
</template>

<style scoped>
.information-block{ 
    align-items: center;
    display: flex;
    background-color: #e3e2e1
}
.information-text{
    margin-left: 1em;
}
</style>