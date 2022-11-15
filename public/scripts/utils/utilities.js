export const formatDate = date => {
  const dateToFormat = new Date(date);
  const dateString = dateToFormat.toLocaleDateString();
  const timeString = dateToFormat.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${dateString} ${timeString}`;
};

export const formDataToJson = formData => {
  return formData.reduce((prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
};
