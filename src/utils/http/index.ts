import EnclosureHttp from "./core";
import router from '@/router/index.js'
import {SessionStorage} from '@/store/localstorage'

EnclosureHttp.initConfig = {
  beforeResponseCallback: (resp) => {
    if(resp.data.code == 403) {
      SessionStorage.remove('info')
      router.replace('/login')
    }
    return resp
  },
}


export const http = new EnclosureHttp();
