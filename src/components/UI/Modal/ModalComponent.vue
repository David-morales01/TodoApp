<script setup> 
    import {useTaskStore} from '../../../stores/Task'
    import FormTask from '../Form/FormComponent.vue'
    import DeleteTak from '../../Task/DeleteTask.vue'

    const  store = useTaskStore()

</script>

<template>
    <transition enter-active-class="ease-out duration-300" enter-class="opacity-0" enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200" leave-class="opacity-100" leave-to-class="opacity-0">
        <div v-show="store.modal" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <transition enter-active-class="ease-out duration-300"
                        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                        leave-active-class="ease-in duration-200" leave-class="opacity-100 translate-y-0 sm:scale-100"
                        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">                       
                        <DeleteTak v-if="store.id" />
                        <FormTask v-else/>
                    </transition>
                </div>
            </div>
        </div>
    </transition>
</template>