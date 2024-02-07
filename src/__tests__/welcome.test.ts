// npx jest src/__tests__/welcome.test.ts

import { getWelcomeMessage } from './welcome.js'
import {describe, expect, test} from '@jest/globals'

test('should show welcome message', () => {
  expect(getWelcomeMessage()).toMatchInlineSnapshot(`"Welcome to ts-jest!!!"`)
})

