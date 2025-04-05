const {normalizeURL, getURLs} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.annanya.com/path'
    const actual = normalizeURL(input)
    const expected = 'blog.annanya.com/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.annanya.com/'
    const actual = normalizeURL(input)
    const expected = 'blog.annanya.com'
    expect(actual).toEqual(expected)
})

test('normalizeURL capital', () => {
    const input = 'https://BLOG.annanya.com/'
    const actual = normalizeURL(input)
    const expected = 'blog.annanya.com'
    expect(actual).toEqual(expected)
})

test('normalizeURL protocol', () => {
    const input = 'http://BLOG.annanya.com/'
    const actual = normalizeURL(input)
    const expected = 'blog.annanya.com'
    expect(actual).toEqual(expected)
})

test('getURLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://annanya.com"> Absolute Path </a>
        </body>
    </html>
    `
    const inputURL = 'http://blog.annanya.com/'
    const actual = getURLs(inputHTMLBody, inputURL)
    const expected = ['annanya.com']
    expect(actual).toEqual(expected)
})

test('getURLs relative URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path">Relative Path</a>
        </body>
    </html>
    `
    const inputURL = 'http://blog.annanya.com'
    const actual = getURLs(inputHTMLBody, inputURL)
    const expected = ['blog.annanya.com/path']
    expect(actual).toEqual(expected)
})

test('getURLs relative & absolute URLs', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path">Relative Path</a>
            <a href="http://blog.annanya.com/path2">Absolute Path</a>
        </body>
    </html>
    `
    const inputURL = 'http://blog.annanya.com'
    const actual = getURLs(inputHTMLBody, inputURL)
    const expected = ['blog.annanya.com/path', 'blog.annanya.com/path2']
    expect(actual).toEqual(expected)
})

test('getURLs invalid URL', () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Invalid</a>
        </body>
    </html>
    `
    const inputURL = 'http://blog.annanya.com'
    const actual = getURLs(inputHTMLBody, inputURL)
    const expected = []
    expect(actual).toEqual(expected)
})