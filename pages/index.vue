<template>
  <div class="converter_container">
    <div class="conv_wrapper">
      <div class="conv_head mx-30">
        <span class="link active">Converter</span>

        <span class="link">Calculator</span>
      </div>

      <div class="mt-20 conv_title mx-30">
        <h1 class="white">Currency</h1>

        <div>
          <span>12th Jan 2022</span>
          <img src="/clock.png" alt="time" width="12px" />
        </div>
      </div>

      <hr class="rule mt-20" />

      <!-- Input Currency -->
      <div class="mt-20 mx-30 exchange_container">
        <h3>CURRENCY I HAVE</h3>
        <p class="mt-0">I have this much to exchange</p>

        <hr class="rule mt-20" />

        <div class="mt-20">
          <div class="d-flex-justify-end">
            <span class="currency d-flex" @click="openModal('input')">
              <img
                :src="getImgUrl(currentInputCurrency.image)"
                alt="us"
                width="22px"
              />

              <span class="label mx-15">{{ currentInputCurrency.name }}</span>

              <img src="/down.png" alt="arr" width="16px" />
            </span>
          </div>
          <div class="exchange_input mt-20 d-flex-justify-end">
            <span class="label mr-10">{{ currentInputCurrency.symbol }}</span>
            <input
              v-model="amountEntered"
              type="number"
              class="input white"
              placeholder="0.000"
            />
          </div>
        </div>
      </div>

      <!-- Switch Currency -->
      <div class="switch_wrapper mx-30 mt-20">
        <img src="/switch.png" alt="icon" width="25px" />
        <span>Switch Currencies</span>
      </div>

      <!-- Output Currency -->
      <div class="mt-30 mx-30 exchange_container">
        <h3>CURRENCY I WANT</h3>
        <p class="mt-0">Expected amount after exchange</p>

        <hr class="rule mt-20" />

        <div class="mt-20">
          <div class="d-flex-justify-end">
            <span class="currency d-flex" @click="openModal('output')">
              <img
                :src="getImgUrl(currentOutputCurrency.image)"
                alt="us"
                width="22px"
              />

              <span class="label mx-15">{{ currentOutputCurrency.name }}</span>

              <img src="/down.png" alt="arr" width="16px" />
            </span>
          </div>
          <div class="exchange_input mt-20 d-flex-justify-end">
            <span class="label mr-10">{{ currentOutputCurrency.symbol }}</span>
            <input
              v-if="!loadingOutputValue"
              v-model="returnedAmount"
              placeholder="0.000"
              type="number"
              disabled
              class="input white"
            />

            <i v-else class="loader"></i>
          </div>
        </div>
      </div>

      <hr class="rule mt-20" />

      <div class="conve_footer mt-30 mx-30">
        <span class="d-block"
          >{{ currentInputCurrency.symbol }} /
          {{ currentOutputCurrency.symbol }}</span
        >
        <span class="d-block mt-0">{{ new Date() }}</span>

        <span class="d-block mt-20"
          >1 {{ currentInputCurrency.symbol }} =
          <span class="rate"
            >{{ toRateValue }} {{ currentOutputCurrency.symbol }}</span
          ></span
        >
      </div>
    </div>

    <CurrencySelector
      v-show="showCurrenciesModal"
      :action-type="actionType"
      @selectedEvent="currencySelected"
      @closeModal="showCurrenciesModal = false"
    />
  </div>
</template>

<script>
import currencyService from '../api/currency'

export default {
  name: 'IndexPage',
  data() {
    return {
      showCurrenciesModal: false,
      loadingOutputValue: false,
      toCurrency: 'HKD',
      amountEntered: null,
      returnedAmount: null,
      toRateValue: 0.0,
      actionType: 'input',
      currentInputCurrency: {
        symbol: 'USD',
        name: 'US Dollar',
        image: 'USD.png',
      },
      currentOutputCurrency: {
        symbol: 'HKD',
        name: 'Honk Kong Dollar',
        image: 'HKD.png',
      },
      convertForm: {
        fromCurrency: '',
        toCurrency: '',
        amount: 0,
      },
    }
  },
  methods: {
    getImgUrl(pic) {
      return require('../assets/flags/' + pic)
    },
    handleInputAmount(e) {
      this.amountEntered = e.target.innerHTML
      console.log(this.amountEntered)
    },
    openModal(type) {
      // set actionn type to know whether its an input or output
      this.actionType = type
      this.showCurrenciesModal = true
    },
    currencySelected(currentSelectedCurrency) {
      if (this.actionType === 'input') {
        this.currentInputCurrency = currentSelectedCurrency
        this.showCurrenciesModal = false
      } else if (this.actionType === 'output') {
        this.currentOutputCurrency = currentSelectedCurrency
        this.convertBaseRates()
      }
    },
    async convertBaseRates() {
      const rates = await currencyService.getBaseRates(
        this.currentInputCurrency.symbol
      )

      const results = rates.data.filter(
        (currency) => currency.symbol === this.currentOutputCurrency.symbol
      )

      this.toRateValue = results.length > 0 ? results[0].rate : 0

      this.showCurrenciesModal = false
      this.loadingOutputValue = true
      this.convertCurrency()
    },
    async convertCurrency() {
      this.convertForm.fromCurrency = this.currentInputCurrency.symbol
      this.convertForm.toCurrency = this.currentOutputCurrency.symbol
      this.convertForm.amount = this.amountEntered

      const amountConverted = await currencyService.convertCurrency(
        this.convertForm
      )

      this.returnedAmount = amountConverted.data.amount_exchanged
      this.loadingOutputValue = false
    },
  },
}
</script>

<style lang="scss" scoped>
.converter_container {
  padding: 50px 0;

  .conv_wrapper {
    margin: 0 auto;
    max-width: 400px;
    width: 95%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background: #121212;
    border-radius: 40px;
    padding: 20px 0;

    .conv_head {
      height: 50px;
      display: flex;
      align-items: center;

      .link {
        color: var(--light_grey);
        font-size: 1rem;
        margin-right: 40px;
      }
      .active {
        color: var(--primary);
        font-size: 1.2rem;
        font-weight: bold;
      }
    }

    .conv_title {
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      h1 {
        font-size: 2em;
      }

      span {
        color: var(--sec_grey);
        font-size: 1rem;
      }
    }

    .switch_wrapper {
      height: 40px;
      display: flex;
      align-items: center;

      span {
        color: var(--primary);
      }
    }
    .exchange_container {
      h3 {
        color: rgb(192, 189, 189);
      }
      p {
        color: var(--light_grey);
      }

      .exchange_input {
        align-items: flex-end;

        .label {
          color: var(--sec_grey);
          font-size: 1.3rem;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type='number'] {
          -moz-appearance: textfield;
        }
        input[disabled] {
          opacity: 1;
        }
        input {
          background: transparent;
          width: 130px;
          border: none;
          font-size: 36px;
          font-weight: bold;
          ::placeholder {
            font-size: 36px;
          }
        }
      }
    }
    .currency {
      align-items: center;
      cursor: pointer;

      .label {
        color: var(--sec_grey);
        font-size: 1.3rem;
      }
    }
    .conve_footer {
      span {
        color: rgb(192, 189, 189);
      }

      .rate {
        color: green;
      }
    }
  }
}
</style>
