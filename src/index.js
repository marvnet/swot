const extractDomain = require('extract-domain')
const parseDomain   = require("parse-domain")
const fs = require("fs")

let DEBUG = false

if(process.env.NODE_ENV) {
    if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") DEBUG = true
}

module.exports.isAcademic = function (subject) {
    const PARSED_DOMAIN = parseDomain(subject)
    if(DEBUG) console.log(`Extracted domain: ${PARSED_DOMAIN.domain + "." + PARSED_DOMAIN.tld}`)
    if(PARSED_DOMAIN) {
        if(DEBUG) console.log(`Looking up ${__dirname}/domains/${PARSED_DOMAIN.tld.replace(".", "/")}...`)
        if(fs.existsSync(`${__dirname}/domains/${PARSED_DOMAIN.tld.replace(".", "/")}`)) {
            if(DEBUG) console.log(`Looking up ${__dirname}/domains/${PARSED_DOMAIN.tld.replace(".", "/")}/${PARSED_DOMAIN.domain}.txt...`)
            if(fs.existsSync(`${__dirname}/domains/${PARSED_DOMAIN.tld.replace(".", "/")}/${PARSED_DOMAIN.domain}.txt`)) {
                return true
            } else {
                if(DEBUG) console.log("School does not exist")
                return false
            }
        } else {
            if(DEBUG) console.log("TLD does not exist")
            return false
        }
    } else {
        if(DEBUG) console.log("Domain could not be parsed")
        return false
    }
}