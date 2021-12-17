import { http } from "../utils/http";

// gen license
export const login = data => {
  let resp = {}
  if(data.username == 'admin' && data.password == 'admin') {
    resp = {code:0, data: {token: "aaabbbccc"}}
  }else {
    resp = {code:500, data:null, error: '用户名或密码不正确'}
  }
  return new Promise(function (resolve, reject) {
    resolve(resp)
  })
};
