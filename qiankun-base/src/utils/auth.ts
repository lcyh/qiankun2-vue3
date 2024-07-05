/*
 * @Author: changluo
 * @Description:
 * @LastEditors: luc19964 luochang@gopherasset.com
 */
import cookie from "js-cookie";

export function setCookie(name, value) {
  cookie.set(name, value);
}
export function getCookie(name) {
  return cookie.get(name);
}
export function removeCookie(name) {
  cookie.remove(name);
}
/**
 *
 * @param name
 * @param value
 */
export function setToken(name, value) {
  cookie.set(name, value);
}

/**
 *
 * @param name
 */
export function getToken(name) {
  return cookie.get(name);
}

/**
 *
 * @param name
 */
export function removeToken(name) {
  cookie.remove(name);
}
