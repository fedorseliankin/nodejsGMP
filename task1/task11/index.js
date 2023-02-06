process.stdin.on('data', data => {
  process.stdout.write([...data.toString().slice(0, -1)].reverse().join(''));
  process.stdout.write('\n\n\n');
});
