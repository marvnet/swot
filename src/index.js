const extractDomain = require('extract-domain')
const parseDomain   = require("parse-domain")
const fs = require("fs")

let DEBUG = false

if(process.env.NODE_ENV) {
    if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") DEBUG = true
}

module.exports.isAcademic = (subject) => {
    const domainData  = parseDomain(extractDomain(subject))
    if(domainData) {
        const domain      = domainData.domain
        const TLD           = domainData.tld
        if(fs.existsSync(`domains/${TLD.replace(".", "/")}`)) {
            if(fs.existsSync(`domains/${TLD.replace(".", "/")}/${domain}`)) {
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