/* eslint-disable no-console */

function conslog(headline = '===========', obj) {
  console.log(`=====${headline}====`);
  console.log(obj);
  console.log('===================');
}

export default conslog;
