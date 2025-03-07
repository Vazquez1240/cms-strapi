<template>
  <header class="h-[80px] flex justify-center items-center p-4">
    <div class="w-full flex justify-start" v-if="data?.foooter?.logo?.url !== undefined">
      <NuxtImg :src="'http://localhost:1337'+data?.foooter?.logo?.url" width="140" height="140"/>
    </div>
    <div class="w-full flex justify-end gap-4">
      <UPopover>
        <UButton
            size="xl" variant="ghost" trailing-icon="lucide:circle-user-round" :ui="{rounded: 'rounded-full'}"
            :style="{color:colorPrimario, backgroundColor: hover ? colorPrimario + '10' : 'transparent'}"
            @mouseover="hover = true"
            @mouseleave="hover = false"/>

        <template #panel>
          <div class="w-[280px] h-[220px] flex flex-col gap-8 p-4 items-center">
            <div v-if="useUserStore.auth.token !== '' "
                 class="w-full flex flex-col gap-6 justify-center items-center mt-6">
              <div class="flex flex-col gap-4 w-full justify-center items-center">
                <p class="text-1xl text-gray-500">Hola {{useUserStore.datosUser.nombre.toUpperCase()}}</p>
                <p class="flex gap-2 justify-center items-center text-[12px] text-gray-400" ><UIcon name="lucide:mail"/>{{useUserStore.datosUser.correo}}</p>
              </div>
              <div class="w-full flex flex-col gap-3">
                <UButton
                    class="w-full flex justify-center items-center"
                    :disabled="true"
                    :style="{backgroundColor:data?.colores[0]?.color_primario }">Gestiona tu perfil</UButton>
                <UButton
                    class="w-full flex justify-center items-center"
                    variant="outline"
                    color="white"
                    @click="() => logoutKeycloak()"
                >Cerrar sesión</UButton>
              </div>
            </div>
            <div v-else class="w-full flex flex-col gap-8 justify-center items-center mt-6">
              <NuxtImg :src="'http://localhost:1337'+data?.foooter?.logo?.url" width="200" height="200"/>
              <UButton
                  class="w-full flex justify-center items-center"
                  @click="() => loginKeycloak()"
                  :style="{backgroundColor:data?.colores[0]?.color_primario }">Acceder</UButton>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <div>

    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { userStore } from "~/stores/userStore";

const hover = ref(false);
const useUserStore = userStore();

const props = defineProps({
  data: []
})
const data = ref([])


watch(() => props.data, (nuevaData) => {
  console.log(nuevaData, 'nuevadata')
  data.value = nuevaData;
})

const colorPrimario = computed(() => {
  return data.value?.colores?.[0]?.color_primario || "#000000"; // Color por defecto
});

const loginKeycloak = () => {
  window.location.href = 'http://localhost:1337/api/keycloak/endpoint/login';
};

const logoutKeycloak = () => {
  const refreshToken = useUserStore.auth.refresh_token;
  window.location.href = `http://localhost:1337/api/keycloak/endpoint/logout?refresh_token=${refreshToken}`;
};


</script>

