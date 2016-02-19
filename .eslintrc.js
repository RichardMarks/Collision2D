module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "rules": {
        "indent": 2
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "ecmaFeatures": {
        "jsx": true,
        "modules": true,
        "arrowFunctions": true,
        "blockBindings": true,
        "defaultParams": true,
        "spread": true,
        "classes": true,
        "templateStrings": true,
        "restParams": true,
    }
};
