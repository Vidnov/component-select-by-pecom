<template>
  <div
    id="select-with-search"
    class="select-with-search"
    :class="{ focused: showDropdown }"
  >
    <label for="input_select" class="select-control" >
      <span class="title">Номер телефона</span>
      <input
        id="input_select"
        v-model="searchTerm"
        @input="filterOptions"
        @click.stop="handleShowDropdown"
        class="input"
        type="text"
      />
      <vArrow
        class="arrow"
        :class="{ active: showDropdown }"
      />
    </label>
    <transition name="dropdown-fade">
      <div class="dropdown" v-show="showDropdown">
        <div class="dropdown-wrapper" v-if="filteredOptions.length">
          <ul class="lists">
            <li
              class="list"
              :class="{ selected: activeList(list.id) }"
              v-for="list in filteredOptions"
              :key="list.id"
              @click="handleOptionSelect(list)"
            >
              {{ list.name }}
            </li>
          </ul>
        </div>
        <div v-else class="dropdown-wrapper">
          <span> Нет данных</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import vArrow from './icons/vArrow.vue';
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
    },
  },
  components: {
    vArrow,
  },
  data() {
    return {
      show: false,
      searchTerm: '',
      choiceId: '',
      filteredOptions: this.options,
    };
  },
  computed: {
    showDropdown() {
      return this.show;
    },
    activeList() {
      return (id) => {
        return this.choiceId === id;
      };
    },
  },
  created() {
    if (this.modelValue) {
      this.choiceId = this.modelValue.id;
      this.searchTerm = this.modelValue.name;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClick);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClick);
  },
  methods: {
    handleShowDropdown() {
        this.show = !this.show;
    },
    handleClick(event) {
      const element = document.getElementById('select-with-search');
      if (!element.contains(event.target)) {
        this.show = false;
      }
    },
    handleOptionSelect(option) {
      this.$emit('update:model-value', option);
      this.searchTerm = option.name;
      this.choiceId = option.id;
      this.show = false;
    },
    filterOptions() {
      this.show = true;
      this.filteredOptions = this.options.filter(
        (option) =>
          option.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
};
</script>

<style scoped lang="scss">
.select-with-search {
  cursor: pointer;
  display: flex;
  position: relative;
  font-family: Roboto, sans-serif;
  background: #ffffff;
  border: 1px solid #e4e6e7;
  border-radius: 3px;
  &:hover {
    border: 1px solid #848fc9;
  }
  .select-control {
    display: flex;
    flex-flow: column;
    gap: 4px;
    padding: 9px 16px 4px;
    width: 100%;
    cursor: pointer;
    .title {
      color: #aaaaaa;
      font-size: 11px;
      line-height: 14px;
      font-weight: 400;
    }

    .input {
      border: none;
      color: #2b2b2b;
      font-size: 16px;
      line-height: 20px;
      font-weight: 400;
      width: 100%;
      padding: 0;
      &:focus-visible {
        border: none;
        outline: none;
      }
    }
    .arrow {
      transition: all ease-in 0.3s;
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
    }
    .active {
      transform: rotate(180deg) translateY(50%);
    }
  }
  .dropdown {
    position: absolute;
    top: 102%;
    left: 0;
    right: 0;
    padding: 12px;
    border: 1px solid #e4e6e7;
    border-radius: 9px;
    background: #ffffff;
    box-shadow: 0 4px 16px 0 #d1d1d140;
    .dropdown-wrapper {
      max-height: 260px;
      overflow: scroll;
      .lists {
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: column;
        gap: 4px;
        .list {
          cursor: pointer;
          padding: 8px 16px;
          font-family: Roboto, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          text-align: left;
          list-style: none;
          border-radius: 3px;
          &:hover {
            background: #f7f9fb;
            color: #48538b;
          }
        }
        .selected {
          background: #48538b;
          color: #ffffff;
          &:hover {
            background: #48538b;
            color: #ffffff;
          }
        }
      }
    }
  }
}
.focused {
  border: 1px solid #48538b;
  &:hover {
    border: 1px solid #48538b;
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
}
</style>
