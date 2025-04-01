const {normalizeURL} = require('./crawl.js')
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