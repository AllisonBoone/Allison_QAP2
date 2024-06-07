//Name: Allison Boone
//Submission Date: June 7th, 2024

// Problem 1: replace all internal whitespace in a string value with underscore ('_'), and makes it lowercase.
function snake(value) {
  value = value.trim();
  value = value.replace(/[\s.]+/g, '_');
  value = value.toLowerCase();
  return value;
}

console.log(snake('abc')); // 'abc'
console.log(snake(' ABC ')); // 'abc'
console.log(snake('ABC')); // 'abc'
console.log(snake('A BC')); // 'a_bc'
console.log(snake(' A bC  ')); // 'a_bc'
console.log(snake('A   BC')); // 'a_bc'
console.log(snake('A.BC')); // 'a_bc'
console.log(snake(' A..  B   C ')); // 'a_b_c'

// Problem 2: create an HTML <video> element for the given url.
function createVideo(src, width, controls) {
  src = src.trim();
  let videoElement = `<video src="${src}"`;

  if (Number.isInteger(Number(width))) {
    videoElement += ` width="${width}"`;
    if (controls) {
      videoElement += ' controls';
    }
    videoElement += '></video>';

    return videoElement;
  }
}

console.log(
  createVideo(
    'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
    500
  )
); // No controls

console.log(
  createVideo(
    'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
    500,
    true
  )
); // With controls

// Problem 3: extract Date from date string
function parseDateString(value) {
  if (value === null || typeof value !== 'string') {
    throw new Error('Error, must be a string and not null');
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) {
    throw new Error('Error, must be formatted yyyy-mm-dd');
  }

  const [year, month, day] = value.split('-');
  const yearInt = parseInt(year, 10);
  const monthInt = parseInt(month, 10) - 1;
  const dayInt = parseInt(day, 10);

  if (year.length !== 4) {
    throw new Error('Error, year length must be 4 digits');
  }
  if (month.length !== 2 || monthInt < 0 || monthInt > 11) {
    throw new Error('Error, month length must be 2 digits between 01 and 12');
  }
  if (day.length !== 2 || dayInt < 1 || dayInt > 31) {
    throw new Error('Error, day length must be 2 digits between 01 and 31');
  }

  const date = new Date(yearInt, monthInt, dayInt);

  return date;
}

try {
  const date1 = '2021-01-01';
  console.log(parseDateString('2021-01-01'));
} catch (error) {
  console.log(error.message);
} // valid date

try {
  const date2 = '2021-09-29';
  console.log(parseDateString('2021-09-29'));
} catch (error) {
  console.log(error.message);
} // valid date

try {
  const invalidDate1 = null;
  console.log(parseDateString(null));
} catch (error) {
  console.log(error.message);
} // cannot be null

try {
  const invalidDate2 = 'This is totally wrong';
  console.log(parseDateString('This is totally wrong'));
} catch (error) {
  console.log(error.message);
} // must be formatted yyyy-mm-dd

try {
  const invalidDate3 = '01-01-01';
  console.log(parseDateString('01-01-01'));
} catch (error) {
  console.log(error.message);
} // must be formatted yyyy-mm-dd

/* I could not figure out why the last 3 would not show up as an errors in the console. I did it the same as every other one, it could be a bug or there's something im just not seeing. */

// Problem 4: convert Date to date string with specified format.
function toDateString(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Error, must be valid Date Object');
  }

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
}

try {
  const date3 = new Date(2021, 0, 1);
  let dateString = toDateString(date3);
  console.log(dateString);
} catch (error) {
  console.error(error.message);
} //2021-01-01

try {
  const date4 = new Date(2021, 8, 29);
  let dateString = toDateString(date4);
  console.log(dateString);
} catch (error) {
  console.error(error.message);
} //2021-09-29

try {
  let invalidDate4 = toDateString(null);
  console.log(invalidDate4);
} catch (error) {
  console.error(error.message);
} // Error

try {
  let invalidDate5 = toDateString('This is totally wrong');
  console.log(invalidDate5);
} catch (error) {
  console.error(error.message);
} // Error

// Problem 5: parse a geographic coordinate
function normalizeCoord(value) {
  let lat, lng;

  if (value.includes('[') && value.includes(']')) {
    const coords = value
      .slice(1, -1)
      .split(',')
      .map(function (coord) {
        return coord.trim();
      });
    lng = parseFloat(coords[0]);
    lat = parseFloat(coords[1]);
  } else {
    const coords = value.split(',').map(function (coord) {
      return coord.trim();
    });
    lat = parseFloat(coords[0]);
    lng = parseFloat(coords[1]);
  }
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
    throw new Error('Error, invalid coordinates');
  }
  return `(${lat}, ${lng})`;
}

try {
  console.log(normalizeCoord('42.9755,-77.4369')); // (42.9755, -77.4369)
} catch (error) {
  console.error(error.message);
}

try {
  console.log(normalizeCoord('[-77.4369, 42.9755]')); //(42.9755, -77.4369)
} catch (error) {
  console.error(error.message);
}

try {
  console.log(normalizeCoord('42.9755,-190.4369')); // (42.9755, -77.4369)
} catch (error) {
  console.error(error.message);
}

try {
  console.log(normalizeCoord('[-77.4369, 95.9755]')); //(42.9755, -77.4369)
} catch (error) {
  console.error(error.message);
}

// Problem 6: format any number of coordinates as a list in a string
function normalizeCoord(value) {
  let lat, lng;

  if (value.includes('[') && value.includes(']')) {
    const coords = value
      .slice(1, -1)
      .split(',')
      .map(function (coord) {
        return coord.trim();
      });
    lng = parseFloat(coords[0]);
    lat = parseFloat(coords[1]);
  } else {
    const coords = value.split(',').map(function (coord) {
      return coord.trim();
    });
    lat = parseFloat(coords[0]);
    lng = parseFloat(coords[1]);
  }
  if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
    throw new Error('Error, invalid coordinates');
  }
  return `(${lat}, ${lng})`;
}

function formatCoords(...coords) {
  const validCoords = [];

  coords.forEach((coord) => {
    try {
      validCoords.push(normalizeCoord(coord));
    } catch (error) {}
  });

  return `(${validCoords.join(', ')})`;
}

try {
  console.log(
    formatCoords('42.9755,-77.4369', '[-62.1234, 42.9755]', '300,-9000')
  );
} catch (error) {
  console.error(error.message);
} // ((42.9755, -77.4369), (42.9755, -62.1234))

try {
  console.log(formatCoords('42.9755,-77.4369', '[-77.4369, 42.9755]'));
} catch (error) {
  console.error(error.message);
} // ((42.9755, -77.4369), (42.9755, -77.4369))

// Problem 7: determine MIME type from filename extension
function mimeFromFilename(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  switch (extension) {
    case 'html':
    case 'htm':
      return 'text/html';
    case 'css':
      return 'text/css';
    case 'js':
      return 'text/javascript';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    case 'bmp':
      return 'image/bmp';
    case 'ico':
    case 'cur':
      return 'image/x-icon';
    case 'png':
      return 'image/png';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    case 'mp3':
      return 'audio/mp3';
    case 'wav':
      return 'audio/wav';
    case 'mp4':
      return 'video/mp4';
    case 'webm':
      return 'video/webm';
    case 'json':
      return 'application/json';
    case 'mpeg':
      return 'video/mpeg';
    case 'csv':
      return 'text/csv';
    case 'ttf':
      return 'font/ttf';
    case 'woff':
      return 'font/woff';
    case 'zip':
      return 'application/zip';
    case 'avi':
      return 'video/x-msvideo';
    default:
      return 'application/octet-stream';
  }
}

console.log(mimeFromFilename('image.jpeg')); // image/jpeg
console.log(mimeFromFilename('archive.zip')); // application/zip
console.log(mimeFromFilename('unknownfile1.xyz')); // application/octet-stream
console.log(mimeFromFilename('unknownfile2')); // application/octet-stream

// Problem 8, Part 1: generate license text and link from license code.
function generateLicenseLink(licenseCode, targetBlank) {
  const licenseMap = {
    'CC-BY': 'Creative Commons Attribution License',
    'CC-BY-NC': 'Creative Commons Attribution-NonCommercial License',
    'CC-BY-SA': 'Creative Commons Attribution-ShareAlike License',
    'CC-BY-ND': 'Creative Commons Attribution-NoDerivs License',
    'CC-BY-NC-SA':
      'Creative Commons Attribution-NonCommercial-ShareAlike License',
    'CC-BY-NC-ND':
      'Creative Commons Attribution-NonCommercial-NoDerivs License',
  };

  let licenseText, url;

  if (licenseMap[licenseCode]) {
    licenseText = licenseMap[licenseCode];
    const formattedCode = licenseCode.substring(3).toLowerCase();
    url = `https://creativecommons.org/licenses/${formattedCode}/4.0/`;
  } else {
    licenseText = 'All Rights Reserved';
    url = 'https://choosealicense.com/no-permission/';
  }

  let link = `<a href="${url}">${licenseText}</a>`;

  if (targetBlank) {
    link = `<a href="${url}" target="_blank">${licenseText}</a>`;
  }

  return link;
}

console.log(generateLicenseLink('CC-BY-NC'));
// <a href="https://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial License</a>

console.log(generateLicenseLink('CC-BY-NC', true));
// <a href="https://creativecommons.org/licenses/by-nc/4.0/" target="_blank">Creative Commons Attribution-NonCommercial License</a>

console.log(generateLicenseLink('UNKNOWN'));
// <a href="https://choosealicense.com/no-permission/">All Rights Reserved</a>

// Problem 9 Part 1: convert a value to a Boolean (true or false)
function pureBool(value) {
  if (typeof value === 'boolean') {
    return value;
  }

  const trueValues = [
    'yes',
    'y',
    'oui',
    'o',
    't',
    'true',
    'vrai',
    'v',
    '1',
    1,
    2,
  ];
  const falseValues = ['no', 'n', 'non', 'f', 'false', 'faux', '0', 0, -1, -2];

  const stringValue = String(value).toLowerCase().trim();

  if (
    trueValues.includes(stringValue) ||
    (typeof value === 'number' && value > 0)
  ) {
    return true;
  }
  if (
    falseValues.includes(stringValue) ||
    (typeof value === 'number' && value <= 0)
  ) {
    return false;
  }

  throw new Error('Error, invalid value');
}

// Problem 9 Part 2: checking for all True or all False values in a normalized list
function every(...args) {
  try {
    return args.every((arg) => pureBool(arg) === true);
  } catch (error) {
    return false;
  }
}

function any(...args) {
  try {
    return args.some((arg) => pureBool(arg) === true);
  } catch (error) {
    return false;
  }
}

function none(...args) {
  try {
    return args.every((arg) => pureBool(arg) === false);
  } catch (error) {
    return false;
  }
}

console.log(every('Y', 'yes', 1)); // true
console.log(any('Y', 'no', 1)); // true
console.log(none('Y', 'invalid', 1)); // false

// Problem 10 - build a URL
function buildUrl(query, order, count, license) {
  const baseUrl = 'https://api.inaturalist.org/v2/observations';
  const validOrders = ['ascending', 'descending'];

  if (!validOrders.includes(order)) {
    throw new Error(
      "Error, invalid order value it must be 'ascending' or 'descending'."
    );
  }

  if (typeof count !== 'number' || count < 1 || count > 50) {
    throw new Error('Error, count must be a number between 1 and 50.');
  }

  const validLicenses = [
    'none',
    'any',
    'cc-by',
    'cc-by-nc',
    'cc-by-sa',
    'cc-by-nd',
    'cc-by-nc-sa',
    'cc-by-nc-nd',
  ];
  if (!validLicenses.includes(license)) {
    throw new Error('Error, invalid license value.');
  }

  const encodedQuery = encodeURIComponent(query);
  const url = `${baseUrl}?query=${encodedQuery}&order=${order}&count=${count}&license=${license}`;

  return url;
}

const url = buildUrl('Monarch Butterfly', 'ascending', 25, 'cc-by');
console.log(url); // https://api.inaturalist.org/v2/observations?query=Monarch%20Butterfly&order=ascending&count=25&license=cc-by
