// Use: r.js -o build_amdclean.js
({
    baseUrl: './lib',
    include: ['rpn/eval', 'rpn/from_infix'],
    out: 'dist/rpn_utils.min.js',
    onModuleBundleComplete: function (data) {
        var fs = module.require('fs'),
                amdclean = module.require('amdclean'),
                outputFile = data.path,
                cleanedCode = amdclean.clean({
                    'filePath': outputFile,
                    'globalModules': ['rpn_eval', 'rpn_from_infix']
                });

        fs.writeFileSync(outputFile, cleanedCode);
    }
});