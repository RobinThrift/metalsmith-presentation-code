var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    templates   = require('metalsmith-templates');

var autoTemplate = function(opts) {
    var pattern = new RegExp(config.pattern);

    return function(files, metalsmith, done) {
        for (var file in files) {
            if (pattern.test(file)) {
                var _f = files[file];
                if (!_f.template) {
                    _f.template = config.templateName;
                }
            }
        }
        done();
    };
};


Metalsmith(__dirname)
    .use(collections({
        blog: {
            pattern: '*/posts/*',
            oderBy: 'date',
            revers: true
        },
        pages: {
            pattern: '*/pages/*'
        }
    }))
    .use(function(files, metalsmith, done) {
        done();
        // console.log(metalsmith.metadata());
        // done();
    })
    .use(markdown())
    .use(permalinks({
        pattern: ':collection/:title',
        relative: true
    }))
    .use(templates('handlebars'))
    .destination('./build')
    .build(function(err) {
        if (err) { throw err; }
    });