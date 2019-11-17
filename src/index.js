const extractDomain = require('extract-domain')
const parseDomain   = require("parse-domain")
const fs = require("fs")

let DEBUG = false

if(process.env.NODE_ENV) {
    if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") DEBUG = true
}

module.exports.isAcademic = function (subject) {
    let PARSED_DOMAIN = parseDomain(subject)
    if(DEBUG) console.log(`Extracted domain: ${PARSED_DOMAIN.domain + "." + PARSED_DOMAIN.tld}`)
    if(PARSED_DOMAIN) {
        try {
            if(PARSED_DOMAIN.tld.split(".").length == 2) {
                PARSED_DOMAIN.tld = PARSED_DOMAIN.tld.split(".")
                let tld_1 = PARSED_DOMAIN.tld[1]
                let tld_2 = PARSED_DOMAIN.tld[0]
                PARSED_DOMAIN.tld = tld_1 + "." + tld_2
            }
        } catch(e) {
            // blackhole
        }
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

module.exports.school_name = function(subject) {
    if(this.isAcademic(subject)) {
        let PARSED_DOMAIN = parseDomain(subject)
        if(PARSED_DOMAIN) {
            try {
                if(PARSED_DOMAIN.tld.split(".").length == 2) {
                    PARSED_DOMAIN.tld = PARSED_DOMAIN.tld.split(".")
                    let tld_1 = PARSED_DOMAIN.tld[1]
                    let tld_2 = PARSED_DOMAIN.tld[0]
                    PARSED_DOMAIN.tld = tld_1 + "." + tld_2
                }
            } catch(e) {
                // blackhole
            }
            return fs.readFileSync(`${__dirname}/domains/${PARSED_DOMAIN.tld.replace(".", "/")}/${PARSED_DOMAIN.domain}.txt`, 'utf8').replace("\n", "")
        }
    } else return false
}