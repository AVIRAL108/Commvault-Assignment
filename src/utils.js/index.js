import _ from "lodash";

export const setConfig = () => {
  let params = window.location.search;
  params = params.slice(1);
  let obj = new URLSearchParams(params);
  let values = {
    token: obj.get("token"),
    uid: obj.get("uid"),
  };
  return sessionStorage.setItem("config", JSON.stringify(values));
};

export const getConfig = (name) => {
  const values = JSON.parse(sessionStorage.getItem(name));
  return values;
};

export const serialize = (obj) => {
  const pureObj = _.omitBy(
    obj,
    (v) => _.isUndefined(v) || _.isNull(v) || v === ""
  );
  var str = [];
  for (var p in pureObj)
    if (pureObj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(pureObj[p]));
    }
  return str.join("&");
};

export const getResetValue = (arr) => {
  var obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i].name] = arr[i].defaultValue;
  }
  return obj;
};

export const convertIntObj = (obj, formfeilds, boolean) => {
  const res = {};
  const map = _.mapKeys(_.flattenDeep(formfeilds), "name");
  for (const key in obj) {
    const parsed = parseInt(obj[key], 10);
    res[key] =
      map[key].typeCast !== "string"
        ? isNaN(parsed)
          ? obj[key]
          : parsed
        : boolean
        ? obj[key].toString()
        : obj[key];
  }
  return res;
};
