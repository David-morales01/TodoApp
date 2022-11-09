<script setup>
import { reactive } from 'vue'
import { useTaskStore } from '../../../stores/Task' 

const store = useTaskStore()
const { storeTask } = useTaskStore()

const form = reactive({
    description: ""
})
</script>

<template>
    <div v-show="store.modal"
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

        <div class="mt-6 mb-8 px-4">
            <h3 class="text-3xl font-medium leading-6 text-gray-900" id="modal-title">
                Create Task
            </h3>
        </div>
        <form @submit.prevent="storeTask(form)">
            <div class="h-20 px-4">
                <input type="text" v-model="form.description"
                    class=" rounded-lg block w-full p-2.5 border border-sky-400 outline outline-transparent"
                    placeholder="Description" required>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button v-if="!store.disable" type="submit"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Save</button>
                <button v-else type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Cargando</button>
                <button type="button" @click="store.changeStateModal()"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
        </form>
    </div>
</template>