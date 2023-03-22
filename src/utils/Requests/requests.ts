import axios from 'axios'

export const getCountries = async () => {
    const options = {
        method: 'GET',
        url: 'https://restcountries.com/v2/all?fields=name,region,area'
    }

    try {
        const { data } = await axios(options)
        return data
    } catch (e) {
        throw e
    }
}