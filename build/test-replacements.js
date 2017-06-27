module.exports.all = [
    [
        /require\(['"]string_decoder['"]\)/g
      , 'require(\'../../\')'
    ]

  , [
      /Buffer\.((?:alloc)|(?:allocUnsafe)|(?:from))/g,
      'bufferShim.$1'
    ]

  , [
      /^('use strict';)$/m,
      '$1\nconst bufferShim = require(\'safe-buffer\').Buffer;'
    ]

]

module.exports['common.js'] = [
    [
        /^                      setImmediate,$/m
      , '                      typeof setImmediate == \'undefined\' ? null : setImmediate,'
    ]

  , [
        /^                      clearImmediate,$/m
      , '                      typeof clearImmediate == \'undefined\' ? null : clearImmediate,'
    ]

  , [
        /^                      global];$/m
      , '                      global].filter(Boolean);'
    ]

  , [
        /^/
      , 'require(\'babel-polyfill\');'
    ]

  , [
        /^(  for \(var x in global\) \{|function leakedGlobals\(\) \{)$/m
      ,   '  /*<replacement>*/\n'
        + '  if (typeof constructor == \'function\')\n'
        + '    knownGlobals.push(constructor);\n'
        + '  if (typeof DTRACE_NET_SOCKET_READ == \'function\')\n'
        + '    knownGlobals.push(DTRACE_NET_SOCKET_READ);\n'
        + '  if (typeof DTRACE_NET_SOCKET_WRITE == \'function\')\n'
        + '    knownGlobals.push(DTRACE_NET_SOCKET_WRITE);\n'
        + '  if (global.__coverage__)\n'
        + '    knownGlobals.push(__coverage__);\n'
        + '\'core,__core-js_shared__,Promise,Map,Set,WeakMap,WeakSet,Reflect,System,asap,Observable,regeneratorRuntime,_babelPolyfill\'.split(\',\').filter(function (item) {  return typeof global[item] !== undefined}).forEach(function (item) {knownGlobals.push(global[item])})'
        + '  /*</replacement>*/\n\n$1'
    ]
]

module.exports['test-string-decoder.js'] = [
    // test removed because it is V8-version dependant.
    [
        /test\('utf-8', bufferShim\.from\('EDA0B5EDB08D'.*\n.*\n/
      , ''
    ],
  , [
        /test\('utf-8', bufferShim\.from\('F0B841', 'hex'.*\n/
      , ''
    ]
  , [
        /test\('utf-8', bufferShim\.from\('CCE2B8B8', 'hex'.*\n/
      , ''
    ]
  , [
        /test\('utf-8', bufferShim\.from\('E2B8CCB8', 'hex'.*\n/
      , ''
    ]
  , [
        /assert\.strictEqual\(decoder\.end(), '\ufffd'\);\n/
      , ''
    ]
]
