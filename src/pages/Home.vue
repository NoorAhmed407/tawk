<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Header from '../components/Header.vue';
import SearchField from '../components/SearchField.vue';
import WeatherCard from '../components/WeatherCard.vue';
import { API_KEY } from '@/utils/constants';

const cities = ref([]);

const weatherData = ref([]);


const fetchWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error (${response.status}): ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(`Error fetching weather data for (${latitude}, ${longitude}):`, err);
    return null;
  }
};

const fetchLocations = async () => {
  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser.');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const storageCities = localStorage.getItem('savedCities');
      if (storageCities) {
        cities.value = [{ lat: latitude, lon: longitude }, ...JSON.parse(storageCities)];
      } else {
        cities.value.push({ lat: latitude, lon: longitude });
      }

      fetchAllWeatherData();
    },
    (error) => {
      console.error('Error fetching location:', error.message);
      alert('Unable to access your location. Please enable GPS or location services.');
    }
  );
};

const fetchAllWeatherData = async () => {
  if (!cities.value.length) return;

  const weatherPromises = cities.value.map((city) =>
    fetchWeatherData(city.lat, city.lon)
  );

  try {
    const results = await Promise.allSettled(weatherPromises);

    const successfulResults = results
      .filter((result) => result.status === 'fulfilled' && result.value !== null)
      .map((result: any) => result.value);

    console.log('Successful weather responses:', successfulResults);
    weatherData.value = successfulResults;

  } catch (error) {
    console.error('Unexpected error while fetching weather data:', error);
  }
};


onMounted(()=>{
  fetchLocations();
})


</script>


<template>

  <div class="container mx-auto p-4">
    <Header />
    <SearchField />

    <div v-for="(item, index) in weatherData" :key="item.id">
      <WeatherCard :cityData="item" :index="index" />
    </div>
  </div>

  
</template>

<style scoped>

</style>
