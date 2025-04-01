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
    normalizeURL
}