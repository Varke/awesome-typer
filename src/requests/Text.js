export const GetText = async () => {
   try {
      const response = await fetch(
         'https://hipsum.co/api/?type=hipster-centric&sentences=1'
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
