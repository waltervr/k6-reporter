import http from 'k6/http';
import { htmlReport } from '../dist/bundle.js'
import { check,group } from 'k6';

export function setup (){
  
}
export default function () {
  group('demo', ()=>{
    const res = http.get('http://test.k6.io/');
    check(res, {
      'is status 200': (r) => r.status === 200,
      'failed': true !== true
    });

  })
}

export function handleSummary(data) {

  return {
    'summary.html': htmlReport(data),
  }
}