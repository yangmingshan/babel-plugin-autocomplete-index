import 'module'
import './foo'
import './foo/'
import './bar.js'
import './baz'

export { a } from 'module'
export { b } from './foo'
export { c } from './foo/'
export { d } from './bar.js'
export { e } from './baz'

export * from 'module'
export * from './foo'
export * from './foo/'
export * from './bar.js'
export * from './baz'

import('module')
import('./foo')
import('./foo/')
import('./bar.js')
import('./baz')
import(path)

require('module')
require('./foo')
require('./foo/')
require('./bar.js')
require('./baz')
require(path)
fn('./foo')
