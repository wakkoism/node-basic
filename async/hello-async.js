console.log('Challenge');

const printInTwoSeconds = (message) => {
  setTimeout(() => {
    console.log(message);
  }, 2000);
};

printInTwoSeconds('Hello world');
