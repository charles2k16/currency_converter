export default {
  name: 'currencyService',

  async getCurrencies() {
    const currencies = await this.getCurrencyFromApi()

    const usefulCurrencies = ['EUR', 'USD', 'GBP', 'GHS', 'NGN', 'HKD']

    const newCurrencies = []

    // iterate over currencies from api
    usefulCurrencies.forEach((curr, index) => {
      // push the object keys and values to the new array
      newCurrencies.push({
        name: currencies.symbols[curr],
        symbol: `${curr}`,
        image: `${curr}.png`,
      })
    })

    return {
      data: newCurrencies,
    }
  },

  getCurrencyFromApi() {
    const exchageUrl =
      'http://data.fixer.io/api/symbols?access_key=2f8c274294f5d305ee13472e77ada8a0'

    return fetch(exchageUrl)
      .then((res) => res.json())
      .then((json) => Promise.resolve(json))
      .catch((error) => Promise.reject(error))
  },

  async getBaseRates(currencySymbol) {
    const baseRates = await this.getRatesFromApi(currencySymbol)

    const usefulCurrencies = ['EUR', 'USD', 'GBP', 'GHS', 'NGN', 'HKD']

    const newRates = []

    // iterate over currencies from api
    usefulCurrencies.forEach((curr, index) => {
      // push the object keys and values to the new array
      newRates.push({ symbol: `${curr}`, rate: baseRates.data[curr] })
    })

    return {
      data: newRates,
    }
  },

  getRatesFromApi(currency) {
    const ratesUrl = `https://freecurrencyapi.net/api/v2/latest?apikey=e34bfb20-518a-11ec-8dad-490658567370&base_currency=${currency}`

    return fetch(ratesUrl)
      .then((res) => res.json())
      .then((json) => Promise.resolve(json))
      .catch((error) => Promise.reject(error))
  },
}
