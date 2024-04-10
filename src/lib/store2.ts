/* eslint-disable @typescript-eslint/no-explicit-any */
import { StorageKey } from '@/types/global'
import store from 'store2'

const prefix = import.meta.env.VITE_STORE_PREFIX;

export const storeSet = (key: StorageKey, value: any) => store.set(`${prefix}_${key}`, value)

export const storeGet = (key: StorageKey, alt?: any) => store.get(`${prefix}_${key}`, alt)

export const storeRemove = (key: StorageKey) => store.remove(`${prefix}_${key}`)