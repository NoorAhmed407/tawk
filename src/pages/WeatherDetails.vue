<script setup lang="ts">
import HourlyCard from '@/components/HourlyCard.vue';
import WeeklyCard from '@/components/WeeklyCard.vue';
import { router } from '@/router';
import { API_KEY } from '@/utils/constants';
import { store } from '@/vuex/store';
import { onMounted, ref } from 'vue';

const lat = store.state.cityData?.lat;
const lon = store.state.cityData?.lon;
const index = store.state.cityData?.index || 1;

const cityData = ref(null)
const lastUpdateTime = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
const isFavorite = ref(false);


const handleBack = () => {
    router.back();
}


const fetchWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );

    if (!response.ok) {
      console.error(`API error (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();
    console.log("dataaa", data)
    cityData.value = data;
    lastUpdateTime.value = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    checkIfFavorite();
  } catch (err) {
    console.error(`Error fetching weather data for (${latitude}, ${longitude}):`, err);
    return null;
  }
};

const addToFavorite = () => {
    const savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
    const cityExists = savedCities.some(city => city.lat === lat && city.lon === lon);

    if (!cityExists) {
      savedCities.push({ lat, lon });
      localStorage.setItem('savedCities', JSON.stringify(savedCities));
      alert('City added to favorites!');
    }
}

const deleteFromFavorite = () => {
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
    savedCities = savedCities.filter(city => !(city.lat === lat && city.lon === lon));
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
    alert('City removed from favorites!');
}

const checkIfFavorite = () => {
    const savedCities = JSON.parse(localStorage.getItem('savedCities')) || [];
    isFavorite.value = savedCities.some(city => city.lat === lat && city.lon === lon);
}

onMounted(()=>{
    fetchWeatherData(lat, lon);
})

</script>

<template>
    <div class="bg-blue-600"> 
        <div class="container mx-auto pb-10">
            <div class=" flex justify-between items-center py-10">
                <span class="pi pi-angle-left text-3xl text-white cursor-pointer" @click="handleBack"></span>
                <h1 class="text-lg text-white">{{ cityData?.name }}</h1>
                <div v-if="index">
                    <span v-if="!isFavorite" class="pi pi-plus text-2xl text-white cursor-pointer" @click="addToFavorite"></span>
                    <span v-else class="pi pi-trash text-2xl text-white cursor-pointer" @click="deleteFromFavorite"></span>
                </div>
                <div v-else></div>
            </div>
            <div class="my-4 flex flex-col justify-center items-center">
                <h1 class="text-lg text-white">{{new Date().toDateString()}}</h1>
                <img class="w-20 h-20 my-5" src="../assets/rainy.png" alt="Weather Icon">
                <h1 class="text-2xl text-white">{{cityData?.main?.temp}}</h1>
                <h1 class="text-4xl text-white">{{ cityData?.weather ? cityData?.weather[0]?.description : '' }}</h1>

                <h1 class="text-md text-white mt-10 cursor-pointer">Last Update {{ lastUpdateTime }} AM <span class="pi pi-replay cursor-pointer" @click="fetchWeatherData(lat, lon)"></span></h1>
            </div>
        </div>
    </div>


    <div class="container mx-auto p-4">
       
            <h1 class="text-3xl my-5">Hourly Forcast</h1>

            <div class="flex overflow-x-auto whitespace-nowrap space-x-4">
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
            <HourlyCard />
        </div>


       
       <h1 class="text-3xl my-5">Weekly Forcast</h1>

       <div class="">

            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
            <WeeklyCard />
        </div>

    </div>

</template>