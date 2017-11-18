function doWork() {
  // Throw error that say 'unable to do work'
  throw new Error('Enable to do work');
}

try {
  doWork();
} catch (e) {
  console.log(e.message);
} finally {
  console.log('Finally block executed');
}
console.log('finish');

