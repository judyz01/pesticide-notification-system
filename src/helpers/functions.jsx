export const convertMilesToMeters = (miles) => {
  return miles * 1609.34;
};

export const getOrderParams = (order) => {
  switch(order) {
    case 'Most Recent':
      return ["DESC", "time"];
    case 'Least Recent':
      return ["ASC", "time"];
    case 'Closest':
      return ["ASC", "distance"];
    case 'Furthest':
      return ["DESC", "distance"];
    default:
      return ["ASC", "distance"];
  }
};

export const getApplicatorCharacter = (str) => {
  switch(str) {
    case 'Aerial':
      return 'A';
    case 'Ground':
      return 'B';
    case 'Aerial/Ground':
      return 'C';
    default:
      return "N/A";
  }
};

// Converts military time to standard time
export const getStandardTime = (time) => {
  // Times that are listed null
  if (!time) {
    return "";
  }

  var militaryTime = time.substring(0, 5);
  var militaryHour = parseInt(militaryTime.substring(0,2));
  var standardHour = ((militaryHour + 11) % 12) + 1;
  var amPm = militaryHour > 11 ? 'PM' : 'AM';
  var minutes = militaryTime.substring(3);

  return standardHour + ":" + minutes + amPm;
};

// Reformats YYYY-MM-DD to MM/DD/YYYY
export const reformatDate = (date) => {
  // Dates that are listed null
  if (!date) {
    return "";
  }
  var yymmdd_format = date.substring(0, 10);
  var year = yymmdd_format.substring(0, 4);
  var month = parseInt(yymmdd_format.substring(5, 7));
  var day = yymmdd_format.substring(8, 10);

  return month + "/" + day + "/" + year;
};
