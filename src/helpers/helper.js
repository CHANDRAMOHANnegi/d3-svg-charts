import moment from "moment";
import * as d3Array from "d3-array";

export const generateBarPath = (xd, yd, bw, bh, v, rd) => {
  let pathValue;
  if (v !== 0 && bh <= 5) {
    bh = 5;
    rd = 0;
  }
  if (v === 0 || v === null || v === undefined) {
    h = 1;
    yd += bh - h;
    bh = h;
    rd = 0;
  }
  pathValue = 'M' + (xd + rd) + ',' + yd;
  pathValue += 'h' + (bw - 2 * rd);
  pathValue += 'a' + rd + ',' + rd + ' 0 0 1 ' + rd + ',' + rd;
  pathValue += 'v' + (bh - 2 * rd);
  pathValue += 'v' + rd;
  pathValue += 'h' + -rd;
  pathValue += 'h' + (2 * rd - bw);
  pathValue += 'h' + -rd;
  pathValue += 'v' + -rd;
  pathValue += 'v' + (2 * rd - bh);
  pathValue += 'a' + rd + ',' + rd + ' 0 0 1 ' + rd + ',' + -rd;
  pathValue += 'z';

  return pathValue;
}


export function getStartTime(counter = 0, type = "week", format = "x") {
  return moment().utc().subtract(counter, type).startOf(type).format(format);
}

export function getEndTime(counter = 0, type = "week", format = "x") {
  if (counter === 0) {
    return moment().utc().subtract(counter, type).format(format);
  } else {
    return moment()
      .utc()
      .subtract(counter, type)
      .endOf(type)
      .add(1, type)
      .startOf(type)
      .format(format);
  }
}

export function getDiffPercentage(a, b, c = 0, dividedByOriginal = false) {
  let diff = 0;
  if (a !== undefined && b !== undefined) {
    if (a > 0 && b > 0) {
      if (dividedByOriginal) diff = (((a - b) * 100) / a).toFixed(c);
      else diff = (((a - b) * 100) / b).toFixed(c);
    } else if (a === 0 || b === 0) {
      diff = a === 0 ? -100 : 100;
    }
  }

  return diff;
}

export function getPercentage(a, b, c) {
  let dcm = c || 1;

  if (a !== undefined && b !== undefined) {
    if (b === 0 || a === 0) {
      return 0;
    } else {
      return ((a * 100) / b).toFixed(dcm);
    }
  }
}

export function reverseArr(arr) {
  let _arr = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    _arr.push(arr[i]);
  }
  return _arr;
}

export function convertSize(isBytes, bytes, space, dcml) {
  if (bytes == 0) return "0";
  if (bytes < 1 && bytes > 0) return "" + bytes;
  var k = isBytes ? 1024 : 1000,
    dm = dcml || 0,
    sizes = isBytes
      ? ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["", "K", "M", "B", "T", "P", "E", "Z", "E"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  if (space)
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  else return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}
// this function is only used to calculate percentage difference
// to overcome the issues with different units (MB vs GB, etc),
// we will round the result and then convert it back using the same coefficient
export const convertSizeWithNoUnits = (isBytes, value, dcml = 0) => {
  if (value == 0) return "0";
  if (value < 1 && value > 0) return "" + value;
  const k = isBytes ? 1024 : 1000;
  const i = Math.floor(Math.log(value) / Math.log(k));
  const highNumber = parseFloat((value / Math.pow(k, i)).toFixed(dcml));
  return highNumber * Math.pow(k, i);
};

export function bytesToSize(bytes, space, dcml) {
  return convertSize(true, bytes, space, dcml);
}

export function convertNumber(bytes, space, dcml) {
  return convertSize(false, bytes, space, dcml);
}

// export async function request(context, url, method, payload, isCustom) {
//   let data = {};
//   try {
//     let { ZS_SESSION_CODE, JSESSIONID, cloud } = await getCookie();
//     let token, ssoLogout;

//     if (FeatureFlags.ssoLogin) {
//       cloud = context.props.cloud;
//       token = context.props.token;
//       ssoLogout = context.props.ssoLogoutRequest;
//     }

//     const reqMethod = method || "POST";
//     const cookie = `JSESSIONID=${JSESSIONID}; ZS_SESSION_CODE=${ZS_SESSION_CODE}`;
//     const requestUrl = !!isCustom
//       ? url
//       : `https://admin.${cloud}.net/zsapi/` + url;

//     const getHeaders = {
//       "Content-Type": "application/json",
//       cookie: cookie,
//       ZS_CUSTOM_CODE: ZS_SESSION_CODE,
//       "X-Requested-With": "XMLHttpRequest"
//     };
//     const postHeaders = {
//       "Content-Type": "application/json",
//       cookie: cookie,
//       Connection: "keep-alive",
//       ZS_CUSTOM_CODE: ZS_SESSION_CODE,
//       "Content-Length": 108,
//       Pragma: "no-cache",
//       "Cache-Control": "no-cache",
//       "X-Requested-With": "XMLHttpRequest",
//       Origin: `https://admin.${cloud}.net`,
//       "Accept-Encoding": "gzip, deflate, br",
//       "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8"
//     };

//     if (FeatureFlags.ssoLogin) {
//       getHeaders.cookie = "ZS_SESSION_CODE=cookie";
//       getHeaders["ZS_CUSTOM_CODE"] = "cookie";
//       getHeaders["Authorization"] = "Bearer " + token;

//       postHeaders.cookie = "ZS_SESSION_CODE=cookie";
//       postHeaders["ZS_CUSTOM_CODE"] = "cookie";
//       postHeaders["Authorization"] = "Bearer " + token;
//     }

//     const reqOptions = {
//       method: reqMethod,
//       headers: reqMethod === "POST" ? postHeaders : getHeaders
//     };

//     if (reqMethod === "POST") reqOptions.body = JSON.stringify(payload);

//     let response = await fetch(requestUrl, reqOptions).catch(error => {
//       throw error;
//     });

//     if (!!response.status && response.status === 200) {
//       let json = await response.json();
//       data = {
//         status: "success",
//         data: json
//       };
//     } else if (!!response.status && response.status === 401) {
//       Toast.show({
//         text: "Your Current Session has Expired. \n Signing Out…",
//         textStyle: {
//           textAlign: "center"
//         },
//         type: "danger"
//       });

//       const delay = ms => new Promise(res => setTimeout(res, ms));
//       await delay(2500);
//       await logout();
//       if (FeatureFlags.ssoLogin) {
//         ssoLogout(context.props.email, context.props.token, "");
//       } else {
//         context.navigate("Login");
//       }
//     } else {
//       data = {
//         status: "error",
//         response: response
//       };
//     }
//   } catch (e) {
//     data = {
//       status: "error",
//       response: e
//     };
//     LS.log(`error: `, e);
//   }
//   return data;
// }

export function getRangePayload(load, range) {
  let Payload,
    daysCount,
    daysInterval,
    startTime,
    endTime,
    pastEndTime,
    pastStartTime;
  switch (range) {
    case "LAST_WEEK":
      daysCount = 7;
      startTime = getStartTime(1, "week");
      endTime = getEndTime(1, "week");
      pastStartTime = getStartTime(2, "week");
      pastEndTime = getEndTime(2, "week");
      Payload = [];
      for (let i = 0; i < daysCount; i++) {
        let start = moment()
          .utc()
          .startOf("week")
          .subtract(1, "week")
          .add(i, "days"),
          end = moment()
            .utc()
            .startOf("week")
            .subtract(1, "week")
            .add(i + 1, "days")
            .startOf("day"),
          _load = {
            ...load,
            startTime: start.format("x"),
            endTime: end.format("x"),
          };
        Payload.push(_load);
      }
      break;
    case "THIS_WEEK":
      daysCount = moment().utc().weekday();
      Payload = [];
      startTime = getStartTime(0, "week");
      endTime = getEndTime(1, "hour");
      pastStartTime = getStartTime(1, "week");
      pastEndTime = getEndTime(1, "week");
      if (daysCount === 0) {
        Payload.push({
          ...load,
          startTime: moment().utc().startOf("week").format("x"),
          endTime: moment().utc().startOf("hour").format("x"),
        });
      } else {
        for (let i = 0; i < daysCount; i++) {
          let is_today = i == daysCount - 1;
          let start = moment().utc().startOf("week").add(i, "days");
          let end = moment().utc();
          if (is_today) {
            end = end.startOf("hour");
          } else {
            end = end
              .startOf("week")
              .add(i + 1, "days")
              .startOf("day");
          }
          let _load = {
            ...load,
            startTime: start.format("x"),
            endTime: end.format("x"),
          };
          Payload.push(_load);
        }
      }
      break;

    case "THIRTY_DAYS":
      daysCount = 31;
      daysInterval = 6;
      Payload = [];
      startTime = getStartTime(daysCount, "days");
      endTime = getEndTime(1, "days");
      for (var i = 1; i <= 5; i++) {
        let startCount = i === 1 ? 1 : (i - 1) * daysInterval + 1,
          endCount = i * daysInterval,
          start = moment().utc().subtract(endCount, "days").startOf("day"),
          end = moment()
            .utc()
            .subtract(startCount, "days")
            .add(1, "days")
            .startOf("day"),
          _load = {
            ...load,
            startTime: start.format("x"),
            endTime: end.format("x"),
          };
        Payload.push(_load);
      }
      Payload = reverseArr(Payload);
      break;
    case "NINTY_DAYS":
      daysCount = 91;
      daysInterval = 18;
      Payload = [];
      startTime = getStartTime(daysCount, "days");
      endTime = getEndTime(1, "days");
      for (var i = 1; i <= 5; i++) {
        let startCount = i === 1 ? 1 : (i - 1) * daysInterval + 1,
          endCount = i * daysInterval,
          start = moment().utc().subtract(endCount, "days").startOf("day"),
          end = moment()
            .utc()
            .subtract(startCount, "days")
            .add(1, "days")
            .startOf("day"),
          _load = {
            ...load,
            startTime: start.format("x"),
            endTime: end.format("x"),
          };
        Payload.push(_load);
      }
      Payload = reverseArr(Payload);
      break;
  }

  return {
    Payload,
    startTime,
    endTime,
    pastEndTime,
    pastStartTime,
  };
}

export function getThreatsAxis(data, dataKey, formatter) {
  let multiplesYDomain,
    domainMaxValue,
    arr = [],
    count = 5,
    k = 10,
    dcm = 0,
    key = dataKey || "TOTAL",
    formatAxis = formatter || convertNumber,
    max = Math.max.apply(
      Math,
      data.map(function (o) {
        return o[key];
      })
    ),
    i = Math.floor(Math.log(max) / Math.log(k));
  if (!!max) {
    max = Math.ceil(max / Math.pow(k, i));
    max += max % 2;
    max = max * Math.pow(k, i);

    multiplesYDomain = Math.pow(10, max.toString().length - 1);
    domainMaxValue = Math.ceil(max / multiplesYDomain) * multiplesYDomain;
  } else {
    domainMaxValue = 10;
  }

  arr = d3Array.ticks(0, domainMaxValue, count);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = formatAxis(arr[i], "", 1);
  }
  return {
    axisArr: reverseArr(arr),
    maxValue: domainMaxValue,
  };
}

export function getChartWidth(data, w) {
  let cw = 0;
  data.map((y, i) => {
    let yW = y.length * w;
    cw = yW > cw ? yW : cw;
  });

  return cw;
}

export function formatPercentage(data, space) {
  if (isNaN(data)) {
    data = 0;
  }
  let d = Math.abs(data),
    s = space === undefined ? " " : space,
    v = "";
  if (d === 0 || d === null) {
    v = "0";
  } else if (d < 0.01) {
    v = "< 0.01";
  } else {
    v = convertSize(false, d, false, 2)
  }
  v += "%" + s;
  return v;
}
