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
};
