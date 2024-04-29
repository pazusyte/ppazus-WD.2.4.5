import { generateOptions } from '@/components/dates/dateHelpers'
import { describe, it, expect } from 'vitest'

describe('generateOptions', () => {
  it('generates correct array', () => {
    expect(generateOptions(1, 3)).toEqual([1, 2, 3])
  })
})
