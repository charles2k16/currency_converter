<template>
  <div class="converter_container d-flex-justify-center">
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
            <CurrencySelector />
          </div>
          <div class="exchange_input mt-20 d-flex-justify-end">
            <span class="label mr-10">USD</span>
            <span
              class="input white"
              role="textbox"
              contenteditable
              @input="handleInputAmount"
              >{{ amountEntered }}</span
            >
          </div>
        </div>
      </div>

      <!-- Output Currency -->

      <div class="mt-30 mx-30 exchange_container">
        <h3>CURRENCY I WANT</h3>
        <p class="mt-0">Expected amount after exchange</p>

        <hr class="rule mt-20" />

        <div class="mt-20">
          <div class="d-flex-justify-end">
            <CurrencySelector />
          </div>
          <div class="exchange_input mt-20 d-flex-justify-end">
            <span class="label mr-10">USD</span>
            <span class="input white" role="textbox" :contenteditable="false">{{
              returnedAmount
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      fromCurrency: '',
      toCurrency: '',
      amountEntered: null,
      returnedAmount: null,
    }
  },
  methods: {
    handleInputAmount(e) {
      this.amountEntered = e.target.innerHTML

      console.log(this.amountEntered)
    },
  },
}
</script>

<style lang="scss" scoped>
.converter_container {
  padding: 50px 5px;

  .conv_wrapper {
    margin: 0 auto;
    max-width: 400px;
    width: 100%;

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
        font-size: 2rem;
      }

      span {
        color: var(--sec_grey);
        font-size: 1rem;
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

        .input {
          background: transparent;
          height: 40px;
          max-width: 300px;
          display: flex;
          align-items: center;
          font-size: 36px;
          font-weight: bold;
        }

        .input[contenteditable]:empty::before {
          content: '0.00';
          color: gray;
        }

        // output currency

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
  }
}
</style>
