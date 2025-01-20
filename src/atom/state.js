import  { atom } from "recoil";

export const refreshState = atom({
    key: 'refreshState', 
    default: false, 
  });

export const authState = atom({
    key:'authState',
    default:false
})

export const userState = atom ({
    key:'userData',
    default:null
})