<template>
  <div class="base">
    <Modal :isOpen="modalIsOpen" @close-modal="closeModal">
      <template #item>
        {{ this.tickerToRemove }}
        <button @click="closeModal()">Отмена</button>
        <button @click="closeModal(), deleteTicker(this.tickerToRemove)">
          Подтверждаю
        </button>
      </template>
    </Modal>
    <p class="title">Тикер</p>
    <input
      v-model="inputTicker"
      @input="promptsHandler()"
      placeholder="Например BTC"
    />
    <div class="container">
      <button
        @click="addTickerByPrompt(prompt)"
        v-for="prompt in prompts"
        :key="prompt"
        class="prompt"
      >
        {{ prompt }}
      </button>
    </div>

    <div v-if="errorTickerAdded" class="errorMessage">
      Такой токен уже есть!!!
    </div>
    <div v-if="errorTickerNotExistInData" class="errorMessage">
      Такого токена не существует!!!
    </div>
    <button
      @click="addTickerByInput()"
      @keydown.enter="addTickerByInput()"
      class="inputadd"
    >
      Добавить
    </button>
    <input
      v-model="inputFilter"
      @input="filterHandler()"
      placeholder="Искомый токен"
    />
    <hr />
    <ItemList :items="filteredTickers" @delete-item="openModal">
      <div class="head">Отслеживаемые тикеры</div>
    </ItemList>
    <hr />
  </div>
</template>

<script>
// -- Задачи --
// [ ] Slot
// [ ] Адреса веб страницы
// [ ] Cookies
// [x] Filter
// [ ] Func sleep

import ItemList from "./components/ItemList.vue";
import Modal from "./components/ModalWindow.vue";
import { apifetcher } from "./api.js";

export default {
  name: "App",
  data() {
    return {
      inputTicker: "",
      inputFilter: "",
      tickerToRemove: {},
      possibleTickers: [],
      prompts: [],
      modalIsOpen: false,
      filteredTickers: [],
      addedTickers: [
        { name: "BTC", price: "-" },
        { name: "BTCD", price: "-" },
        { name: "BTCRY", price: "-" },
        { name: "DBTC", price: "-" },
        { name: "BTCR", price: "-" },
      ],
      errorTickerAdded: false,
      errorTickerNotExistInData: false,
    };
  },
  components: {
    ItemList,
    Modal,
  },
  methods: {
    addTickerByInput() {
      const newTicker = {
        name: this.inputTicker,
        price: "-",
      };
      if (!this.tickerInData(newTicker.name))
        this.errorTickerNotExistInData = true;
      else if (!this.tickerAdded(newTicker.name))
        this.addedTickers.push(newTicker);
      else this.errorTickerAdded = true;
      this.clearInput();
      this.filterHandler();
    },
    addTickerByPrompt(prompt) {
      const newTicker = {
        name: prompt,
        price: "-",
      };
      this.addedTickers.push(newTicker);
      this.clearInput();
      this.filterHandler();
    },
    deleteTicker(tickerToRemove) {
      this.addedTickers.splice(this.addedTickers.indexOf(tickerToRemove), 1);
      this.filterHandler();
    },
    tickerAdded(newTickerName) {
      let testbool = false;
      this.addedTickers.forEach((currentTicker) => {
        if (
          currentTicker.name.toLowerCase().includes(newTickerName.toLowerCase())
        )
          testbool = true;
      });
      return testbool;
    },
    tickerInData(newTickerName) {
      return this.possibleTickers.includes(newTickerName);
    },

    promptsHandler() {
      this.prompts = [];
      this.clearErrors();
      if (this.inputTicker === "") return;
      this.possibleTickers.forEach((item) => {
        if (item.toUpperCase().includes(this.inputTicker.toUpperCase()))
          this.prompts.push(item);
      });
      this.updatePrompts();
      this.prompts = this.prompts.slice(0, 10);
    },
    updatePrompts() {
      this.prompts = this.prompts.filter((item) => {
        return !this.tickerAdded(item);
      });
    },

    errorHandler() {},
    clearErrors() {
      this.errorTickerNotExistInData = false;
      this.errorTickerAdded = false;
    },

    clearInput() {
      this.inputTicker = "";
      this.prompts = [];
    },
    filterHandler() {
      this.filteredTickers = [];
      this.addedTickers.forEach((currentTicker) => {
        if (
          currentTicker.name
            .toUpperCase()
            .includes(this.inputFilter.toUpperCase())
        )
          this.filteredTickers.push(currentTicker);
      });

      // this.addedTickers.filter((currentTicker) => {});
    },

    openModal(tickerToRemove) {
      this.tickerToRemove = tickerToRemove;
      this.modalIsOpen = true;
    },
    closeModal() {
      this.modalIsOpen = false;
    },
  },
  async created() {
    this.possibleTickers = Object.keys(await apifetcher());
    this.filterHandler();
  },
};
</script>

<style scoped>
.head {
  font-size: large;
  margin: auto;
  margin-bottom: 30px;
}
.base {
  display: flex;
  flex-direction: column;
}
.title {
  border: 1px solid black;
  font-size: large;
  margin: auto;
  margin-bottom: 10px;
}
.container {
  display: flex;
  flex-direction: row;
  margin: auto;
  .prompt {
    /* display: inline-block; */
    font-size: small;
    margin: 20px;
    border: 1px solid black;
    border-radius: 2px;
    padding: 2px;
    width: fit-content;
    user-select: none;
  }
}
.inputadd {
  height: 20px;
  aspect-ratio: 1;
  margin: auto;
  margin-bottom: 10px;
  margin-top: 10px;
}
.errorMessage {
  color: red;
  border-radius: 3px;
  box-shadow: 2px black;
  margin: auto;
  margin-bottom: 10px;
}
input {
  /* border: 1px solid black; */
  margin: auto;
  margin-bottom: 10px;
}
button {
}
hr {
  width: 100%;
}
</style>
