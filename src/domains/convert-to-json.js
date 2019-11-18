const fs   = require("fs")
const glob = require("glob")
const path = require("path")

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const tlds = getDirectories(path.join(__dirname, "."))
tlds.forEach((tld) => {
    glob(path.join(__dirname, "/", tld + '/**/*.txt'), {}, (err, files)=>{
        files.forEach((file) => {
            const NEW_FILENAME = file.replace(".txt",  ".json")
            const SCHOOL_NAME  = fs.readFileSync(file, "utf8").replace("\n", "")
            fs.writeFileSync(NEW_FILENAME, JSON.stringify({
                name: SCHOOL_NAME,
            }, null, 4))
            fs.unlinkSync(file)
        })
    })
})