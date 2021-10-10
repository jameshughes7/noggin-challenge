import http from 'k6/http';
import { check, group } from 'k6';
import { parseHTML } from 'k6/html';

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

// Go to https://www.noggin.io - DONE
// Click on 'RESOURCES' - Resource Centre link - DONE
// Add Assertions - DONE
// Filter Resources by Emergency Management - TODO
// Validate the if the filtered results are displayed and add assertions -TODO
// Click on any of the download guide link and check if a new page is opened and validate the for any content in that new page by adding an assertion - DONE
// Conditions:
// Number of threads - 1
// Ramp up time - 5 seconds
// Iterations - 5
// Listener - Summary report
