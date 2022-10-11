<script setup>
import { ref, reactive } from 'vue'
import { useTaskStore } from '../../stores/Task'
import Icons from '../UI/Icons/Icons.vue' 

const { changeStateModal, updateTask, completeTask } = useTaskStore()
const formState = ref(true)

const props = defineProps({
  task: {
    required: true,
    type: Object,
  },
});
const completed_at = ref(props.task.completed_at)
const form = reactive({
  id: props.task.id,
  description: props.task.description
})


const updateTaskForm = (form) => {
  formState.value = !formState.value
  props.task.description = form.description
  updateTask(form)
}
const cancelUpdate = () => {
  formState.value = !formState.value
  form.description = props.task.description
}
const changeComplete = () => {
  const today = new Date();
  if (completed_at.value== null) {
    completed_at.value = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' / ' + today.getHours() + ":" + today.getMinutes()
  } else {
    completed_at.value = null
  } 
  completeTask({...props.task,completed_at :completed_at.value})

}
</script>

<template>
  <div
    class="bg-yellow-200 overflow-hidden h-72 cursor-pointer shadow-2xl w-40 pb-2  break-all transition rounded-md ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
    <form class="overflow-auto w-full" @submit.prevent="updateTaskForm(form)">
      <div class="flex justify-end pr-2  w-full h-8 mb-6 text-2xl bg-amber-200">
        <div v-if="formState" class="flex">
          <button type="button" class="flex h-8 items-center px-2 hover:scale-110 h-8"
            @click="formState = !formState">
            <Icons icon="editIcon"/>
          </button>
          <button type="button" class="flex h-8 items-center px-2 hover:scale-110 h-8"
            @click="changeComplete"> 
            <Icons icon="checkIcon"/>
          </button>
        </div>
        <div v-else class="flex">
          <button class="flex h-8 items-center px-2 hover:scale-110 h-8" type="submit">
            <Icons icon="saveIcon" />
          </button>
          <button class="flex h-8 items-center px-2 hover:scale-110 h-8" type="button"
            @click="cancelUpdate">
            <Icons icon="cancelIcon"/>
          </button>
        </div>
        <button v-if="formState" type="button" @click="changeStateModal(task.id)"
          class="flex h-8 items-center px-2 hover:scale-110">
          <Icons icon="calcelX"/>
        </button>
      </div>

      <div v-if="formState" class="px-4 overflow-auto h-40" :class="{ 'line-through': completed_at }">
        {{ task.description }}
      </div>
      <template v-else>
        <div class=" px-4 ">
          <textarea style="resize:none;" autofocus class="w-full h-40 bg-transparent outline outline-transparent"
            v-model="form.description">{{form.description}}</textarea>
        </div>
      </template>
    </form>
    <div class="px-2 h-4 text-xl" v-if="completed_at"> 
      Task completed: <span class="ml-2 text-sm">{{completed_at}}</span>
    </div>
  </div>
</template> 
