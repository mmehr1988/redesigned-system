module.exports = {
  format_date: (data) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    const localDate = new Date(data).toLocaleDateString('en-US', options);

    return localDate;
  },
  filter_data: async (data, keyName, field) => {
    const workoutData = await data.map((item) => {
      let newObjArr = new Object();
      newObjArr[keyName] = item[field];
      return newObjArr;
    });
    return workoutData;
  },
};
