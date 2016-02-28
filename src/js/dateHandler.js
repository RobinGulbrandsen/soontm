const dateHandler = function () {

  const setDateInputAsNow = () => {
    const now = new Date();
    const currentDate = now.toISOString().slice(0,10);

    document.getElementById("day").value = currentDate;
    document.getElementById("hours").value = now.getHours();
    document.getElementById("minutes").value = now.getMinutes();
    document.getElementById("seconds").value = now.getSeconds();
  };

  const convertToDateAsMiliseconds = (day, hour, min, sec) => {
    const dayList = day.split("-");
    return new Date(dayList[0], dayList[1] - 1, dayList[2], hour, min, sec).getTime();
  };

  return { setDateInputAsNow, convertToDateAsMiliseconds };
};

export default dateHandler;
