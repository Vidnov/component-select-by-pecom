<template>
  <main>
    <h1>Select with Search</h1>
    <SelectWithSearch
        :options="options"
        v-model="selectedOption"
    />
  </main>
</template>

<script>
import SelectWithSearch from './components/vSelect.vue';

export default {
  components: {
    SelectWithSearch,
  },
  data() {
    return {
      options: [
        { id: Symbol(1), name: 'Option 1' },
        { id: Symbol(1), name: 'Option 2' },
        { id:Symbol(1), name: 'Option 3' },
        { id: Symbol(1), name: 'Option 4' },
      ],
      selectedOption: {id: 1,name: 'Option 1'},
    };
  },
};
</script>
<style lang="scss">
main {
  width: 100%;
}
</style>