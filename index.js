const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  //passing file
  return new Promise((resolve, reject) => {
    // and returning promise
    fs.readFile(file, (err, data) => {
      // where we do all asyncchronous code
      if (err) reject('I Could not find that file :('); // if not we give this error
      resolve(data); // if everything is successful we pass the data
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not wire the file :(');
      resolve('success');
    });
  });
};

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random/3`); // chaining promise to promise
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', JSON.stringify(res.body.message));
//   })
//   .then(() => {
//     console.log('Random dog image saved to file');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//chaining every promise to each promise by returning them in every return, so then they are connected

// async await
const getDogPic = async () => {
  try {
    // async says that it is special asynchronous function
    const data = await readFilePro(`${__dirname}/dog.txt`); // we are saving this promise into data by puttin await, so it will wait for it
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random/3`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', JSON.stringify(res.body.message));
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err; // if you throw an error it will mark all entire promise as rejected
  }

  return '2: Ready getting dog pics';
};
// declare and call a function right away, special pattern for using async/await
(async () => {
  try {
    console.log('1: Will get dog pics');
    const x = await getDogPic(); // returns promise, stroing what it returns
    console.log(x);
    console.log('3: Done getting dog pics');
  } catch (err) {
    console.log('ERROR');
  }
})();

//promise
// console.log('1: Will get dog pics');
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: Done getting dog pics');
//   })
//   .catch((err) => {
//     console.log('ERROR');
//   });
