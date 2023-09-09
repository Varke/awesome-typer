export const GetText = async () => {
   // russian - https://fish-text.ru/get?format=html&number=3
   // english - https://hipsum.co/api/?type=hipster-centric&sentences=3
   try {
      const response = await fetch(
         'https://hipsum.co/api/?type=hipster-centric&sentences=3'
      );
      const data = await response.json();
      let result = '';
      if (data) result = data[0];
      return result;
   } catch (error) {
      console.error(error);
      return '';
   }
};
