// see https://github.com/facebook/jest/issues/4545
// see https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
global.requestAnimationFrame = callback => setTimeout(callback, 0)
