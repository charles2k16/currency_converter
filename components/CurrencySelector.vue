<template>
  <div>
    <div class="dropdown">
      <span class="currency d-flex">
        <img src="../assets/data/united-states.png" alt="us" width="22px" />
        <span class="label mx-15">US Dollar</span>
        <img src="/down.png" alt="arr" width="16px" />
      </span>

      <!-- The content -->
      <!-- <div class="dropdown__content">
        <ul>
          <li>
            <img src="../assets/data/united-states.png" alt="us" width="20px" />
            USD - US Dollar
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrencySelector',
}
</script>

<style lang="scss" scoped>
.dropdown {
  .currency {
    align-items: center;

    .label {
      color: var(--sec_grey);
      font-size: 1.3rem;
    }
  }
}
</style>
