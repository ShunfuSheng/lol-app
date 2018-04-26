export { NavigationActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export const sleep = n => {
    var start = new Date().getTime();
    while (true) if (new Date().getTime() - start > n) break;
}
