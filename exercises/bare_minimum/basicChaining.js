/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var getGithub = require('./promisification').getGitHubProfileAsync;
var pluckFirst = require('./promiseConstructor').pluckFirstLineFromFileAsync;

Promise.promisifyAll(fs);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirst(readFilePath)
    .then(username => getGithub(username))
    .then(profile => {
      fs.writeFileAsync(writeFilePath, JSON.stringify(profile), 'utf8');
    });
};


// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
