<template>
  <UForm :schema="schema" :state="state" class="space-y-4 w-[50%]" @submit="onSubmit">
    <UFormGroup label="Contraseña" name="password">
      <UInput v-model="state.password" />
    </UFormGroup>

    <UFormGroup label="Confirme su Contraseña" name="confirmPassword">
      <UInput v-model="state.confirmPassword" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import {type Infer, nonempty, object, string} from "superstruct";
import type {FormSubmitEvent} from "#ui/types";
import axios from "axios";
import { watch,ref,onMounted } from 'vue'


const props = defineProps<{
  idUser: number
}>();
const schema = object(
    {
      password: nonempty(string()),
      confirmPassword: nonempty(string()),
    }
)
const state = reactive({
  password: '',
  confirmPassword: ''
})

type Schema = Infer<typeof schema>

const config = useRuntimeConfig()
const localUserId = ref(props.idUser);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const put = await axios.put(config.public.STRAPI_USERS_EXISTING + `/${props.idUser}`, {
    password: state.password,
    confirmed: true,
    resetPassword: true,
  })
}


watch(() => props.idUser, (newValue: number) => {
  localUserId.value = newValue;
});
</script>

