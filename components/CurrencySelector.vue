<template>
  <div>
    <div id="open-modal" class="modal-window">
      <div>
        <span class="modal-close" @click="$emit('closeModal')">Close</span>
        <div class="mt-30">
          <a href="#">
            <div
              v-for="(currency, index) in currencies"
              :key="index"
              class="currency_list"
              @click="selectedCurrency(currency)"
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
  props: {
    actionType: {
      type: String,
      default: 'input',
    },
  },
  data() {
    return {
      currencySymbol: '',
      viewCurrencyList: false,
      currencies: [],
    }
  },
  created() {
    const currencies = currencyService.getCurrencies()
    this.currencies = currencies.data
  },
  methods: {
    getImgUrl(pic) {
      return require('../assets/flags/' + pic)
    },
    selectedCurrency(currency) {
      this.$emit('selectedEvent', currency)
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
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
  transition: all 0.3s;
  // &:target {
  //   visibility: visible;
  //   opacity: 1;
  //   pointer-events: auto;
  // }
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
  cursor: pointer;
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
