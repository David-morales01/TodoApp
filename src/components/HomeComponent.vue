<script setup>
import Header from "./UI/Header/HeaderComponent.vue";
import Loading from "./UI/LoadingComponent/LoadingComponent.vue";
import Modal from "./UI/Modal/ModalComponent.vue";
import ModalError from "./UI/Modal/ModalError.vue";
import TaskItem from "./Task/TaskItem.vue";
import { onBeforeMount } from "vue";  
import {useTaskStore} from '../stores/Task'

const  store = useTaskStore()
const  {changeStateModal} = useTaskStore()

onBeforeMount( () =>  
store.getTask()
); 
</script>

<template>
  <Header /> 
  <div class="grid w-100 mx-10 my-6 ">
    <button @click="changeStateModal(null)" class="justify-self-end hover:scale-110 shadow-2xl bg-sky-500/100 rounded-lg text-white p-2">New Task</button>
  </div>
  <div class="flex w-100 flex-wrap gap-6 justify-between mx-10 my-10" v-if="store.taskList">
    <TaskItem v-for="task in store.taskList" :key="task.id" :task="task"/>
  </div>
  <Loading v-else />
  <Modal v-show="store.modal"/>
  <ModalError v-show="store.error" />
</template> 