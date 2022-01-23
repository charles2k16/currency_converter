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

      <div class="mt-20 mx-30 exchange_container">
        <h3>CURRENCY I HAVE</h3>
        <p class="mt-0">I have this much to exchange</p>

        <hr class="rule mt-20" />

        <div class="exchange_selector mt-20 d-flex-justify-end">
          <div>
            <CurrencySelector />
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
    return {}
  },
}
</script>

<style lang="scss" scoped>
.converter_container {
  height: 100vh;
  width: 100vw;
  padding: 50px 0;

  .conv_wrapper {
    max-width: 450px;
    width: 100%;
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
    }
  }
}
</style>
