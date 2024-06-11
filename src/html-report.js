//
// Generate HTML report from K6 summary data
// Ben Coleman, March 2021
//

// Have to import ejs this way, nothing else works
import ejs from '../node_modules/ejs/ejs.min.js'
import template from './template.ejs'

const version = '2.4.1'

//
// Main function should be imported and wrapped with the function handleSummary
//
export function htmlReport(data, opts = {}) {
  // Default options
  if (!opts.title) {
    opts.title = new Date().toISOString().slice(0, 16).replace('T', ' ')
  }
  // eslint-disable-next-line
  if (!opts.hasOwnProperty('debug')) {
    opts.debug = false
  }

  console.log(`[k6-reporter v${version}] Generating HTML summary report`)
  let metricListSorted = []

  if (opts.debug) {
    console.log(JSON.stringify(data, null, 2))
  }

  // Count the checks and those that have passed or failed
  // NOTE. Nested groups are not checked!
  let checkFailures = 0
  let checkPasses = 0
  if (data.root_group.checks) {
    let { passes, fails } = countChecks(data.root_group.checks)
    checkFailures += fails
    checkPasses += passes
  }

  for (let group of data.root_group.groups) {
    if (group.checks) {
      let { passes, fails } = countChecks(group.checks)
      checkFailures += fails
      checkPasses += passes
    }
  }

  const standardMetrics = [
    'grpc_req_duration',
    'http_req_duration',
    'http_req_waiting',
    'http_req_connecting',
    'http_req_tls_handshaking',
    'http_req_sending',
    'http_req_receiving',
    'http_req_blocked',
    'iteration_duration',
    'group_duration',
    'ws_connecting',
    'ws_msgs_received',
    'ws_msgs_sent',
    'ws_sessions',
  ]

  const otherMetrics = [
    'iterations',
    'data_sent',
    'checks',
    'http_reqs',
    'data_received',
    'vus_max',
    'vus',
    'http_req_failed',
    'http_req_duration{expected_response:true}',
  ]

  // Render the template
  const html = ejs.render(template, {
    data,
    title: opts.title,
    standardMetrics,
    otherMetrics,
    totalChecks: checkFailures + checkPasses,
    checkFailures,
    checkPasses,
    version,
  })

  // Return HTML string needs wrapping in a handleSummary result object
  // See https://k6.io/docs/results-visualization/end-of-test-summary#handlesummary-callback
  return html
}

//
// Helper for counting the checks in a group
//
function countChecks(checks) {
  let passes = 0
  let fails = 0
  for (let check of checks) {
    passes += parseInt(check.passes)
    fails += parseInt(check.fails)
  }
  return { passes, fails }
}

const getRequestId = () => {
  return "PFC-" + "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    let random = Math.floor(Math.random() * 16);
    let value = character === "x" ? random : (random & 0x3 | 0x8);
    return value.toString(16);
  });
};

export const getPayfieldsToken = async () => {
  const requestId = getRequestId();
  const url = "https://api.pit.paygateway.com/tokenization/temporary_tokens";
  const headers = {
    "x-gp-version": "2019-08-22",
    "x-gp-api-key": "vCGr0YECzOX7sLGQ8AeffGDs55K1Ccmu",
    "x-gp-environment": "test",
    "x-gp-request-id": requestId,
    "content-type": "application/json"
  };
  const payload = JSON.stringify({
    "card": {
      "card_number": "5413330089604111",
      "card_security_code": "123",
      "expiry_month": "12",
      "expiry_year": "24"
    }
  });

  const response = await fetch(url, {
    body: payload,
    headers,
    method: "POST",
  })
  
  const data = await response.json();
  console.log(JSON.stringify(data))
}
