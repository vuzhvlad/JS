const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random/3`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', JSON.stringify(res.body.message), (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file');
      });
    })
    .catch((err) => {
      onsole.log(err.message);
    });
});
