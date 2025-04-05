const { JSDOM } = require('jsdom')
const fetch = require('node-fetch');


// crawlURL is the main crawler function
async function crawlPage(currURL) {
    console.log(`actively crawling ${currURL}...`)

    try {
        // make a get request to the URL
        const resp = await fetch(currURL)
        if(resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page: ${currURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")
        if(contentType.includes("text/html")) {
            console.log(`non-html response with content type ${contentType} on page: ${currURL}`)
            return
        }

        console.log(await resp.text())
    } catch {
        console.log(`error in fetch: ${err.message} on page: ${currURL}`)
    }
}

// getURLs returns a list of URLs of the website taking as input the body of the website (htmlBody) and the baseURL of the website (baseURL)
function getURLs(htmlBody, baseURL) {
    const urls = []
    // takes in html body as a string and returns it as a DOM (document object model)
    const dom = new JSDOM(htmlBody)

    // returns list of all <a> tags
    const linkElements = dom.window.document.querySelectorAll('a')

    for(const linkelement of linkElements) {
        // check if the url is a relative url
        try {
            var urlObj
            if(linkelement.href.slice(0, 1) === '/') {
                urlObj = new URL(`${baseURL}${linkelement.href}`)
                // urls.push(normalizeURL(`${baseURL}${linkelement.href}`))
            } else {
                urlObj = new URL(linkelement.href)
                // urls.push(normalizeURL(linkelement.href))
            }
            urls.push(normalizeURL(urlObj.href))
        } catch (err) {
            console.log(`invalid url error: ${err.message}`)
        }
    }
    return urls
}

function normalizeURL(url) {
    const urlObj = new URL(url)

    // return hostpath after stripping away protocol
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    // check for trailing '/' and remove
    if(hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

module.exports = {
    normalizeURL,
    getURLs,
    crawlPage
}