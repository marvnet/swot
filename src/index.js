const extractDomain = require('extract-domain')
const fs = require("fs")

module.exports.isAcademic = (subject) => {
    const domain    = extractDomain(subject)
    const domainParts = domain.split(".")
    let domainLD    = domainParts
    let university = domainLD.shift()
    console.log(`University: "${university}" / LevelDomain: "${domainLD.join(".")}"`)
    if(domainLD.length == 1) {
        const TLD = domainLD[0]
        if(fs.existsSync("domains/" + TLD)) {
            if(fs.existsSync("domains/" + TLD + "/" + university + ".txt")) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    } else if(domainLD.length == 2) {
        const TLD = domainLD[1]
        const SLD = domainLD[0]
        if(fs.existsSync("domains/" + TLD)) {
            if(fs.existsSync("domains/" + TLD + "/" + SLD)) {
                if(fs.existsSync("domains/" + TLD + "/" + SLD + "/" + university + ".txt")) {
                    return true
                } else return false
            } else return false
        } else return false
    } else {
        return false
    }
}