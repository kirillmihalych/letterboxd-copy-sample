import type { IList } from '@/interfaces/lists-types'
import type { InjectionKey } from 'vue'

export const listKey = Symbol() as InjectionKey<IList | null>
