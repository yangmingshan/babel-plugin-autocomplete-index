import 'module'
import './foo'
import './foo/'
import './bar.js'
import './baz'
require('module')
require('./foo')
require('./foo/')
require('./bar.js')
require('./baz')
// eslint-disable-next-line no-undef
require(path)
// eslint-disable-next-line no-undef
fn('./foo')
