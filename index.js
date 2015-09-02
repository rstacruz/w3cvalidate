var request = require('request')
var cheerio = require('cheerio')

module.exports = validate

/**
 * Validates.
 *
 * Line/column will be 0 if it's a general info.
 *
 *     validate('<!doctype html>...')
 *     .then(function (res) {
 *       console.log(res)
 *     })
 *
 *     {
 *       errors: 1,
 *       warnings: 2,
 *       results: [
 *         { type: 'error',
 *           message: 'Element head is missing a required instance',
 *           line: 2,
 *           column: 2 }
 *       ]
 *    }
 */

function validate (data) {
  return new Promise(function (ok, fail) {
    request({
      method: 'POST',
      uri: 'https://validator.w3.org/nu/',
      formData: {
        data: {
          options: {
            contentType: 'text/html',
            filename: 'index.html'
          },
          value: data
          }
      }
    }, function (err, res, body) {
      if (err) return fail(err)

      var $ = cheerio.load(body)
      var results = []

      $('#results li').each(function () {
        results.push(parseLi($, this))
      })

      ok({
        errors: findByType(results, 'error').length,
        warnings: findByType(results, 'warning').length,
        results: results
      })
    })
  })
}

function findByType (results, type) {
  return results.filter(function (res) {
    return res.type === type
  })
}

/*
 * <li class='error fatal'>
 *   <p>
 *     <strong>Warning</strong>:
 *     <span>Empty document, with no root element.</span>
 *   </p>
 *   <p class='location'>
 *     From line <span class='first-line'>247</span>,
 *     column <span class='first-col'>1</span>
 *   </p>
 *   <p class='extract'>
 *     <code>...</code>
 *   </p>
 * </li>
 */

function parseLi ($, li) {
  var $this = $(li)
  var type = $this.attr('class').split(' ')[0]
  var message = $this.find('p:nth-of-type(1) span').text()
  var line = +$this.find('.first-line').text()
  var column = +$this.find('.first-col').text()

  return {
    type: type,
    message: message,
    line: line,
    column: column
  }
}
