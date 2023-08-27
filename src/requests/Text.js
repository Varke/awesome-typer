export const GetText = async () => {
   try {
      const response = await fetch('https://dummyjson.com/quotes');
      const data = await response.json();
      let result = '';
      if (data) result = data.quotes[Math.floor(Math.random() * 31)]['quote'];
      return result;
   } catch (error) {
      console.error(error);
      return '';
   }
};
