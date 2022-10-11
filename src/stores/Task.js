import { defineStore } from 'pinia'
import {ref } from "vue"
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8000/api/"

export const useTaskStore = defineStore('store', () => { 
  const taskList = ref(false) 
  const modal = ref(false)
  const id = ref(null) 
  const error = ref(null) 
  const disable = ref(false) 

  const getTask = async () => { 
    axios.get("tasks").then((response)=>{ 
      taskList.value = response.data.data 
    }).catch(()=>{
      taskList.value = []
      error.value = "Error loading tasks, check your connection"
    })
  } 

  const storeTask = async (data) => { 
    disable.value = true
    axios.post("tasks",data).then((response)=>{ 
      taskList.value.push(response.data.data)
      modal.value =  !modal.value 
    }).catch(()=>{
      error.value = "Failed to save task, check your connection"
    }).finally=(()=>{
      disable.value = false
    })
  } 

  const updateTask = async (data) => { 
    axios.put("tasks/" + data.id,data).catch(()=>{
      error.value = "Error editing task, check your connection"
    })
  } 

  const completeTask = async (data) => { 
    axios.put("taskComplete/" + data.id,data).catch((err)=>{
      console.log(err)
      error.value = "Failed to complete task, check your connection"
    })
  } 
  const closeModalError = async ( ) => { 
    error.value = null  
  } 
  
  const deleteTask = async (id) => {
    disable.value = true
    await axios.delete("tasks/" + id) 
    await getTask()
    disable.value = false
    modal.value = !modal.value
  } 
  
  const changeStateModal = async (value) => { 
    modal.value =  !modal.value 
    disable.value = false
    id.value = value  
  } 

  return{
    taskList,getTask,storeTask,deleteTask,completeTask,updateTask,changeStateModal,disable,id,modal,error,closeModalError
  }
})
