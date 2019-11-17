const old_files = [/* OLD FILES HERE */]

const { execSync } = require('child_process');

old_files.forEach((file) => {
    execSync(`grep -v "${file}" swot.gemspec > swot.gemspec2; mv swot.gemspec2 swot.gemspec`)
})