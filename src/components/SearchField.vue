<template>
    <div class="relative mx-auto w-full max-w-md">
      <div class="flex items-center space-x-2">
        <input
          v-model="searchQuery"
          @input="onInput"
          @keydown.down.prevent="highlightNext"
          @keydown.up.prevent="highlightPrev"
          @keydown.enter.prevent="selectHighlighted"
          type="text"
          placeholder="Search for a city or airport"
          class="border bg-gray-200 border-gray-300 w-full rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500"
          autocomplete="off"
        />
        <button
          @click="handleSearch"
          class="bg-blue-800 text-white px-3 py-2 cursor-pointer rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <ul
        v-if="filteredSuggestions.length > 0"
        class="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg"
      >
        <li
          v-for="(suggestion, index) in filteredSuggestions"
          :key="suggestion.city"
          @click="selectSuggestion(suggestion)"
          @mouseenter="highlightIndex = index"
          :class="[
            'cursor-pointer px-3 py-2',
            highlightIndex === index ? 'bg-blue-500 text-white' : ''
          ]"
        >
          {{ suggestion.city }}, {{ suggestion.country }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import dummyData from './../utils/constants';
import { store } from '@/vuex/store';
import { router } from '@/router';
  
  const searchQuery = ref('');
  const highlightIndex = ref(-1);
  const filteredSuggestions = ref([]);
  const  selectedCity = ref(null);
  
  const onInput = () => {
    if (searchQuery.value.trim() === '') {
      filteredSuggestions.value = [];
      highlightIndex.value = -1;
      return;
    }
    const query = searchQuery.value.toLowerCase();
    filteredSuggestions.value = dummyData.filter(({ city, country }) =>
      city.toLowerCase().includes(query) || country.toLowerCase().includes(query)
    ).slice(0, 5);
    highlightIndex.value = -1;
  };
  
  const selectSuggestion = (data) => {
    searchQuery.value = data.city;
    selectedCity.value = data;
    filteredSuggestions.value = [];
    highlightIndex.value = -1;
  };
  
  const highlightNext = () => {
    if (filteredSuggestions.value.length === 0) return;
    highlightIndex.value = (highlightIndex.value + 1) % filteredSuggestions.value.length;
  };
  
  const highlightPrev = () => {
    if (filteredSuggestions.value.length === 0) return;
    highlightIndex.value =
      (highlightIndex.value - 1 + filteredSuggestions.value.length) % filteredSuggestions.value.length;
  };
  
  const selectHighlighted = () => {
    if (highlightIndex.value >= 0 && highlightIndex.value < filteredSuggestions.value.length) {
      selectSuggestion(filteredSuggestions.value[highlightIndex.value]);
    }
  };
  
  const handleSearch = () => {
    console.log('Search for:', selectedCity.value);
    filteredSuggestions.value = [];
    highlightIndex.value = -1;
    store.commit('updateCity', selectedCity.value);
    router.push({name: "WeatherDetails"});
  };
  
  </script>

  