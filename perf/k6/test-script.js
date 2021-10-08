import http from 'k6/http';
import { check, group } from 'k6';

const baseUrl = 'https://noggin.io';

export const options = {
  vus: 1,
  stages: [
    { duration: '5s', target: 5 },
    { duration: '5s', target: 10 },
    { duration: '5s', target: 15 },
    { duration: '5s', target: 20 },
    { duration: '5s', target: 25 },
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
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });

    group('Resources endpoint', function () {
      const res = http.get(`${baseUrl}/resources`);
      check(res, {
        'is status code 200': (r) => r.status === 200,
      });
    });
  });
}