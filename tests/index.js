const testsContext = require.context('./unit/', true, /spec\.js$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../src/', true, /index\.js$/);
srcContext.keys().forEach(srcContext);
