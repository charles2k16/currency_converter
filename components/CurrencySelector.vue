<template>
  <div>
    <div class="dropdown">
      <span class="currency d-flex">
        <img src="../assets/data/united-states.png" alt="us" width="22px" />
        <span class="label mx-15">US Dollar</span>
        <img src="/down.png" alt="arr" width="20px" />
      </span>

      <!-- The content -->
      <div class="dropdown__content">
        <ul>
          <li>
            <img src="../assets/data/united-states.png" alt="us" width="20px" />
            USD - US Dollar
          </li>
        </ul>
      </div>
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
  position: relative;

  .currency {
    align-items: center;

    .label {
      color: var(--sec_grey);
      font-size: 1.3rem;
    }
  }
  .dropdown__content {
    display: none;
    left: 0;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    background-color: #fff;
    z-index: 9999;
    height: 200px;
    width: 200px;
  }
}

.dropdown:hover .dropdown__content {
  display: block;
}
</style>
