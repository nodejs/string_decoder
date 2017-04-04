module.exports.all = [
    [
        /require\(['"]string_decoder['"]\)/g
      , 'require(\'../../\')'
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
