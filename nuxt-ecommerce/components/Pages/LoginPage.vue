<template>
  <UForm :schema="schema" :state="state" class="space-y-4 w-[50%]" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>

  <UModal v-model="isOpen">
    <div class="w-full flex justify-center items-center">
      <FormUpdatePassword  :id-user="idUser"/>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { object, string, nonempty, type Infer } from 'superstruct'
import type { FormSubmitEvent } from '#ui/types'
import axios from "axios"
import {ref} from "vue"
import FormUpdatePassword from "~/components/Pages/FormUpdatePassword.vue";

const config = useRuntimeConfig()
const isOpen = ref(false)
const idUser = ref(0)

const schema = object({
  email: nonempty(string()),
  password: nonempty(string())
})



const state = reactive({
  email: '',
  password: ''
})

type Schema = Infer<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const responseUsersStrapi = await axios.get(config.public.STRAPI_USERS_EXISTING+`?filters[email][$eq]=${event.data.email}`);
  if(responseUsersStrapi.data.length > 0) {
    const response = await axios.post(config.public.STRAPI_USERS_LOGIN, {
      identifier: event.data.email,
      password: event.data.password
    })
    console.log('response', response.data)
  }
}

</script>
