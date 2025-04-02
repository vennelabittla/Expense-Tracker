// utils/currencyUtils.js
export const formatCurrency = (amount, currency = 'INR') => {
    const currencyFormats = {
      INR: {
        locale: 'en-IN',
        symbol: '₹'
      },
      USD: {
        locale: 'en-US',
        symbol: '$'
      },
      EUR: {
        locale: 'de-DE',
        symbol: '€'
      },
      GBP: {
        locale: 'en-GB',
        symbol: '£'
      }
    };
  
    const format = currencyFormats[currency] || currencyFormats.INR;
    
    return {
      formatted: `${format.symbol}${Number(amount).toLocaleString(format.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      symbol: format.symbol
    };
  };
  
  export const getStoredCurrency = () => {
    const settings = JSON.parse(localStorage.getItem('settings') || '{"currency": "INR"}');
    return settings.currency;
  };