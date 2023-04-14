/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "**/**.{js,jsx}"
],
theme: {
  extend: {
    margin:{
      "-100": "-100px"
    },
    height:{
      "1": "1px"
    },
    maxHeight:{
      "400": "400px"
    },
    fontFamily: {
      'montserrat': ['Montserrat'],
      'body': ['"Open Sans"']
    },
    dropShadow: {
      "3xl": "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 2px rgba(0, 0, 0, 0.3)"
    }
  },
},
}

