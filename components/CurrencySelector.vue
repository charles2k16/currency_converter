<template>
  <div>
    <div id="open-modal" class="modal-window">
      <div>
        <a href="#" title="Close" class="modal-close">Close</a>
        <div
          v-if="!viewCurrencyList"
          class="d-flex mt-30"
          style="align-items: center; justify-content: center"
        >
          <ViewLoader />
        </div>

        <div v-else class="mt-30">
          <a href="#">
            <div
              v-for="(currency, index) in currencies"
              :key="index"
              class="currency_list"
              @click="selectedCurrency($event, currency.symbol)"
            >
              <img
                :src="getImgUrl(currency.image)"
                :alt="currency.image"
                width="22px"
              />

              <span class="label mx-15"
                >{{ currency.symbol }} - {{ currency.name }}</span
              >
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import currencyService from '../api/currency'

export default {
  name: 'CurrencySelector',
  data() {
    return {
      currencySymbol: '',
      viewCurrencyList: false,
      currentCurrency: {
        symbol: 'USD',
        name: 'US Dollar',
        image: 'USD.png',
      },
      currencies: [],
    }
  },
  async fetch() {
    const currencies = await currencyService.getCurrencies()
    this.currencies = currencies.data
    this.viewCurrencyList = true
  },
  methods: {
    getImgUrl(pic) {
      return require('../assets/flags/' + pic)
    },
    selectedCurrency(currency) {
      // this.currentCurrency.symbol = currency.symbol
      // this.currentCurrency.name = currency.name
      // this.currentCurrency.image = currency.image

      console.log(currency)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-window {
  position: fixed;
  background-color: rgba(49, 37, 37, 0.25);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  &:target {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  & > div {
    max-width: 300px;
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1em 0;
    overflow-y: scroll;
    background: #0e0d0d;
    color: rgb(192, 186, 186);
    border-radius: 0.8rem;
  }
}

.modal-close {
  color: #b2483c;
  line-height: 50px;
  font-size: 80%;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: 70px;
  text-decoration: none;
}

.currency_list {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 20px;
  cursor: pointer;

  &:hover {
    background: rgb(24, 20, 20);
  }
}
</style>
