<script setup>
import { router } from '@/router';
import { store } from '@/vuex/store';

const props = defineProps({
  cityData: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const handleClick = () => {
    const {cityData} = props;
    console.log('WeatherCard clicked', cityData.coord);
    store.commit('updateCity', {...cityData.coord, index: props.index});
    router.push({ name: 'WeatherDetails'});
};
</script>

<template>
    <div @click="handleClick" class="cursor-pointer my-5 bg-[url('https://images.unsplash.com/photo-1708552592233-5934a64eaec0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdWR5JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center rounded-lg p-3">
        <div class="flex justify-between items-center">
            <div  class="py-2">
                <h1 class="text-2xl font-bold text-white">{{cityData?.name}}</h1>
                <h1 class="text-md text-white">{{cityData?.weather ? cityData?.weather[0]?.main : ''}}</h1>
            </div>

            <h1 class="text-4xl text-white">
               {{cityData?.main?.temp}} °C
            </h1>
        </div>

        <div class="flex justify-between items-center">
            <div  class="py-2 text-white">
                <h1 class="text-sm text-white">{{cityData?.weather ? cityData?.weather[0]?.description : '' }}</h1>
            </div>
            <h1 class="text-sm text-white">
               H: {{cityData?.main?.temp_max}}°C, L: {{cityData?.main?.temp_min}}°C
            </h1>
        </div>
    </div>
</template>