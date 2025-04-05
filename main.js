const { crawlPage } = require('./crawl.js')

// takes in a wesbite as user input and returns a list of all URLs after calling the web crawler function
function main() {
    // check for valid input
    if(process.argv.length < 3) {
        console.log("no website provided!")
        process.exit(1)
    }
    if(process.argv.length > 3) {
        console.log("too many arguments provided!")
        process.exit(1)
    }

    const baseURL = process.argv[2]
    console.log(`starting crawl of ${baseURL}...`)

    crawlPage(baseURL)
}

main()