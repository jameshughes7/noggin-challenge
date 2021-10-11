import http from 'k6/http';
import { check, group } from 'k6';
import { parseHTML } from 'k6/html';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const baseUrl = 'https://www.noggin.io';

export const options = {
  vus: 1,
  stages: [
    { duration: '5s', target: 5 },
    // { duration: '5s', target: 10 },
    // { duration: '5s', target: 15 },
    // { duration: '5s', target: 20 },
    // { duration: '5s', target: 25 },
  ],
  thresholds: {
    checks: [
      { threshold: 'rate>0.9', abortOnFail: true, delayAbortEval: '10s' },
    ],
    http_req_duration: ['avg<50'],
  },
};

export function handleSummary(data) {
  return {
    "perf/k6/noggin-k6-performance-summary.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export default function () {
  group('Noggin Performance Test', function () {
    group('Landing Page', function () {
      const res = http.get(`${baseUrl}`);
      const doc = parseHTML(res.body);
      const actualPageTitle = doc.find('head title').text();
      const expectedPageTitle = 'Noggin | Security, Safety & Critical Event Management Software'
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
      check(actualPageTitle, {
        'Validate home pageTitle': actualPageTitle === expectedPageTitle
      });
    });

    group('Resources endpoint', function () {
      const res = http.get(`${baseUrl}/resources`);
      const doc = parseHTML(res.body);
      const actualPageTitle = doc.find('head title').text();
      const expectedPageTitle = 'Resources';
      const actualH1 = doc.find('.heading-container h1').text();
      const expectedH1 = 'Best Practice Guides & Free Downloads';
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
      check(actualPageTitle, {
        'Validate /resources pageTitle': actualPageTitle === expectedPageTitle
      });
      check(actualH1, {
        'Validate /resources h1': actualH1.includes(expectedH1)
      });
    });

    group('guide-to-iso-22320 endpoint', function () {
      const res = http.get(`${baseUrl}/resources/guide-to-iso-22320`);
      const doc = parseHTML(res.body);
      const actualPageTitle = doc.find('head title').text();
      const expectedPageTitle = 'Guide to ISO 22320 for Incident Response | Best Practice Guide';
      const actualH1 = doc.find('.heading-container h1').text();
      const expectedH1 = 'Guide to ISO 22320: Emergency Management Requirements for Incident Response';
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
      check(actualPageTitle, {
        'Validate /resources/guide-to-iso-22320 title': actualPageTitle === expectedPageTitle
      });
      check(actualH1, {
        'Validate /resources/guide-to-iso-22320 h1': actualH1.includes(expectedH1)
      });
    });
  })
}
